import { elements, state } from './state.js';

// Перемешивание массива (Фишер-Йетс)
export function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Подготовка вопросов: копирование, перемешивание, синхронизация правильных ответов
export function prepareQuestions(questionsData) {
    const shuffled = JSON.parse(JSON.stringify(questionsData));
    shuffleArray(shuffled);
    shuffled.forEach(q => {
        const correctText = q.options[q.correct];
        shuffleArray(q.options);
        q.correct = q.options.indexOf(correctText);
    });
    return shuffled;
}

// Прокрутка контейнера с вопросами вверх
export function scrollToTop() {
    const qc = document.querySelector('.question-container');
    if (qc) qc.scrollTop = 0;
}

// Обновление счётчиков правильных/неправильных ответов и лимита
export function updateScoreDisplay() {
    if (elements.correctCount) elements.correctCount.textContent = state.totalCorrect;
    if (elements.wrongCount) elements.wrongCount.textContent = state.totalWrong;
    if (elements.wrongLimit) elements.wrongLimit.textContent = `${state.totalWrong}/${state.MAX_WRONG}`;
}

// Обновление прогресс-бара
export function updateProgress() {
    const progress = ((state.currentQuestion + 1) / state.questions.length) * 100;
    if (elements.progressFill) elements.progressFill.style.width = `${progress}%`;
    if (elements.progressText) elements.progressText.textContent = `Вопрос ${state.currentQuestion + 1} из ${state.questions.length}`;
}

export function showNotification(message, type = 'info', duration = 3000) {
    const notif = elements.notification;
    if (!notif) return;
    notif.className = `notification ${type}`;
    notif.textContent = message;
    notif.style.display = 'block';
    setTimeout(() => {
        notif.style.display = 'none';
    }, duration);
}