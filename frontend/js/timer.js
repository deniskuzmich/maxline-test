import { state, elements, saveStateToStorage } from './state.js';
import { handleTimeout, finishTest } from './test.js';

// Обновление отображения таймера вопроса
export function updateQuestionTimerDisplay() {
    if (elements.questionTimer) {
        elements.questionTimer.textContent = state.questionTimeLeft;
        if (elements.timerCircle) {
            elements.timerCircle.classList.remove('warning', 'danger');
            if (state.questionTimeLeft <= 10 && state.questionTimeLeft > 5) {
                elements.timerCircle.classList.add('warning');
            } else if (state.questionTimeLeft <= 5) {
                elements.timerCircle.classList.add('danger');
            }
        }
    }
}

// Запуск таймера вопроса
export function startQuestionTimer() {
    state.questionTimeLeft = 30;
    updateQuestionTimerDisplay();

    state.questionTimer = setInterval(() => {
        state.questionTimeLeft--;
        updateQuestionTimerDisplay();

        if (state.questionTimeLeft <= 0) {
            stopQuestionTimer();
            if (state.userAnswers[state.currentQuestion] === null) {
                handleTimeout();
                saveStateToStorage(); // добавить после обработки
            }
        }
    }, 1000);
}

// Остановка таймера вопроса
export function stopQuestionTimer() {
    clearInterval(state.questionTimer);
    state.questionTimer = null;
}

// Сброс таймера вопроса (остановка + новый старт)
export function resetQuestionTimer() {
    stopQuestionTimer();
    startQuestionTimer();
}

// Запуск общего таймера теста
export function startTestTimer() {
    state.testStartTime = new Date();
    const testInterval = setInterval(() => {
        if (!state.testStartTime || state.testCompleted) {
            clearInterval(testInterval);
            return;
        }
        const now = new Date();
        const diff = now - state.testStartTime;
        const h = Math.floor(diff / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        const s = Math.floor((diff % 60000) / 1000);
        elements.timer.textContent = `${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
        state.testDuration = diff;
    }, 1000);
}