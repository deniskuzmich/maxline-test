import { state, elements, saveStateToStorage } from '../core/state.js';
import { handleTimeout, finishTest } from './test.js';

const QUESTION_TIME = 35; // секунд на вопрос

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

// Запуск таймера вопроса.
// Таймер привязан к абсолютному дедлайну, а не к тикам интервала:
// перезагрузка или закрытие вкладки не сбрасывают оставшееся время.
export function startQuestionTimer() {
    // Если дедлайн не задан (новый вопрос) — отсчитываем от текущего момента
    if (!state.questionDeadline) {
        state.questionDeadline = Date.now() + QUESTION_TIME * 1000;
    }

    state.questionTimeLeft = Math.ceil((state.questionDeadline - Date.now()) / 1000);
    updateQuestionTimerDisplay();

    // Время уже вышло (например, страницу долго держали закрытой)
    if (state.questionTimeLeft <= 0) {
        state.questionDeadline = null;
        if (state.userAnswers[state.currentQuestion] === null) {
            handleTimeout();
            saveStateToStorage();
        }
        return;
    }

    state.questionTimer = setInterval(() => {
        state.questionTimeLeft = Math.ceil((state.questionDeadline - Date.now()) / 1000);
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

// Остановка таймера вопроса (вопрос отвечен или тест завершён — дедлайн сбрасываем)
export function stopQuestionTimer() {
    clearInterval(state.questionTimer);
    state.questionTimer = null;
    state.questionDeadline = null;
}

// Сброс таймера вопроса (остановка + новый старт)
export function resetQuestionTimer() {
    stopQuestionTimer();
    startQuestionTimer();
}

// Запуск общего таймера теста
export function startTestTimer() {
    // Время старта сохраняется между перезагрузками, чтобы длительность не сбрасывалась
    if (!state.testStartTime) {
        state.testStartTime = new Date();
    }
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
