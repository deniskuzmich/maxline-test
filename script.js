// --- БАЗА ДАННЫХ ВОПРОСОВ ---
// В каждом вопросе 'answers' - это массив объектов.
// correct: true - правильный ответ. Порядок здесь не важен, скрипт всё перемешает.

const questions = [
    {
        question: "Что нужно для активации бонуса 22% к депозиту (верификация пройдена)?",
        answers: [
            { text: "Авторизоваться в приложении, пополнить от 30р.", correct: true },
            { text: "Войти в личный кабинет, пополнить от 20р.", correct: false },
            { text: "Просто скачать приложение, пополнить любым удобным способом от 20р", correct: false },
            { text: "Войти через приложение либо браузер и внести пополнение от 30р.", correct: false }
        ]
    },
    {
        question: "Чтобы воспользоваться бонусом 1млн за верный прогноз нужно:",
        answers: [
            { text: "Внести пополнение от 30р, обязательно войти через приложение.", correct: false },
            { text: "Пополнить от 20р, приложение не нужно", correct: false },
            { text: "Внести пополнение от 30р, отыграть пополнение на 100%", correct: false },
            { text: "Авторизоваться в приложении, пополнение от 30р", correct: true }
        ]
    },
    {
        question: "С каким минимальным и максимальным коэффициентом можно использовать фрибет?",
        answers: [
            { text: "1.2 - 2.0", correct: false },
            { text: "1.5 - 2.5", correct: false },
            { text: "1.5 - 3.0", correct: false }, // Проверь, какой тут верный. Я оставил false для примера
            { text: "1.4 - 3.0", correct: false }
            // ВАЖНО: В этом вопросе я поставил всё false, так как ты не указал верный в новом сообщении.
            // Поменяй на correct: true у нужного варианта! (Скорее всего 1.5 - 3.0 судя по прошлому разу)
        ]
    }
];

// Исправление для третьего вопроса (активируй правильный):
questions[2].answers[2].correct = true;


// --- ПЕРЕМЕННЫЕ СОСТОЯНИЯ ---
let currentQuestionIndex = 0;
let score = 0;
let incorrectQuestions = [];
let timer;
let timeLeft = 20; // Секунд на вопрос

// --- ЭЛЕМЕНТЫ DOM ---
const questionText = document.getElementById('question-text');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const quizBox = document.getElementById('quiz-box');
const resultBox = document.getElementById('result-box');
const scoreDisplay = document.getElementById('score');
const totalQuestionsDisplay = document.getElementById('total-questions');
const errorList = document.getElementById('error-list');
const progressBar = document.getElementById('progress');
const timerDisplay = document.getElementById('timer');

// --- ЗАПУСК ---
startQuiz();

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    incorrectQuestions = [];
    nextButton.classList.add('hidden');
    quizBox.classList.remove('hidden');
    resultBox.classList.add('hidden');
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];

    // Текст вопроса
    questionText.innerText = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

    // Прогресс бар
    let progressPercent = ((currentQuestionIndex) / questions.length) * 100;
    progressBar.style.width = `${progressPercent}%`;

    // 1. Копируем варианты ответов, чтобы не менять исходный массив
    // 2. Перемешиваем их
    const shuffledAnswers = currentQuestion.answers
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);

    // Создаем кнопки
    shuffledAnswers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');

        // Сохраняем правильность прямо в dataset кнопки
        if (answer.correct) {
            button.dataset.correct = "true";
        }

        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });

    // Запускаем таймер
    startTimer();
}

function resetState() {
    clearInterval(timer); // Сброс таймера
    timeLeft = 20;
    timerDisplay.innerText = timeLeft;
    timerDisplay.style.color = "#ffeb3b"; // Возвращаем желтый цвет

    nextButton.classList.add('hidden');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = timeLeft;

        // Если осталось мало времени, красим таймер в красный
        if (timeLeft <= 5) {
            timerDisplay.style.color = "#f44336";
        }

        if (timeLeft <= 0) {
            clearInterval(timer);
            handleTimeout();
        }
    }, 1000);
}

function handleTimeout() {
    // Время вышло - считаем как ошибку
    incorrectQuestions.push(questions[currentQuestionIndex].question + " (Время вышло)");

    // Блокируем кнопки
    Array.from(answerButtonsElement.children).forEach(button => {
        button.disabled = true;
        // Можно визуально показать, что время вышло, например покрасить все серым
        button.style.opacity = "0.5";
    });

    // Показываем кнопку "Дальше"
    nextButton.classList.remove('hidden');
}

function selectAnswer(e) {
    clearInterval(timer); // Останавливаем таймер при ответе

    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) {
        selectedBtn.classList.add('correct');
        score++;
    } else {
        selectedBtn.classList.add('wrong');
        incorrectQuestions.push(questions[currentQuestionIndex].question);
        // Правильный ответ НЕ подсвечиваем, как и договаривались
    }

    // Блокируем все кнопки
    Array.from(answerButtonsElement.children).forEach(button => {
        button.disabled = true;
    });

    nextButton.classList.remove('hidden');
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
});

function showScore() {
    quizBox.classList.add('hidden');
    resultBox.classList.remove('hidden');

    scoreDisplay.innerText = score;
    totalQuestionsDisplay.innerText = questions.length;

    errorList.innerHTML = '';

    if (incorrectQuestions.length === 0) {
        errorList.innerHTML = '<li style="border-left: 4px solid #4caf50; background: #1b5e20;">Идеально! Ошибок нет.</li>';
    } else {
        incorrectQuestions.forEach(question => {
            const li = document.createElement('li');
            li.innerText = question;
            errorList.appendChild(li);
        });
    }
}