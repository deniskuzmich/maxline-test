import { state, elements, saveStateToStorage, clearStateFromStorage } from './state.js';
import {
    prepareQuestions,
    scrollToTop,
    updateScoreDisplay,
    updateProgress,
    showNotification
} from './utils.js';
import {
    startQuestionTimer,
    stopQuestionTimer,
    resetQuestionTimer,
    startTestTimer
} from './timer.js';
import { questionsData } from './data/questions.js';
import { saveTestResult } from './api.js';

// Подготовка и запуск теста
export function startTest() {
    state.questions = prepareQuestions(questionsData);
    resetTestState();
    state.testStartTime = new Date();
    showQuestion();
    updateProgress();
    updateNavigationButtons();
    updateScoreDisplay();
    startTestTimer();
    startQuestionTimer();
    saveStateToStorage(); // сохраняем начальное состояние
}

// Восстановление теста из сохранённого состояния
export function resumeTest() {
    // Предполагается, что state уже загружен из localStorage
    if (!state.questions || state.questions.length === 0) return;
    state.testStartTime = new Date(); // перезапускаем общий таймер (можно было бы восстановить разницу, но проще заново)
    state.testCompleted = false;
    showQuestion();
    updateProgress();
    updateNavigationButtons();
    updateScoreDisplay();
    startTestTimer();
    startQuestionTimer();
}

// Сброс состояния перед новым тестом
function resetTestState() {
    state.currentQuestion = 0;
    state.userAnswers = new Array(state.questions.length).fill(null);
    state.userCorrect = new Array(state.questions.length).fill(null);
    state.totalCorrect = 0;
    state.totalWrong = 0;
    state.testCompleted = false;
    clearTimeout(state.autoNextTimeout);
    stopQuestionTimer();
    clearStateFromStorage();
}

// Отображение текущего вопроса
export function showQuestion() {
    const question = state.questions[state.currentQuestion];
    let optionsHtml = '';

    question.options.forEach((option, index) => {
        const letter = String.fromCharCode(65 + index);
        const isSelected = state.userAnswers[state.currentQuestion] === index;
        const isCorrect = state.userCorrect[state.currentQuestion];

        let optionClass = 'option';
        if (isSelected) {
            if (isCorrect === true) optionClass += ' correct';
            else if (isCorrect === false) optionClass += ' incorrect';
            else optionClass += ' selected';
        }

        optionsHtml += `
            <div class="option ${optionClass}" onclick="selectOption(${index})">
                <div class="option-letter">${letter}</div>
                <div class="option-text">${option}</div>
            </div>
        `;
    });

    elements.questionCard.innerHTML = `
        <div class="question-text">${state.currentQuestion + 1}. ${question.question}</div>
        <div class="options-container">${optionsHtml}</div>
    `;
}

// Обработчик выбора ответа
export function selectOption(optionIndex) {
    if (state.testCompleted || state.userAnswers[state.currentQuestion] !== null) return;

    state.userAnswers[state.currentQuestion] = optionIndex;
    const isCorrect = (optionIndex === state.questions[state.currentQuestion].correct);
    state.userCorrect[state.currentQuestion] = isCorrect;

    if (isCorrect) state.totalCorrect++;
    else state.totalWrong++;

    updateScoreDisplay();

    if (state.totalWrong > state.MAX_WRONG) {
        failTest();
        return;
    }

    stopQuestionTimer();
    showQuestion();
    updateNavigationButtons();
    saveStateToStorage();

    state.autoNextTimeout = setTimeout(() => {
        if (state.currentQuestion < state.questions.length - 1) {
            nextQuestion();
        } else {
            finishTest();
        }
    }, 300);
}

// Переход к следующему вопросу
export function nextQuestion() {
    if (state.currentQuestion < state.questions.length - 1) {
        state.currentQuestion++;
        resetQuestionTimer();
        showQuestion();
        updateProgress();
        updateNavigationButtons();
        scrollToTop();
        saveStateToStorage();
    }
}

// Обновление видимости кнопки "Завершить"
export function updateNavigationButtons() {
    const allAnswered = state.userAnswers.every(ans => ans !== null);
    elements.finishBtn.style.display = allAnswered ? 'flex' : 'none';
}

// Обработка истечения времени на вопрос
export function handleTimeout() {
    if (state.userAnswers[state.currentQuestion] !== null) return;

    state.userAnswers[state.currentQuestion] = null;
    state.userCorrect[state.currentQuestion] = false;
    state.totalWrong++;
    updateScoreDisplay();
    saveStateToStorage();

    if (state.totalWrong > state.MAX_WRONG) {
        failTest();
    } else if (state.currentQuestion < state.questions.length - 1) {
        nextQuestion();
    } else {
        finishTest();
    }
}

// Досрочное завершение из-за превышения лимита ошибок
export function failTest() {
    state.testCompleted = true;
    stopQuestionTimer();
    renderResults(false);
    clearStateFromStorage();
}

// Штатное завершение теста (все вопросы отвечены)
export function finishTest() {
    state.testCompleted = true;
    stopQuestionTimer();
    renderResults(true);
    clearStateFromStorage();
}

// Отрисовка результатов и сохранение на сервер
export async function renderResults(isFinished) {
    elements.questionCard.style.display = 'none';
    elements.finishBtn.style.display = 'none';
    if (elements.navigation) elements.navigation.style.display = 'none'; // Скрываем панель навигации
    elements.resultsSection.style.display = 'block';
    elements.resultsSection.classList.add('active');
    elements.questionContainer.style.overflow = 'hidden';



    const durationM = Math.floor(state.testDuration / 60000);
    const durationS = Math.floor((state.testDuration % 60000) / 1000);

    const wrongAnswers = [];
    state.userAnswers.forEach((ans, i) => {
        if (state.userCorrect[i] === false) {
            wrongAnswers.push({
                q: state.questions[i].question,
                mine: ans !== null ? state.questions[i].options[ans] : 'Время вышло',
                num: i + 1
            });
        }
    });

    let wrongHtml = wrongAnswers.length > 0 ? `
        <div class="wrong-answers-section">
            <h4>Неправильные ответы (${wrongAnswers.length}):</h4>
            <div class="wrong-answers-list">
                ${wrongAnswers.map(item => `
                    <div class="wrong-item">
                        <div class="wrong-question">${item.num}. ${item.q}</div>
                        <div class="wrong-answer"><i class="fas fa-times"></i> Ваш ответ: ${item.mine}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    ` : '<div class="all-correct"><h4>Идеально! Ошибок нет.</h4></div>';

    const title = state.totalWrong > state.MAX_WRONG ? 'Тест не сдан' : 'Результаты тестирования';
    const msg = state.totalWrong > state.MAX_WRONG ?
        `Допущено ошибок: ${state.totalWrong}. Лимит: ${state.MAX_WRONG}` :
        'Поздравляем! Вы прошли проверку знаний.';

    elements.resultsSection.innerHTML = `
        <h3>${title}</h3>
        <div class="score-card">
            <div class="score-number">${state.totalCorrect}</div>
            <div class="score-total">из ${state.questions.length} правильно</div>
            <div class="score-message">${msg}</div>
            <div class="test-duration">Общее время: ${durationM} мин ${durationS} сек</div>
        </div>
        ${wrongHtml}
        <button class="btn btn-primary restart-btn" id="restartBtn"><i class="fas fa-redo"></i> На главную</button>
    `;

    document.getElementById('restartBtn').addEventListener('click', () => {
        elements.resultsSection.style.display = 'none';
        elements.resultsSection.classList.remove('active');
        if (elements.navigation) elements.navigation.style.display = 'flex'; // Показываем обратно
        elements.questionCard.style.display = 'block';
        document.getElementById('preTestScreen').style.display = 'flex';
        document.getElementById('questionContainer').style.display = 'none';
    });

    // Сохраняем результат на сервер
    const result = {
        duration: Math.floor(state.testDuration / 1000),
        correctCount: state.totalCorrect,
        totalQuestions: state.questions.length,
        passed: state.totalWrong <= state.MAX_WRONG
    };
    try {
        await saveTestResult(result);
        showNotification('Результат сохранён', 'success');
        if (typeof window.loadUsers === 'function') {
            window.loadUsers();
        }
    } catch (err) {
        showNotification('Ошибка сохранения результата', 'error');
        console.error(err);
    }

    scrollToTop();
}