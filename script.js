// База данных вопросов для букмекерской компании
const questions = [
    {
        id: 1,
        question: "С каким минимальным и максимальным коэффициентом можно использовать фрибет?",
        options: ["1.2 - 2.0", "1.5 - 2.5", "1.5 - 3.0", "1.4 - 3.0"],
        correct: 2 // Индекс правильного ответа (нумерация с 0)
    },
    {
        id: 2,
        question: "Какой минимальный депозит можно внести через банковскую карту?",
        options: ["5 BYN", "10 BYN", "20 BYN", "50 BYN"],
        correct: 1
    },
    {
        id: 3,
        question: "Сколько времени занимает обработка вывода средств?",
        options: ["До 15 минут", "До 1 часа", "До 24 часов", "До 3 рабочих дней"],
        correct: 2
    },
    {
        id: 4,
        question: "Какая максимальная сумма ставки в экспрессе?",
        options: ["1000 BYN", "5000 BYN", "10000 BYN", "50000 BYN"],
        correct: 2
    },
    {
        id: 5,
        question: "Какой кеф (коэффициент) считается высокорисковым?",
        options: ["Выше 1.5", "Выше 2.0", "Выше 3.0", "Выше 5.0"],
        correct: 3
    },
    {
        id: 6,
        question: "Сколько событий можно добавить в экспресс?",
        options: ["До 5", "До 10", "До 20", "Неограниченно"],
        correct: 2
    },
    {
        id: 7,
        question: "В течение какого времени можно отменить ставку?",
        options: ["5 минут", "15 минут", "30 минут", "1 час"],
        correct: 0
    },
    {
        id: 8,
        question: "Какой вид спорта имеет наибольшую маржу?",
        options: ["Футбол", "Теннис", "Киберспорт", "Настольный теннис"],
        correct: 2
    }
];

// Текущее состояние теста
let currentQuestion = 0;
let userAnswers = new Array(questions.length).fill(null);
let testCompleted = false;
let testStartTime = null;
let testDuration = 0;

// Элементы DOM
const questionCard = document.getElementById('questionCard');
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const finishBtn = document.getElementById('finishBtn');
const resultsSection = document.getElementById('resultsSection');
const timerElement = document.getElementById('timer');

// Инициализация теста
function initTest() {
    testStartTime = new Date();
    showQuestion();
    updateProgress();
    updateNavigationButtons();
    startTimer();
}

// Отображение текущего вопроса
function showQuestion() {
    const question = questions[currentQuestion];

    let optionsHtml = '';
    question.options.forEach((option, index) => {
        const letter = String.fromCharCode(65 + index); // A, B, C, D
        const isSelected = userAnswers[currentQuestion] === index;

        let optionClass = 'option';
        if (isSelected) {
            optionClass += ' selected';
        }

        optionsHtml += `
            <div class="option ${optionClass}" onclick="selectOption(${index})">
                <div class="option-letter">${letter}</div>
                <div class="option-text">${option}</div>
            </div>
        `;
    });

    questionCard.innerHTML = `
        <div class="question-text">${currentQuestion + 1}. ${question.question}</div>
        <div class="options-container">
            ${optionsHtml}
        </div>
    `;
}

// Выбор варианта ответа
function selectOption(optionIndex) {
    if (testCompleted) return;

    userAnswers[currentQuestion] = optionIndex;
    showQuestion();
    updateNavigationButtons();
}

// Следующий вопрос
function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion();
        updateProgress();
        updateNavigationButtons();
    }
}

// Предыдущий вопрос
function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion();
        updateProgress();
        updateNavigationButtons();
    }
}

// Обновление прогресса
function updateProgress() {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    const progressBarElement = progressBar.querySelector('::after') || progressBar;
    progressBar.style.setProperty('--progress-width', `${progress}%`);
    progressBar.style.width = `${progress}%`;
    progressText.textContent = `Вопрос ${currentQuestion + 1} из ${questions.length}`;
}

// Обновление кнопок навигации
function updateNavigationButtons() {
    prevBtn.disabled = currentQuestion === 0;

    const allAnswered = userAnswers.every(answer => answer !== null);

    if (allAnswered) {
        nextBtn.style.display = 'none';
        finishBtn.style.display = 'flex';
    } else {
        nextBtn.style.display = 'flex';
        finishBtn.style.display = 'none';

        if (currentQuestion === questions.length - 1) {
            nextBtn.disabled = true;
        } else {
            nextBtn.disabled = false;
        }
    }
}

// Запуск таймера
function startTimer() {
    testStartTime = new Date();
    updateTimer();
    setInterval(updateTimer, 1000);
}

// Обновление таймера
function updateTimer() {
    if (!testStartTime) return;

    const now = new Date();
    const diff = now - testStartTime;

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    timerElement.textContent =
        `${hours.toString().padStart(2, '0')}:` +
        `${minutes.toString().padStart(2, '0')}:` +
        `${seconds.toString().padStart(2, '0')}`;

    testDuration = diff;
}

// Завершение теста
function finishTest() {
    testCompleted = true;

    // Подсчет правильных ответов
    let correctCount = 0;
    const wrongAnswers = [];
    const answerReview = [];

    userAnswers.forEach((answer, index) => {
        const question = questions[index];
        const isCorrect = answer === question.correct;

        answerReview.push({
            question: question.question,
            userAnswer: answer !== null ? question.options[answer] : 'Нет ответа',
            isCorrect: isCorrect,
            questionNumber: index + 1
        });

        if (isCorrect) {
            correctCount++;
        } else {
            wrongAnswers.push({
                question: question.question,
                userAnswer: answer !== null ? question.options[answer] : 'Нет ответа',
                questionNumber: index + 1
            });
        }
    });

    // Форматирование времени теста
    const durationMinutes = Math.floor(testDuration / (1000 * 60));
    const durationSeconds = Math.floor((testDuration % (1000 * 60)) / 1000);

    // Определение сообщения в зависимости от результата
    let message = '';
    const percentage = (correctCount / questions.length) * 100;

    if (percentage >= 90) {
        message = 'Отличный результат! Вы отлично знаете правила компании!';
    } else if (percentage >= 70) {
        message = 'Хороший результат!';
    } else if (percentage >= 50) {
        message = 'Удовлетворительный результат. Рекомендуется повторить материал.';
    } else {
        message = 'Необходимо пройти дополнительное обучение.';
    }

    // Показ результатов
    questionCard.style.display = 'none';
    nextBtn.style.display = 'none';
    prevBtn.style.display = 'none';
    finishBtn.style.display = 'none';

    let wrongAnswersHtml = '';
    if (wrongAnswers.length > 0) {
        wrongAnswersHtml = `
            <div class="wrong-answers">
                <h4><i class="fas fa-exclamation-circle"></i> Неправильные ответы (${wrongAnswers.length}):</h4>
                ${wrongAnswers.map(item => `
                    <div class="wrong-item">
                        <div class="wrong-question">${item.questionNumber}. ${item.question}</div>
                        <div class="wrong-answer">
                            <i class="fas fa-times"></i> Ваш ответ: ${item.userAnswer}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    // Создаем обзор ответов
    let answerReviewHtml = `
        <div class="answer-review">
            <h4><i class="fas fa-clipboard-check"></i> Обзор ответов:</h4>
            ${answerReview.map(item => `
                <div class="answer-item ${item.isCorrect ? 'correct' : 'incorrect'}">
                    <div class="answer-question">${item.questionNumber}. ${item.question}</div>
                    <div class="answer-user">
                        Ваш ответ: ${item.userAnswer}
                        <span class="answer-status ${item.isCorrect ? 'correct' : 'incorrect'}">
                            ${item.isCorrect ? 'Правильно' : 'Неправильно'}
                        </span>
                    </div>
                </div>
            `).join('')}
        </div>
    `;

    resultsSection.style.display = 'block';
    resultsSection.innerHTML = `
        <h3>Результаты тестирования</h3>
        <div class="score-card">
            <div class="score-number">${correctCount}</div>
            <div class="score-total">правильных ответов из ${questions.length}</div>
            <div class="score-message">${message}</div>
            <div class="test-duration" style="margin-top: 15px; color: #a0aec0; font-size: 16px;">
                <i class="far fa-clock"></i> Время тестирования: ${durationMinutes} мин ${durationSeconds} сек
            </div>
        </div>
        ${answerReviewHtml}
        <div class="navigation">
            <button class="btn btn-primary restart-btn" onclick="restartTest()">
                <i class="fas fa-redo"></i> Пройти тест заново
            </button>
        </div>
    `;
}

// Перезапуск теста
function restartTest() {
    currentQuestion = 0;
    userAnswers = new Array(questions.length).fill(null);
    testCompleted = false;
    testStartTime = null;
    testDuration = 0;

    questionCard.style.display = 'block';
    resultsSection.style.display = 'none';
    nextBtn.style.display = 'flex';
    prevBtn.style.display = 'flex';
    finishBtn.style.display = 'none';

    initTest();
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    initTest();

    // Обработчики кнопок
    prevBtn.addEventListener('click', prevQuestion);
    nextBtn.addEventListener('click', nextQuestion);
    finishBtn.addEventListener('click', finishTest);

    // Горячие клавиши
    document.addEventListener('keydown', (e) => {
        if (testCompleted) return;

        if (e.key === 'ArrowLeft' && currentQuestion > 0) {
            prevQuestion();
        } else if (e.key === 'ArrowRight' && currentQuestion < questions.length - 1) {
            nextQuestion();
        } else if (e.key >= '1' && e.key <= '4') {
            const optionIndex = parseInt(e.key) - 1;
            selectOption(optionIndex);
        } else if (e.key === 'Enter' && finishBtn.style.display !== 'none') {
            finishTest();
        }
    });
});

// Добавляем стиль для динамического прогресс-бара
const style = document.createElement('style');
style.textContent = `
    .progress-bar::after {
        width: var(--progress-width, 12.5%);
    }
`;
document.head.appendChild(style);