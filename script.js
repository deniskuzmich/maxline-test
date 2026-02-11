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
        correct: 3
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
        correct: 3
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
        question: "Какое количество исходов попадает под бонус 'Экспресс буст':",
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
        question: "Типы ставки подходящие под бонус '1000BYN серию неудачных ставок':",
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
        question: "К какому результату приведет невыполнение условий получения бонуса для участника, который находится на статусе Start Pro?",
        options: [
            "Участник сохранит статус Start Pro, но не получит кэшбэк за прошедший месяц; понижение статуса для категории Start не предусмотрено.",
            "Участник будет полностью исключен из программы VIP CASHBACK, и для возобновления участия ему потребуется повторная регистрация в акции",
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
        correct: 3
    },
    {
        id: 25, // ОСТАВИЛИ (Активация)
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
        id: 26, // НОВЫЙ (Про время вывода для КАЗИНО)
        question: "Если игрок активировал бонус для игры в КАЗИНО и совершил вывод средств, через какое время ему станет доступно повторное использование этого бонуса?",
        options: [
            "Через 24 часа.",
            "Через 48 часов.",
            "Через 5 дней.",
            "Сразу после следующего пополнения."
        ],
        correct: 1 // Правильный: 48 часов
    },
    {
        id: 27, // ОСТАВИЛИ (Лимиты)
        question: "Какие лимиты установлены на максимальную сумму бонуса '22% к депозиту'?",
        options: [
            "Не более 101 BYN в день и не более 500 BYN за последние 30 дней.",
            "Ограничений по сумме нет, бонус начисляется на каждое пополнение.",
            "Максимум 30 BYN за одно пополнение и 1000 BYN в месяц.",
            "Максимум 500 BYN в день."
        ],
        correct: 0
    },
    {
        id: 28, // НОВЫЙ (Очередность отыгрыша казино)
        question: "Как происходит начисление и отыгрыш бонусов для КАЗИНО, если у игрока накопилось несколько таких предложений?",
        options: [
            "Все бонусы суммируются и отыгрываются одновременно одной общей суммой.",
            "Бонусы не суммируются: они начисляются и отыгрываются строго по очереди.",
            "При получении нового бонуса старый автоматически аннулируется.",
            "Игрок сам выбирает в приложении, какой из бонусов отыгрывать первым."
        ],
        correct: 1 // Правильный: Отыгрываются по очереди
    },
    {
        id: 29, // Вопрос про активацию
        question: "Какое условие по депозиту должен выполнить игрок, чтобы участвовать в бонусе «1 000 000 BYN»?",
        options: [
            "Необходимо пополнить счет ровно на 20 BYN за 1 минуту до прогноза.",
            "Сумма пополнений игрового счета за последние 5 дней должна быть не менее 20 BYN.",
            "Достаточно иметь на балансе 20 BYN, время пополнения значения не имеет.",
            "Нужно пополнить баланс на сумму от 100 BYN в течение текущих суток."
        ],
        correct: 1 // Правильный: сумма за последние 5 дней
    },
    {
        id: 30, // Вопрос про использование (правила)
        question: "Как система рассчитывает прогноз, если один из предложенных в тираже матчей не состоялся?",
        options: [
            "Этот матч автоматически считается угаданным для всех участников.",
            "Весь тираж аннулируется, и игроку возвращается право на новый прогноз.",
            "Прогноз на данный матч считается неугаданным.",
            "Сумма приза уменьшается пропорционально количеству несостоявшихся матчей."
        ],
        correct: 2 // Правильный: считается неугаданным
    }
];

// Текущее состояние теста
let currentQuestion = 0;
let userAnswers = new Array(questions.length).fill(null);
let userCorrect = new Array(questions.length).fill(null); // null - не отвечен, true - правильно, false - неправильно
let testCompleted = false;
let testStartTime = null;
let testDuration = 0;
let autoNextTimeout = null;
let questionTimer = null;
let questionTimeLeft = 30;

// Статистика
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

// Начало теста
function startTest() {
    // Скрываем стартовый экран
    startScreen.style.display = 'none';

    // Показываем основной интерфейс теста
    testContainer.style.display = 'flex';

    // Показываем таймер общего времени
    timerElement.style.display = 'block';

    // Инициализируем тест
    resetTestState();
    testStartTime = new Date();
    showQuestion();
    updateProgress();
    updateNavigationButtons();
    updateScoreDisplay();
    startTestTimer();
    startQuestionTimer();
}

// Сброс состояния теста
function resetTestState() {
    currentQuestion = 0;
    userAnswers = new Array(questions.length).fill(null);
    userCorrect = new Array(questions.length).fill(null);
    totalCorrect = 0;
    totalWrong = 0;
    testCompleted = false;
    testStartTime = null;
    testDuration = 0;
    clearTimeout(autoNextTimeout);
    stopQuestionTimer();
    updateScoreDisplay();
}

// Отображение текущего вопроса
function showQuestion() {
    const question = questions[currentQuestion];

    let optionsHtml = '';
    question.options.forEach((option, index) => {
        const letter = String.fromCharCode(65 + index);
        const isSelected = userAnswers[currentQuestion] === index;
        const isCorrect = userCorrect[currentQuestion];

        let optionClass = 'option';
        if (isSelected) {
            if (isCorrect === true) {
                optionClass += ' correct';
            } else if (isCorrect === false) {
                optionClass += ' incorrect';
            } else {
                optionClass += ' selected';
            }
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

// Выбор варианта ответа
function selectOption(optionIndex) {
    if (testCompleted) return;

    // Если на этот вопрос уже отвечали, нужно вычесть из статистики
    if (userAnswers[currentQuestion] !== null) {
        const wasCorrect = userCorrect[currentQuestion];
        if (wasCorrect === true) {
            totalCorrect--;
        } else if (wasCorrect === false) {
            totalWrong--;
        }
    }

    // Сохраняем новый ответ
    userAnswers[currentQuestion] = optionIndex;
    const question = questions[currentQuestion];
    const isCorrect = (optionIndex === question.correct);
    userCorrect[currentQuestion] = isCorrect;

    // Обновляем статистику
    if (isCorrect) {
        totalCorrect++;
    } else {
        totalWrong++;
    }

    // Обновляем отображение счетчиков
    updateScoreDisplay();

    // Проверяем лимит ошибок
    if (totalWrong > MAX_WRONG) {
        failTest();
        return;
    }

    // Останавливаем таймер вопроса
    stopQuestionTimer();

    // Обновляем отображение вопроса с подсветкой
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
        resetQuestionTimer();
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
        resetQuestionTimer();
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

    const allAnswered = userAnswers.every(answer => answer !== null);

    if (allAnswered) {
        finishBtn.style.display = 'flex';
    } else {
        finishBtn.style.display = 'none';
    }
}

// Обновление отображения счетчиков правильных/неправильных ответов
function updateScoreDisplay() {
    if (correctCountEl) correctCountEl.textContent = totalCorrect;
    if (wrongCountEl) wrongCountEl.textContent = totalWrong;
    if (wrongLimitEl) wrongLimitEl.textContent = `${totalWrong}/${MAX_WRONG}`;
}

// Запуск общего таймера теста
function startTestTimer() {
    testStartTime = new Date();
    updateTestTimer();
    setInterval(updateTestTimer, 1000);
}

// Обновление общего таймера теста
function updateTestTimer() {
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

// Запуск таймера вопроса
function startQuestionTimer() {
    questionTimeLeft = 20;
    updateQuestionTimerDisplay();

    questionTimer = setInterval(() => {
        questionTimeLeft--;
        updateQuestionTimerDisplay();

        if (questionTimeLeft <= 0) {
            stopQuestionTimer();
            // Если на вопрос еще не ответили, засчитываем ошибку
            if (userAnswers[currentQuestion] === null) {
                handleTimeout();
            }
        }
    }, 1000);
}

// Обработка истечения времени на вопрос
function handleTimeout() {
    // Записываем отсутствие ответа как ошибку
    if (userAnswers[currentQuestion] !== null) return; // уже ответили

    userAnswers[currentQuestion] = null;
    userCorrect[currentQuestion] = false;
    totalWrong++;
    updateScoreDisplay();

    // Проверяем лимит ошибок
    if (totalWrong > MAX_WRONG) {
        failTest();
        return;
    }

    // Переходим к следующему вопросу
    if (currentQuestion < questions.length - 1) {
        nextQuestion();
    } else {
        updateNavigationButtons();
    }
}

// Обновление отображения таймера вопроса
function updateQuestionTimerDisplay() {
    if (questionTimerElement) {
        questionTimerElement.textContent = questionTimeLeft;

        if (timerCircle) {
            timerCircle.classList.remove('warning', 'danger');

            if (questionTimeLeft <= 10 && questionTimeLeft > 5) {
                timerCircle.classList.add('warning');
            } else if (questionTimeLeft <= 5) {
                timerCircle.classList.add('danger');
            }
        }
    }
}

// Остановка таймера вопроса
function stopQuestionTimer() {
    if (questionTimer) {
        clearInterval(questionTimer);
        questionTimer = null;
    }
}

// Сброс таймера вопроса
function resetQuestionTimer() {
    stopQuestionTimer();
    startQuestionTimer();
}

// Завершение теста досрочно из-за превышения лимита ошибок
function failTest() {
    testCompleted = true;
    stopQuestionTimer();

    // Форматирование времени теста
    const durationMinutes = Math.floor(testDuration / (1000 * 60));
    const durationSeconds = Math.floor((testDuration % (1000 * 60)) / 1000);

    // Показ результатов
    questionCard.style.display = 'none';
    finishBtn.style.display = 'none';

    resultsSection.style.display = 'block';
    resultsSection.classList.add('active');

    // Получаем список неправильных ответов
    const wrongAnswers = [];
    userAnswers.forEach((answer, index) => {
        if (userCorrect[index] === false) {
            wrongAnswers.push({
                question: questions[index].question,
                userAnswer: answer !== null ? questions[index].options[answer] : 'Время вышло',
                questionNumber: index + 1
            });
        }
    });

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
    }

    resultsSection.innerHTML = `
        <h3>Тест не сдан</h3>
        <div class="score-card">
            <div class="score-number">${totalCorrect}</div>
            <div class="score-total">правильных ответов из ${questions.length}</div>
            <div class="fail-message">
                <i class="fas fa-exclamation-triangle"></i> Допущено более ${MAX_WRONG} ошибок (${totalWrong})
            </div>
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

// Завершение теста (штатное, после ответа на все вопросы)
function finishTest() {
    testCompleted = true;

    // Останавливаем таймер вопроса
    stopQuestionTimer();

    // Пересчитываем статистику на всякий случай
    totalCorrect = 0;
    totalWrong = 0;
    userAnswers.forEach((answer, index) => {
        if (userCorrect[index] === true) totalCorrect++;
        else if (userCorrect[index] === false) totalWrong++;
    });
    updateScoreDisplay();

    // Форматирование времени теста
    const durationMinutes = Math.floor(testDuration / (1000 * 60));
    const durationSeconds = Math.floor((testDuration % (1000 * 60)) / 1000);

    // Определение сообщения в зависимости от результата
    let message = '';
    let isPassed = totalWrong <= MAX_WRONG;
    const percentage = (totalCorrect / questions.length) * 100;

    if (isPassed) {
        if (percentage >= 90) {
            message = 'Отличный результат! Вы отлично знаете правила компании!';
        } else if (percentage >= 70) {
            message = 'Хороший результат!';
        } else {
            message = 'Тест сдан. Рекомендуется повторить материал.';
        }
    } else {
        message = 'Тест не сдан. Допущено более 2 ошибок.';
    }

    // Показ результатов
    questionCard.style.display = 'none';
    finishBtn.style.display = 'none';

    resultsSection.style.display = 'block';
    resultsSection.classList.add('active');

    // Получаем список неправильных ответов
    const wrongAnswers = [];
    userAnswers.forEach((answer, index) => {
        if (userCorrect[index] === false) {
            wrongAnswers.push({
                question: questions[index].question,
                userAnswer: answer !== null ? questions[index].options[answer] : 'Нет ответа',
                questionNumber: index + 1
            });
        }
    });

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
            <div class="score-number">${totalCorrect}</div>
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
    resetTestState();

    // Показываем стартовый экран
    startScreen.style.display = 'flex';

    // Скрываем основной интерфейс теста
    testContainer.style.display = 'none';

    // Скрываем результаты
    resultsSection.style.display = 'none';
    resultsSection.classList.remove('active');

    // Сбрасываем прогресс-бар
    if (progressFill) {
        progressFill.style.width = `${(1 / questions.length) * 100}%`;
    }

    // Сбрасываем таймер вопроса
    questionTimeLeft = 20;
    if (questionTimerElement) {
        questionTimerElement.textContent = questionTimeLeft;
    }
    if (timerCircle) {
        timerCircle.classList.remove('warning', 'danger');
    }

    // Скрываем таймер общего времени
    timerElement.style.display = 'none';

    // Сбрасываем счетчики
    totalCorrect = 0;
    totalWrong = 0;
    updateScoreDisplay();
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    // Обработчик кнопки "Начать тест"
    startBtn.addEventListener('click', startTest);

    // Обработчики кнопок теста
    finishBtn.addEventListener('click', finishTest);

    // Горячие клавиши (работают только после начала теста)
    document.addEventListener('keydown', (e) => {
        if (testCompleted || startScreen.style.display !== 'none') return;

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