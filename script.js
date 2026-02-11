// База данных вопросов
const questionsData = [
    {
        id: 1,
        question: "Для активации приветственного бонуса '333FS' нужно:",
        options: [
            "Верификация, авторизация в приложении, пополнение от 30р",
            "Верификация, пополнение от 10р",
            "Верификация, авторизация в приложении, пополнить от 30р, отыграть пополнение на 100%",
            "Верификация, авторизация в приложении, пополнение от 20р"
        ],
        correct: 2
    },
    {
        id: 2,
        question: "Для активации приветственного бонуса '77FB' нужно:",
        options: [
            "Верификация, авторизация в приложении, пополнение от 30р",
            "Верификация, написать в bonus@maxline.by, пополнить от 20р",
            "Верификация, авторизация в приложении, пополнить от 30р, отыграть пополнение на 100%",
            "Верификация, авторизация в приложении, пополнение от 20р"
        ],
        correct: 2
    },
    {
        id: 3,
        question: "Какие события участвуют в бонусе 'Кешбек 100% на спорт (ML платит)':",
        options: [
            "Одиночные ставки по линии и/или Live, c максимальным коэффициентом '5'.",
            "Одиночные ставки по линии и/или Live,, c максимальным коэффициентом '3'.",
            "Одиночные ставки по линии и/или Live, а так же экспрессы c максимальным коэффициентом '5'.",
            "Одиночные ставки по линии и/или Live, а так же VIP ставки c максимальным коэффициентом '5'."
        ],
        correct: 0
    },
    {
        id: 4,
        question: "Максимальная сумма фрибет, которая возможна в бонусе 'Кешбек 100% на спорт':",
        options: ["5000", "1000", "101", "500"],
        correct: 1
    },
    {
        id: 5,
        question: "С какими коэффициентами можно использовать фрибет?",
        options: ["до 3", "1.2 - 3", "1.5 - 5", "1.5 - 3"],
        correct: 3
    },
    {
        id: 6,
        question: "Минимальная и максимальная сумма, которую можно забрать в бонусе 'Кешбек 100% на казино':",
        options: ["1 - 1000", "10 - 10000", "1 - 101", "5 - 500"],
        correct: 0
    },
    {
        id: 7,
        question: "Минимальное и максимальное количество исходов, которое должно быть в экспрессе для участия в бонусе 'Экспресс буст':",
        options: [
            "от 5 до 20",
            "от 3 до 16",
            "от 10 до 15 (16 по пятницам)",
            "от 4 до 20"
        ],
        correct: 3
    },
    {
        id: 8,
        question: "Минимальный и максимальный процент к выигрышу в бонусе 'Экспресс буст':",
        options: ["от 5 до 20", "от 4 до 20", "от 4 до 100", "от 8 до 20"],
        correct: 2
    },
    {
        id: 9,
        question: "С какими коэффициентами попадают события в бонус 'Экспресс буст':",
        options: ["от 1.2", "от 1.2 до 5", "от 1.5 - 3", "от 3"],
        correct: 0
    },
    {
        id: 10,
        question: "Максимальная сумма фрибет, которую можно получить в бонусе 'Экспресс буст':",
        options: ["5000 в месяц", "500 в месяц", "101 в день", "1000 в месяц"],
        correct: 0
    },
    {
        id: 11,
        question: "Максимальная сумма фрибет, которую можно получить в бонусе '1000BYN за серию неудачных ставок':",
        options: ["1000", "10000", "5000", "500"],
        correct: 0
    },
    {
        id: 12,
        question: "Размер фрибета в бонусе '1000BYN за серию неудачных ставок' исчисляется, исходя из....:",
        options: [
            "минимальной суммы ставки в серии ставок.",
            "количества самих ставок",
            "даты совершения ставок",
            "на усмотрение букмекера"
        ],
        correct: 0
    },
    {
        id: 13,
        question: "С какими коэффициентами попадают события в бонус '1000BYN за серию неудачных ставок':",
        options: ["1.5 - 3", "от 1.2", "от 3", "до 3"],
        correct: 3
    },
    {
        id: 14,
        question: "Типы ставок подходящие под бонус '1000BYN серию неудачных ставок':",
        options: [
            "Только одинары (лайв/линия)",
            "Одинары и экспрессы",
            "Одинары, экспрессы, VIP",
            "Все варианты верные"
        ],
        correct: 1
    },
    {
        id: 15,
        question: "Для участия в бонусе 'VIP кешбек' нужно:",
        options: [
            "Верификация, пополнение от 20р, нажать кнопку 'Принять участие'",
            "Верификация, нажать кнопку 'Принять участие', пополнение от 30р, совершать ставки на спорт",
            "Верификация, нажать кнопку 'Принять участие', совершать ставки на спорт",
            "Правильных вариантов нет"
        ],
        correct: 2
    },
    {
        id: 16,
        question: "К какому результату приведет невыполнение условий по VIP CASHBACK для участника со статусом 'Start Pro'?",
        options: [
            "Участник сохранит статус Start Pro, но не получит кэшбэк за прошедший месяц",
            "Участник будет полностью исключен из программы VIP CASHBACK и ему заново нужно будет принять участие",
            "Статус участника будет понижен на один уровень; он станет «Участником VIP CASHBACK без статуса» и продолжит участие в программе.",
            "Статус будет понижен до уровня Start Elite, так как при понижении внутри категории Start всегда выбирается крайний верхний статус следующей ступени."
        ],
        correct: 2
    },
    {
        id: 17,
        question: "Минимальный и максимальный процент кешбека, который доступен в бонусе 'VIP кешбек':",
        options: ["8% и 20%", "10% и 30%", "4% и 100%", "5% и 50%"],
        correct: 0
    },
    {
        id: 18,
        question: "Как происходит перерасчет статусов в бонусе 'VIP кешбек'?",
        options: [
            "Start и Gold производится раз в три месяца",
            "Maximum производится раз в месяц",
            "Gold и Maximum раз в три месяца",
            "Правильных вариантов нет"
        ],
        correct: 3
    },
    {
        id: 19,
        question: "Для получения бонуса '22% к депозиту' игрок сделал пополнение 30руб, но бонус не получил, по какой причине?",
        options: [
            "Не авторизовался в приложении",
            "Превысил лимит по сумме",
            "Пополнил двумя платежами по 15р",
            "Все варианты верны"
        ],
        correct: 3
    },
    {
        id: 20,
        question: "Игроку выпал множитель х200 в 'Слоте дня', ставка прокрута была 0,40коп но обещанные фриспины он не получил, почему?",
        options: [
            "Не обратился в телеграмм канал",
            "Сумма ставки не подходит для бонуса",
            "Множитель не подходит для бонуса",
            "Правильных вариантов нет"
        ],
        correct: 2
    },
    {
        id: 21,
        question: "Игроку выпал множитель х400 в 'Слоте дня', ставка прокрута была 0,80коп но обещанные фриспины он не получил, почему?",
        options: [
            "Не обратился в телеграмм канал",
            "Сумма ставки не подходит для бонуса",
            "Множитель не подходит для бонуса",
            "Правильных вариантов нет"
        ],
        correct: 0
    },
    {
        id: 22,
        question: "Игрок хотел воспользоваться бонусом 'Двойная выгода'. Ввел промокод, пополнил баланс на 5р, но фриспины не получил",
        options: [
            "Не написал на почту",
            "Не отыграл пополнение",
            "Пополнил на меньшую сумму, чем нужно",
            "Все варианты верны"
        ],
        correct: 2
    },
    {
        id: 23,
        question: "Игрок хотел воспользоваться бонусом 'Двойная выгода'. Сперва ввёл промокод, пополнил баланс на 15р, но фриспины не получил. В чем причина?",
        options: [
            "Не написал на почту",
            "Не отыграл пополнение",
            "Пополнил на меньшую сумму, чем нужно",
            "Все варианты верны"
        ],
        correct: 1
    },
    {
        id: 24,
        question: "Если игрок по общей сумме ставок выполнил условия для одного статуса, а по сумме проигрыша — для другого, какой статус ему будет присвоен??",
        options: [
            "Тот, который соответствует сумме проигрыша",
            "Тот, который соответствует сумме ставок",
            "Более высокий из двух",
            "Более низкий из двух"
        ],
        correct: 2
    },
    {
        id: 25,
        question: "Каковы обязательные условия для активации бонуса '22% к депозиту'?",
        options: [
            "Пополнение от 10 BYN и наличие любого аккаунта.",
            "Авторизация через приложение, депозит от 30 BYN.",
            "Обращение в службу поддержки после каждого пополнения от 30 BYN.",
            "Авторизация на сайте через браузер и пополнение на любую сумму."
        ],
        correct: 1
    },
    {
        id: 26,
        question: "Если игрок активировал бонус для игры в КАЗИНО и совершил вывод средств, через какое время ему станет доступно повторное использование этого бонуса?",
        options: [
            "Через 24 часа.",
            "Через 48 часов.",
            "Через 5 дней.",
            "Сразу после следующего пополнения."
        ],
        correct: 1
    },
    {
        id: 27,
        question: "Какие лимиты установлены на максимальную сумму бонуса '22% к депозиту'?",
        options: [
            "Не более 101 BYN в день и не более 500 BYN за последние 30 дней.",
            "Ограничений по сумме нет, бонус начисляется на каждое пополнение.",
            "101 руб за каждое пополнение",
            "Максимум 500 BYN в день."
        ],
        correct: 0
    },
    {
        id: 28,
        question: "Как происходит начисление и отыгрыш бонусов для КАЗИНО, если у игрока накопилось несколько таких предложений?",
        options: [
            "Все бонусы суммируются и отыгрываются одновременно одной общей суммой.",
            "Бонусы не суммируются: они начисляются и отыгрываются строго по очереди.",
            "При получении нового бонуса старый автоматически аннулируется.",
            "Игрок сам выбирает в приложении, какой из бонусов отыгрывать первым."
        ],
        correct: 1
    },
    {
        id: 29,
        question: "Какое условие по депозиту должен выполнить игрок, чтобы участвовать в бонусе «1 000 000 BYN»?",
        options: [
            "Необходимо пополнить счет ровно на 20 BYN за 1 минуту до прогноза.",
            "Сумма пополнений игрового счета за последние 5 дней должна быть не менее 20 BYN.",
            "Достаточно иметь на балансе 20 BYN, время пополнения значения не имеет.",
            "Нужно пополнить баланс на сумму от 100 BYN в течение текущих суток."
        ],
        correct: 1
    },
    {
        id: 30,
        question: "Как система рассчитывает прогноз, если один из предложенных в тираже матчей не состоялся?",
        options: [
            "Этот матч автоматически считается угаданным для всех участников.",
            "Весь тираж аннулируется, и игроку возвращается право на новый прогноз.",
            "Прогноз на данный матч считается неугаданным.",
            "Сумма приза уменьшается пропорционально количеству несостоявшихся матчей."
        ],
        correct: 2
    }
];

// Копия массива для работы
let questions = [];

// Глобальные переменные состояния
let currentQuestion = 0;
let userAnswers = [];
let userCorrect = [];
let testCompleted = false;
let testStartTime = null;
let testDuration = 0;
let autoNextTimeout = null;
let questionTimer = null;
let questionTimeLeft = 30;
let totalCorrect = 0;
let totalWrong = 0;
const MAX_WRONG = 2;

// Элементы DOM
const startScreen = document.getElementById('startScreen');
const startBtn = document.getElementById('startBtn');
const testContainer = document.querySelector('.test-container');
const questionCard = document.getElementById('questionCard');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');
const finishBtn = document.getElementById('finishBtn');
const resultsSection = document.getElementById('resultsSection');
const timerElement = document.getElementById('timer');
const questionTimerElement = document.getElementById('questionTimer');
const timerCircle = document.querySelector('.timer-circle');
const correctCountEl = document.getElementById('correctCount');
const wrongCountEl = document.getElementById('wrongCount');
const wrongLimitEl = document.getElementById('wrongLimit');

// --- ФУНКЦИИ РАНДОМИЗАЦИИ ---

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function prepareQuestions() {
    // Делаем глубокую копию, чтобы не испортить исходные данные
    questions = JSON.parse(JSON.stringify(questionsData));

    // Перемешиваем сами вопросы
    shuffleArray(questions);

    // Перемешиваем ответы внутри каждого вопроса
    questions.forEach(q => {
        const correctOptionText = q.options[q.correct];
        shuffleArray(q.options);
        // Находим новый индекс правильного ответа после перемешивания строк
        q.correct = q.options.indexOf(correctOptionText);
    });
}

// --- ЛОГИКА ТЕСТА ---

function startTest() {
    prepareQuestions(); // Перемешиваем перед началом
    startScreen.style.display = 'none';
    testContainer.style.display = 'flex';
    timerElement.style.display = 'block';

    resetTestState();
    testStartTime = new Date();
    showQuestion();
    updateProgress();
    updateNavigationButtons();
    updateScoreDisplay();
    startTestTimer();
    startQuestionTimer();
}

function resetTestState() {
    currentQuestion = 0;
    userAnswers = new Array(questions.length).fill(null);
    userCorrect = new Array(questions.length).fill(null);
    totalCorrect = 0;
    totalWrong = 0;
    testCompleted = false;
    clearTimeout(autoNextTimeout);
    stopQuestionTimer();
}

function showQuestion() {
    const question = questions[currentQuestion];
    let optionsHtml = '';

    question.options.forEach((option, index) => {
        const letter = String.fromCharCode(65 + index);
        const isSelected = userAnswers[currentQuestion] === index;
        const isCorrect = userCorrect[currentQuestion];

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

    questionCard.innerHTML = `
        <div class="question-text">${currentQuestion + 1}. ${question.question}</div>
        <div class="options-container">${optionsHtml}</div>
    `;
}

function selectOption(optionIndex) {
    if (testCompleted || userAnswers[currentQuestion] !== null) return;

    userAnswers[currentQuestion] = optionIndex;
    const isCorrect = (optionIndex === questions[currentQuestion].correct);
    userCorrect[currentQuestion] = isCorrect;

    if (isCorrect) totalCorrect++;
    else totalWrong++;

    updateScoreDisplay();

    if (totalWrong > MAX_WRONG) {
        failTest();
        return;
    }

    stopQuestionTimer();
    showQuestion();
    updateNavigationButtons();

    autoNextTimeout = setTimeout(() => {
        if (currentQuestion < questions.length - 1) nextQuestion();
        else updateNavigationButtons();
    }, 300);
}

function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        resetQuestionTimer();
        showQuestion();
        updateProgress();
        updateNavigationButtons();
        scrollToTop();
    }
}

function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        resetQuestionTimer();
        showQuestion();
        updateProgress();
        updateNavigationButtons();
        scrollToTop();
    }
}

function scrollToTop() {
    const qc = document.querySelector('.question-container');
    if (qc) qc.scrollTop = 0;
}

function updateProgress() {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    if (progressFill) progressFill.style.width = `${progress}%`;
    progressText.textContent = `Вопрос ${currentQuestion + 1} из ${questions.length}`;
}

function updateNavigationButtons() {
    const allAnswered = userAnswers.every(ans => ans !== null);
    finishBtn.style.display = allAnswered ? 'flex' : 'none';
}

function updateScoreDisplay() {
    if (correctCountEl) correctCountEl.textContent = totalCorrect;
    if (wrongCountEl) wrongCountEl.textContent = totalWrong;
    if (wrongLimitEl) wrongLimitEl.textContent = `${totalWrong}/${MAX_WRONG}`;
}

function startTestTimer() {
    setInterval(() => {
        if (!testStartTime || testCompleted) return;
        const now = new Date();
        const diff = now - testStartTime;
        const h = Math.floor(diff / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        const s = Math.floor((diff % 60000) / 1000);
        timerElement.textContent = `${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
        testDuration = diff;
    }, 1000);
}

function startQuestionTimer() {
    questionTimeLeft = 30;
    updateQuestionTimerDisplay();
    questionTimer = setInterval(() => {
        questionTimeLeft--;
        updateQuestionTimerDisplay();
        if (questionTimeLeft <= 0) {
            stopQuestionTimer();
            if (userAnswers[currentQuestion] === null) handleTimeout();
        }
    }, 1000);
}

function handleTimeout() {
    userAnswers[currentQuestion] = null;
    userCorrect[currentQuestion] = false;
    totalWrong++;
    updateScoreDisplay();
    if (totalWrong > MAX_WRONG) failTest();
    else if (currentQuestion < questions.length - 1) nextQuestion();
    else updateNavigationButtons();
}

function updateQuestionTimerDisplay() {
    if (questionTimerElement) {
        questionTimerElement.textContent = questionTimeLeft;
        if (timerCircle) {
            timerCircle.classList.remove('warning', 'danger');
            if (questionTimeLeft <= 10 && questionTimeLeft > 5) timerCircle.classList.add('warning');
            else if (questionTimeLeft <= 5) timerCircle.classList.add('danger');
        }
    }
}

function stopQuestionTimer() {
    clearInterval(questionTimer);
}

function resetQuestionTimer() {
    stopQuestionTimer();
    startQuestionTimer();
}

function failTest() {
    testCompleted = true;
    stopQuestionTimer();
    renderResults(false);
}

function finishTest() {
    testCompleted = true;
    stopQuestionTimer();
    renderResults(true);
}

function renderResults(isFinished) {
    questionCard.style.display = 'none';
    finishBtn.style.display = 'none';
    resultsSection.style.display = 'block';
    resultsSection.classList.add('active');

    const durationM = Math.floor(testDuration / 60000);
    const durationS = Math.floor((testDuration % 60000) / 1000);

    const wrongAnswers = [];
    userAnswers.forEach((ans, i) => {
        if (userCorrect[i] === false) {
            wrongAnswers.push({
                q: questions[i].question,
                mine: ans !== null ? questions[i].options[ans] : 'Время вышло',
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

    const title = totalWrong > MAX_WRONG ? 'Тест не сдан' : 'Результаты тестирования';
    const msg = totalWrong > MAX_WRONG ? `Допущено ошибок: ${totalWrong}. Лимит: ${MAX_WRONG}` : 'Поздравляем! Вы прошли проверку знаний.';

    resultsSection.innerHTML = `
        <h3>${title}</h3>
        <div class="score-card">
            <div class="score-number">${totalCorrect}</div>
            <div class="score-total">из ${questions.length} правильно</div>
            <div class="score-message">${msg}</div>
            <div class="test-duration">Время: ${durationM} мин ${durationS} сек</div>
        </div>
        ${wrongHtml}
        <button class="btn btn-primary restart-btn" onclick="restartTest()"><i class="fas fa-redo"></i> На главную</button>
    `;
    scrollToTop();
}

function restartTest() {
    resetTestState();
    startScreen.style.display = 'flex';
    testContainer.style.display = 'none';
    resultsSection.style.display = 'none';
    resultsSection.classList.remove('active');
    questionCard.style.display = 'block';
    timerElement.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    startBtn.addEventListener('click', startTest);
    finishBtn.addEventListener('click', finishTest);
});