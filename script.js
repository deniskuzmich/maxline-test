// База данных вопросов для букмекерской компании
const questions = [
    {
        id: 1,
        question: "Для активации приветственного бонуса '333FS' нужно:",
        options: [
            "Верификация, авторизация в приложении, пополнение от 30р",
            "Верификация, пополнение от 10р",
            "Верификация, авторизация в приложении, пополнить от 30р, отыграть пополнение на 100%",
            "Верификация, авторизация в приложении, пополнение от 20р"
        ],
        correct: 3 // Укажите индекс правильного ответа (0-3)
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
        correct: 3 // Укажите индекс правильного ответа (0-3)
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
        correct: 0 // Укажите индекс правильного ответа (0-3)
    },
    {
        id: 4,
        question: "Максимальная сумма фрибет, которая возможна в бонусе 'Кешбек 100% на спорт':",
        options: ["5000", "1000", "101", "500"],
        correct: 1 // Укажите индекс правильного ответа (0-3)
    },
    {
        id: 5,
        question: "С какими коэффициентами можно использовать фрибет?",
        options: ["до 3", "1.2 - 3", "1.5 - 5", "1.5 - 3"],
        correct: 3 // Укажите индекс правильного ответа (0-3)
    },
    {
        id: 6,
        question: "Минимальная и максимальная сумма, которую можно забрать в бонусе 'Кешбек 100% на казино':",
        options: ["1 - 1000", "10 - 10000", "1 - 101", "5 - 500"],
        correct: 0 // Укажите индекс правильного ответа (0-3)
    },
    {
        id: 7,
        question: "Какое количество исходов попадает под бонус 'Экспресс буст':",
        options: [
            "от 5 до 20",
            "от 3 до 16",
            "от 10 до 15 (16 по пятницам)",
            "от 4 до 20"
        ],
        correct: 3 // Укажите индекс правильного ответа (0-3)
    },
    {
        id: 8,
        question: "Минимальный и максимальный процент к выйгрышу в бонусе 'Экспресс буст':",
        options: ["от 5 до 20", "от 4 до 20", "от 4 до 100", "от 8 до 20"],
        correct: 2 // Укажите индекс правильного ответа (0-3)
    },
    {
        id: 9,
        question: "С какими коэффициентами попадают события в бонус 'Экспресс буст':",
        options: ["от 1.2", "от 1.2 до 5", "от 1.5 - 3", "от 3"],
        correct: 0 // Укажите индекс правильного ответа (0-3)
    },
    {
        id: 10,
        question: "Максимальная сумма фрибет, которую можно получить в бонусе 'Экспресс буст':",
        options: ["5000 в месяц", "500 в месяц", "101 в день", "1000 в месяц"],
        correct: 0 // Укажите индекс правильного ответа (0-3)
    },
    {
        id: 11,
        question: "Максимальная сумма фрибет, которую можно получить в бонусе '1000BYN за серию неудачных ставок':",
        options: ["1000", "10000", "5000", "500"],
        correct: 0 // Укажите индекс правильного ответа (0-3)
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
        correct: 0 // Укажите индекс правильного ответа (0-3)
    },
    {
        id: 13,
        question: "С какими коэффициентами попадают события в бонус '1000BYN за серию неудачных ставок':",
        options: ["1.5 - 3", "от 1.2", "от 3", "до 3"],
        correct: 3 // Укажите индекс правильного ответа (0-3)
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
        correct: 1 // Укажите индекс правильного ответа (0-3)
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
        correct: 2 // Укажите индекс правильного ответа (0-3)
    },
    {
        id: 16,
        question: "В случае невыполнения условий получения бонуса 'VIP кешбек' происходит что?:",
        options: [
            "понижение статуса участника на один уровень",
            "понижение статуса участника до уровня 'участника'",
            "ничего не происходит",
            "бонус становиться недоступным до конца месяца"
        ],
        correct: 0 // Укажите индекс правильного ответа (0-3)
    },
    {
        id: 17,
        question: "Минимальный и максимальный процент кешбека, который доступен в бонусе 'VIP кешбек':",
        options: ["8% и 20%", "10% и 30%", "4% и 100%", "5% и 50%"],
        correct: 0 // Укажите индекс правильного ответа (0-3)
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
        correct: 3 // Укажите индекс правильного ответа (0-3)
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
        correct: 3 // Укажите индекс правильного ответа (0-3)
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
        correct: 2 // Укажите индекс правильного ответа (0-3)
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
        correct: 0 // Укажите индекс правильного ответа (0-3)
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
        correct: 2 // Укажите индекс правильного ответа (0-3)
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
        correct: 1 // Укажите индекс правильного ответа (0-3)
    }
];

// Текущее состояние теста
let currentQuestion = 0;
let userAnswers = new Array(questions.length).fill(null);
let testCompleted = false;
let testStartTime = null;
let testDuration = 0;
let autoNextTimeout = null;

// Элементы DOM
const questionCard = document.getElementById('questionCard');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');
const prevBtn = document.getElementById('prevBtn');
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
        const letter = String.fromCharCode(65 + index);
        const isSelected = userAnswers[currentQuestion] === index;

        let optionClass = 'option';
        if (isSelected) {
            optionClass += ' selected';
        }

        optionsHtml += `
            <div class="option ${optionClass}" onclick="selectOption(${index})" data-key="${index + 1}">
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

// Выбор варианта ответа с автопереходом
function selectOption(optionIndex) {
    if (testCompleted) return;

    userAnswers[currentQuestion] = optionIndex;
    showQuestion();
    updateNavigationButtons();

    // Автопереход к следующему вопросу через 0.3 секунды
    clearTimeout(autoNextTimeout);
    autoNextTimeout = setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
            nextQuestion();
        } else {
            updateNavigationButtons();
        }
    }, 300);
}

// Следующий вопрос
function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion();
        updateProgress();
        updateNavigationButtons();
        scrollToTop();
    }
}

// Предыдущий вопрос
function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion();
        updateProgress();
        updateNavigationButtons();
        scrollToTop();
    }
}

// Прокрутка вверх
function scrollToTop() {
    const questionContainer = document.querySelector('.question-container');
    if (questionContainer) {
        questionContainer.scrollTop = 0;
    }
}

// Обновление прогресса
function updateProgress() {
    const progress = ((currentQuestion + 1) / questions.length) * 100;

    if (progressFill) {
        progressFill.style.width = `${progress}%`;
    }

    progressText.textContent = `Вопрос ${currentQuestion + 1} из ${questions.length}`;
}

// Обновление кнопок навигации
function updateNavigationButtons() {
    prevBtn.disabled = currentQuestion === 0;

    const allAnswered = userAnswers.every(answer => answer !== null);

    if (allAnswered) {
        finishBtn.style.display = 'flex';
    } else {
        finishBtn.style.display = 'none';
    }
}

// Запуск таймера
function startTimer() {
    testStartTime = new Date();
    updateTimer();
    const timerInterval = setInterval(updateTimer, 1000);

    // Очистка интервала при завершении теста
    return () => clearInterval(timerInterval);
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

    userAnswers.forEach((answer, index) => {
        const question = questions[index];
        const isCorrect = answer === question.correct;

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
    prevBtn.style.display = 'none';
    finishBtn.style.display = 'none';

    resultsSection.style.display = 'block';
    resultsSection.classList.add('active');

    let wrongAnswersHtml = '';
    if (wrongAnswers.length > 0) {
        wrongAnswersHtml = `
            <div class="wrong-answers-section">
                <h4><i class="fas fa-exclamation-circle"></i> Неправильные ответы (${wrongAnswers.length}):</h4>
                <div class="wrong-answers-list">
                    ${wrongAnswers.map(item => `
                        <div class="wrong-item">
                            <div class="wrong-question">${item.questionNumber}. ${item.question}</div>
                            <div class="wrong-answer">
                                <i class="fas fa-times"></i> Ваш ответ: ${item.userAnswer}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    } else {
        wrongAnswersHtml = `
            <div class="all-correct">
                <i class="fas fa-check-circle"></i>
                <h4>Все ответы правильные!</h4>
                <p>Вы ответили правильно на все вопросы теста</p>
            </div>
        `;
    }

    resultsSection.innerHTML = `
        <h3>Результаты тестирования</h3>
        <div class="score-card">
            <div class="score-number">${correctCount}</div>
            <div class="score-total">правильных ответов из ${questions.length}</div>
            <div class="score-message">${message}</div>
            <div class="test-duration">
                <i class="far fa-clock"></i> Время тестирования: ${durationMinutes} мин ${durationSeconds} сек
            </div>
        </div>
        ${wrongAnswersHtml}
        <div class="navigation">
            <button class="btn btn-primary restart-btn" onclick="restartTest()">
                <i class="fas fa-redo"></i> Пройти тест заново
            </button>
        </div>
    `;

    scrollToTop();
}

// Перезапуск теста
function restartTest() {
    currentQuestion = 0;
    userAnswers = new Array(questions.length).fill(null);
    testCompleted = false;
    testStartTime = null;
    testDuration = 0;
    clearTimeout(autoNextTimeout);

    questionCard.style.display = 'block';
    resultsSection.style.display = 'none';
    resultsSection.classList.remove('active');
    prevBtn.style.display = 'flex';
    finishBtn.style.display = 'none';

    // Сбрасываем прогресс-бар
    if (progressFill) {
        progressFill.style.width = `${(1 / questions.length) * 100}%`;
    }

    initTest();
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    initTest();

    // Обработчики кнопок
    prevBtn.addEventListener('click', prevQuestion);
    finishBtn.addEventListener('click', finishTest);

    // Горячие клавиши
    document.addEventListener('keydown', (e) => {
        if (testCompleted) return;

        if (e.key === 'ArrowLeft' && currentQuestion > 0) {
            prevQuestion();
        } else if (e.key === 'ArrowRight' && currentQuestion < questions.length - 1) {
            if (userAnswers[currentQuestion] !== null) {
                nextQuestion();
            }
        } else if (e.key >= '1' && e.key <= '4') {
            const optionIndex = parseInt(e.key) - 1;
            selectOption(optionIndex);
        } else if (e.key === 'Enter' && finishBtn.style.display !== 'none') {
            finishTest();
        }
    });
});