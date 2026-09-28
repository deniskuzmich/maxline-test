import { initElements, loadStateFromStorage, state } from './core/state.js';
import { resumeTest, selectOption, startTest } from './test/test.js';
import { questionsData } from './data/questions.js';
import {
    API_URL,
    fetchUsers,
    getAccessToken,
    getCurrentUser,
    logout,
    setCurrentUser
} from './core/api.js';
import { canStartTestToday, showNotification } from './core/utils.js';
import { initAuth } from './auth/auth-ui.js';
import { initUsersList, loadUsers } from './users/users-list.js';

window.selectOption = selectOption;

document.addEventListener('DOMContentLoaded', () => {
    initElements();

    const authModal = document.getElementById('authModal');
    const mainLayout = document.getElementById('mainLayout');
    const userMenu = document.getElementById('userMenu');
    const currentUserLogin = document.getElementById('currentUserLogin');
    const startTestBtn = document.getElementById('startTestBtn');
    const preTestScreen = document.getElementById('preTestScreen');
    const questionContainer = document.getElementById('questionContainer');

    // Установка количества вопросов в предстартовом экране
    document.getElementById('preTestQuestionCount').textContent = questionsData.length;
    document.getElementById('preTestQuestionCountInfo').textContent = questionsData.length + ' вопроса';

    initUsersList();

    // Модалка входа/регистрации; после успешного входа — запуск основного интерфейса
    initAuth((me) => {
        loadUsers(); // загружаем список всех пользователей

        // Проверяем, можно ли начать тест
        if (canStartTestToday(me)) {
            preTestScreen.style.display = 'flex';
            questionContainer.style.display = 'none';
        } else {
            showNotification('Вы уже проходили тест сегодня. Попробуйте завтра или обратитесь к администратору.', 'error');
        }

        // Проверяем сохранённое состояние (если есть незавершённый тест)
        if (loadStateFromStorage()) {
            resumeTest();
            preTestScreen.style.display = 'none';
            questionContainer.style.display = 'block';
        }
    });

    startTestBtn.addEventListener('click', () => {
        const user = getCurrentUser();
        if (!canStartTestToday(user)) {
            showNotification('Вы уже проходили тест сегодня. Попробуйте завтра или обратитесь к администратору.', 'error');
            return;
        }
        preTestScreen.style.display = 'none';
        questionContainer.style.display = 'block';
        startTest();
    });

    // Восстановление сессии по сохранённому токену
    const savedToken = getAccessToken();
    if (savedToken) {
        (async () => {
            try {
                await fetchUsers(); // проверка токена
                authModal.style.display = 'none';
                mainLayout.style.display = 'flex';
                userMenu.style.display = 'flex';

                const meRes = await fetch(`${API_URL}/users/me`, {
                    headers: { 'Authorization': `Bearer ${savedToken}` }
                });
                if (meRes.ok) {
                    const me = await meRes.json();
                    setCurrentUser(me);
                    state.currentUserRole = me.role;
                    currentUserLogin.textContent = me.login;
                }
                loadUsers();

                preTestScreen.style.display = 'flex';
                questionContainer.style.display = 'none';

                if (loadStateFromStorage()) {
                    resumeTest();
                    preTestScreen.style.display = 'none';
                    questionContainer.style.display = 'block';
                }
            } catch (err) {
                console.error('Токен недействителен', err);
                logout();
            }
        })();
    }

    // Периодическое обновление списка (каждые 10 секунд)
    setInterval(() => {
        if (getAccessToken()) {
            loadUsers();
        }
    }, 10000);
});
