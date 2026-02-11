const questions = [
    { id: 1, question: "Для активации приветственного бонуса '333FS' нужно:", options: ["Верификация, авторизация в приложении, пополнение от 30р", "Верификация, пополнение от 10р", "Верификация, авторизация в приложении, пополнить от 30р, отыграть пополнение на 100%", "Верификация, авторизация в приложении, пополнение от 20р"], correct: 3 },
    { id: 2, question: "Для активации приветственного бонуса '77FB' нужно:", options: ["Верификация, авторизация в приложении, пополнение от 30р", "Верификация, написать в bonus@maxline.by, пополнить от 20р", "Верификация, авторизация в приложении, пополнить от 30р, отыграть пополнение на 100%", "Верификация, авторизация в приложении, пополнение от 20р"], correct: 3 },
    { id: 3, question: "Какие события участвуют в бонусе 'Кешбек 100% на спорт (ML платит)':", options: ["Одиночные ставки по линии и/или Live, c максимальным коэффициентом '5'.", "Одиночные ставки по линии и/или Live,, c максимальным коэффициентом '3'.", "Одиночные ставки по линии и/или Live, а так же экспрессы c максимальным коэффициентом '5'.", "Одиночные ставки по линии и/или Live, а так же VIP ставки c максимальным коэффициентом '5'."], correct: 0 },
    { id: 4, question: "Максимальная сумма фрибет, которая возможна в бонусе 'Кешбек 100% на спорт':", options: ["5000", "1000", "101", "500"], correct: 1 },
    { id: 5, question: "С какими коэффициентами можно использовать фрибет?", options: ["до 3", "1.2 - 3", "1.5 - 5", "1.5 - 3"], correct: 3 },
    { id: 6, question: "Минимальная и максимальная сумма, которую можно забрать в бонусе 'Кешбек 100% на казино':", options: ["1 - 1000", "10 - 10000", "1 - 101", "5 - 500"], correct: 0 },
    { id: 7, question: "Какое количество исходов попадает под бонус 'Экспресс буст':", options: ["от 5 до 20", "от 3 до 16", "от 10 до 15 (16 по пятницам)", "от 4 до 20"], correct: 3 },
    { id: 8, question: "Минимальный и максимальный процент к выйгрышу в бонусе 'Экспресс буст':", options: ["от 5 до 20", "от 4 до 20", "от 4 до 100", "от 8 до 20"], correct: 2 },
    { id: 9, question: "С какими коэффициентами попадают события в бонус 'Экспресс буст':", options: ["от 1.2", "от 1.2 до 5", "от 1.5 - 3", "от 3"], correct: 0 },
    { id: 10, question: "Максимальная сумма фрибет, которую можно получить в бонусе 'Экспресс буст':", options: ["5000 в месяц", "500 в месяц", "101 в день", "1000 в месяц"], correct: 0 },
    { id: 11, question: "Максимальная сумма фрибет, которую можно получить в бонусе '1000BYN за серию неудачных ставок':", options: ["1000", "10000", "5000", "500"], correct: 0 },
    { id: 12, question: "Размер фрибета в бонусе '1000BYN за серию неудачных ставок' исчисляется, исходя из....:", options: ["минимальной суммы ставки в серии ставок.", "количества самих ставок", "даты совершения ставок", "на усмотрение букмекера"], correct: 0 },
    { id: 13, question: "С какими коэффициентами попадают события в бонус '1000BYN за серию неудачных ставок':", options: ["1.5 - 3", "от 1.2", "от 3", "до 3"], correct: 3 },
    { id: 14, question: "Типы ставки подходящие под бонус '1000BYN серию неудачных ставок':", options: ["Только одинары (лайв/линия)", "Одинары и экспрессы", "Одинары, экспрессы, VIP", "Все варианты верные"], correct: 1 },
    { id: 15, question: "Для участия в бонусе 'VIP кешбек' нужно:", options: ["Верификация, пополнение от 20р, нажать кнопку 'Принять участие'", "Верификация, нажать кнопку 'Принять участие', пополнение от 30р, совершать ставки на спорт", "Верификация, нажать кнопку 'Принять участие', совершать ставки на спорт", "Правильных вариантов нет"], correct: 2 },
    { id: 16, question: "В случае невыполнения условий получения бонуса 'VIP кешбек' происходит что?:", options: ["понижение статуса участника на один уровень", "понижение статуса участника до уровня 'участника'", "ничего не происходит", "бонус становиться недоступным до конца месяца"], correct: 0 },
    { id: 17, question: "Минимальный и максимальный процент кешбека, который доступен в бонусе 'VIP кешбек':", options: ["8% и 20%", "10% и 30%", "4% и 100%", "5% и 50%"], correct: 0 },
    { id: 18, question: "Как происходит перерасчет статусов в бонусе 'VIP кешбек'?", options: ["Start и Gold производится раз в три месяца", "Maximum производится раз в месяц", "Gold и Maximum раз в три месяца", "Правильных вариантов нет"], correct: 3 },
    { id: 19, question: "Для получения бонуса '22% к депозиту' игрок сделал пополнение 30руб, но бонус не получил, по какой причине?", options: ["Не авторизовался в приложении", "Превысил лимит по сумме", "Пополнил двумя платежами по 15р", "Все варианты верны"], correct: 3 },
    { id: 20, question: "Игроку выпал множитель х200 в 'Слоте дня', ставка прокрута была 0,40коп но обещанные фриспины он не получил, почему?", options: ["Не обратился в телеграмм канал", "Сумма ставки не подходит для бонуса", "Множитель не подходит для бонуса", "Правильных вариантов нет"], correct: 2 },
    { id: 21, question: "Игроку выпал множитель х400 в 'Слоте дня', ставка прокрута была 0,80коп но обещанные фриспины он не получил, почему?", options: ["Не обратился в телеграмм канал", "Сумма ставки не подходит для бонуса", "Множитель не подходит для бонуса", "Правильных вариантов нет"], correct: 0 },
    { id: 22, question: "Игрок хотел воспользоваться бонусом 'Двойная выгода'. Ввел промокод, пополнил баланс на 5р, но фриспины не получил", options: ["Не написал на почту", "Не отыграл пополнение", "Пополнил на меньшую сумму, чем нужно", "Все варианты верны"], correct: 2 },
    { id: 23, question: "Игрок хотел воспользоваться бонусом 'Двойная выгода'. Сперва ввёл промокод, пополнил баланс на 15р, но фриспины не получил. В чем причина?", options: ["Не написал на почту", "Не отыграл пополнение", "Пополнил на меньшую сумму, чем нужно", "Все варианты верны"], correct: 1 }
];

let currentIdx = 0;
let score = 0;
let errors = [];
let timeLeft = 20;
let timer;

const startBtn = document.getElementById('startBtn');
const optionsCont = document.getElementById('optionsContainer');

startBtn.onclick = () => {
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('testContainer').style.display = 'flex';
    loadQuestion();
};

function loadQuestion() {
    clearInterval(timer);
    timeLeft = 20;
    updateTimerUI();

    const q = questions[currentIdx];
    document.getElementById('questionText').innerText = q.question;
    document.getElementById('progressText').innerText = `Вопрос ${currentIdx + 1} из ${questions.length}`;
    document.getElementById('progressFill').style.width = `${(currentIdx / questions.length) * 100}%`;

    optionsCont.innerHTML = '';
    q.options.forEach((opt, i) => {
        const btn = document.createElement('div');
        btn.className = 'option';
        btn.innerHTML = `<div class="option-letter">${String.fromCharCode(65+i)}</div><div class="option-text">${opt}</div>`;
        btn.onclick = () => handleSelect(i);
        optionsCont.appendChild(btn);
    });

    timer = setInterval(() => {
        timeLeft--;
        updateTimerUI();
        if(timeLeft <= 0) handleSelect(-1);
    }, 1000);
}

function updateTimerUI() {
    const el = document.getElementById('questionTimer');
    const circle = document.getElementById('timerCircle');
    el.innerText = timeLeft;
    circle.classList.toggle('danger', timeLeft <= 5);
}

function handleSelect(idx) {
    clearInterval(timer);
    const q = questions[currentIdx];

    if(idx === q.correct) {
        score++;
    } else {
        errors.push({
            q: q.question,
            mine: idx === -1 ? "Время вышло" : q.options[idx]
        });
    }

    // Мгновенный переход (задержка 150мс для ощущения клика)
    setTimeout(() => {
        currentIdx++;
        if(currentIdx < questions.length) loadQuestion();
        else showResults();
    }, 150);
}

function showResults() {
    document.getElementById('testContainer').style.display = 'none';
    document.getElementById('resultsContainer').style.display = 'flex';
    document.getElementById('scoreValue').innerText = score;
    document.getElementById('totalValue').innerText = questions.length;

    if(errors.length > 0) {
        const list = document.getElementById('wrongAnswersList');
        document.getElementById('wrongAnswersSection').style.display = 'block';
        list.innerHTML = '';
        errors.forEach(err => {
            const div = document.createElement('div');
            div.className = 'wrong-item';
            div.innerHTML = `
                <div class="wrong-question">${err.q}</div>
                <div class="wrong-answer"><i class="fas fa-times"></i> Ваш ответ: ${err.mine}</div>
            `;
            list.appendChild(div);
        });
    }
}