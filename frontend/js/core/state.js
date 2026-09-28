export const state = {
    questions: [],
    currentQuestion: 0,
    userAnswers: [],
    userCorrect: [],
    testCompleted: false,
    testStartTime: null,
    testDuration: 0,
    autoNextTimeout: null,
    questionTimer: null,
    questionTimeLeft: 30,
    totalCorrect: 0,
    totalWrong: 0,
    MAX_WRONG: 2,
    currentUserRole: 'user',
};

export const elements = {navigation: null,};

export function initElements() {
    elements.startScreen = document.getElementById('startScreen');
    elements.startBtn = document.getElementById('startBtn');
    elements.testContainer = document.querySelector('.test-container');
    elements.questionCard = document.getElementById('questionCard');
    elements.progressFill = document.getElementById('progressFill');
    elements.progressText = document.getElementById('progressText');
    elements.finishBtn = document.getElementById('finishBtn');
    elements.resultsSection = document.getElementById('resultsSection');
    elements.timer = document.getElementById('timer');
    elements.questionTimer = document.getElementById('questionTimer');
    elements.timerCircle = document.querySelector('.timer-circle');
    elements.correctCount = document.getElementById('correctCount');
    elements.wrongCount = document.getElementById('wrongCount');
    elements.wrongLimit = document.getElementById('wrongLimit');
    elements.notification = document.getElementById('notification');
    elements.preTestScreen = document.getElementById('preTestScreen');
    elements.questionContainer = document.getElementById('questionContainer');
    elements.startTestBtn = document.getElementById('startTestBtn');
    elements.navigation = document.querySelector('.navigation');
}

// Сохранение состояния в localStorage
export function saveStateToStorage() {
    const storage = {
        questions: state.questions,
        currentQuestion: state.currentQuestion,
        userAnswers: state.userAnswers,
        userCorrect: state.userCorrect,
        testCompleted: state.testCompleted,
        totalCorrect: state.totalCorrect,
        totalWrong: state.totalWrong,
        testDuration: state.testDuration,
        // Не сохраняем таймеры и время старта, они будут перезапущены
    };
    localStorage.setItem('testState', JSON.stringify(storage));
}

// Загрузка состояния из localStorage
export function loadStateFromStorage() {
    const saved = localStorage.getItem('testState');
    if (saved) {
        try {
            const data = JSON.parse(saved);
            // Если тест уже завершён, не восстанавливаем
            if (data.testCompleted) {
                clearStateFromStorage();
                return false;
            }
            state.questions = data.questions || [];
            state.currentQuestion = data.currentQuestion || 0;
            state.userAnswers = data.userAnswers || new Array(state.questions.length).fill(null);
            state.userCorrect = data.userCorrect || new Array(state.questions.length).fill(null);
            state.testCompleted = data.testCompleted || false;
            state.totalCorrect = data.totalCorrect || 0;
            state.totalWrong = data.totalWrong || 0;
            state.testDuration = data.testDuration || 0;
            return true;
        } catch (e) {
            console.warn('Ошибка загрузки состояния', e);
            clearStateFromStorage();
        }
    }
    return false;
}

// Очистка состояния в localStorage
export function clearStateFromStorage() {
    localStorage.removeItem('testState');
}