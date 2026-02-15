import { initElements, state, saveStateToStorage, loadStateFromStorage, clearStateFromStorage } from './state.js';
import { startTest, resumeTest } from './test.js';
import { questionsData } from './data/questions.js';
import {
    register, login, logout, fetchUsers, setToken, getToken,
    getCurrentUser, setCurrentUser, deleteUser, resetUserResults
} from './api.js';
import { selectOption } from './test.js';
import { showNotification } from './utils.js';

window.selectOption = selectOption;

// Функция кастомного подтверждения
function showConfirmDialog(title, message) {
    return new Promise((resolve) => {
        const modal = document.getElementById('confirmModal');
        const titleEl = document.getElementById('confirmTitle');
        const msgEl = document.getElementById('confirmMessage');
        const okBtn = document.getElementById('confirmOkBtn');
        const cancelBtn = document.getElementById('confirmCancelBtn');

        titleEl.textContent = title;
        msgEl.textContent = message;
        modal.style.display = 'flex';

        const closeModal = (result) => {
            modal.style.display = 'none';
            okBtn.removeEventListener('click', okHandler);
            cancelBtn.removeEventListener('click', cancelHandler);
            resolve(result);
        };

        const okHandler = () => closeModal(true);
        const cancelHandler = () => closeModal(false);

        okBtn.addEventListener('click', okHandler);
        cancelBtn.addEventListener('click', cancelHandler);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initElements();

    const authModal = document.getElementById('authModal');
    const loginTab = document.getElementById('loginTab');
    const registerTab = document.getElementById('registerTab');
    const authActionBtn = document.getElementById('authActionBtn');
    const authLogin = document.getElementById('authLogin');
    const authPassword = document.getElementById('authPassword');
    const authError = document.getElementById('authError');
    const mainLayout = document.getElementById('mainLayout');
    const userMenu = document.getElementById('userMenu');
    const currentUserLogin = document.getElementById('currentUserLogin');
    const logoutBtn = document.getElementById('logoutBtn');
    const usersList = document.getElementById('usersList');
    const startTestBtn = document.getElementById('startTestBtn');
    const preTestScreen = document.getElementById('preTestScreen');
    const questionContainer = document.getElementById('questionContainer');

    let isLoginMode = true;

    // Установка количества вопросов в предстартовом экране
    document.getElementById('preTestQuestionCount').textContent = questionsData.length;
    document.getElementById('preTestQuestionCountInfo').textContent = questionsData.length + ' вопросов';

    loginTab.addEventListener('click', () => {
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
        isLoginMode = true;
        authActionBtn.textContent = 'Войти';
        authError.textContent = '';
    });

    registerTab.addEventListener('click', () => {
        registerTab.classList.add('active');
        loginTab.classList.remove('active');
        isLoginMode = false;
        authActionBtn.textContent = 'Зарегистрироваться';
        authError.textContent = '';
    });

    authActionBtn.addEventListener('click', async () => {
        const loginValue = authLogin.value.trim();
        const passwordValue = authPassword.value.trim();

        if (!loginValue || !passwordValue) {
            authError.textContent = 'Заполните все поля';
            return;
        }

        try {
            if (isLoginMode) {
                await login(loginValue, passwordValue);
            } else {
                await register(loginValue, passwordValue);
                await login(loginValue, passwordValue);
            }

            const currentUser = getCurrentUser();
            state.currentUserRole = currentUser.role;

            authModal.style.display = 'none';
            mainLayout.style.display = 'flex';
            userMenu.style.display = 'flex';
            currentUserLogin.textContent = currentUser.login;

            loadUsers();

            preTestScreen.style.display = 'flex';
            questionContainer.style.display = 'none';

            if (loadStateFromStorage()) {
                resumeTest();
                preTestScreen.style.display = 'none';
                questionContainer.style.display = 'block';
            }
        } catch (err) {
            authError.textContent = err.message;
            showNotification(err.message, 'error');
        }
    });

    // Проверка возможности прохождения теста
    function canStartTestToday(user) {
        if (!user) return false;
        if (user.role === 'admin') return true;
        const today = new Date().toDateString();
        const hasResultToday = user.results.some(r => new Date(r.date).toDateString() === today);
        return !hasResultToday;
    }

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

    logoutBtn.addEventListener('click', () => {
        logout();
        clearStateFromStorage();
        authModal.style.display = 'flex';
        mainLayout.style.display = 'none';
        userMenu.style.display = 'none';
        authLogin.value = '';
        authPassword.value = '';
        authError.textContent = '';
        state.currentUserRole = 'user';
    });

    async function loadUsers() {
        try {
            const users = await fetchUsers();
            renderUsers(users);
        } catch (err) {
            console.error(err);
            showNotification(err.message, 'error');
            if (err.message.includes('Сессия истекла')) {
                logout();
                authModal.style.display = 'flex';
                mainLayout.style.display = 'none';
            }
        }
    }

    function renderUsers(users) {
        usersList.innerHTML = '';
        const currentUser = getCurrentUser();

        users.forEach(user => {
            const userDiv = document.createElement('div');
            userDiv.className = 'user-item';
            if (!user.lastResult) {
                userDiv.classList.add('no-result');
            } else if (user.lastResult.passed) {
                userDiv.classList.add('passed');
            } else {
                userDiv.classList.add('failed');
            }

            let resultHtml = '';
            if (user.lastResult) {
                const date = new Date(user.lastResult.date).toLocaleString('ru-RU');
                resultHtml = `
                    <div class="user-result">
                        Результат: ${user.lastResult.correctCount}/${user.lastResult.totalQuestions} 
                        <span>${user.lastResult.passed ? '✓' : '✗'}</span>
                    </div>
                    <div class="user-date">${date}</div>
                `;
            } else {
                resultHtml = '<div class="user-result">Тест не пройден</div>';
            }

            // Если текущий админ и это не он сам
            if (currentUser && currentUser.role === 'admin' && user._id !== currentUser._id) {
                resultHtml += `
                    <div class="admin-actions">
                        <button class="btn-reset" data-id="${user._id}">Сбросить</button>
                        <button class="btn-delete" data-id="${user._id}">Удалить</button>
                    </div>
                `;
            }

            userDiv.innerHTML = `
                <div class="user-login">${user.login}</div>
                ${resultHtml}
            `;
            usersList.appendChild(userDiv);
        });

        // Обработчики с кастомным подтверждением
        document.querySelectorAll('.btn-reset').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const userId = e.target.dataset.id;
                const confirmed = await showConfirmDialog(
                    'Сброс результатов',
                    'Сбросить результаты этого пользователя? Он сможет пройти тест заново.'
                );
                if (confirmed) {
                    try {
                        await resetUserResults(userId);
                        showNotification('Результаты сброшены', 'success');
                        loadUsers();
                    } catch (err) {
                        showNotification(err.message, 'error');
                    }
                }
            });
        });
        document.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const userId = e.target.dataset.id;
                const confirmed = await showConfirmDialog(
                    'Удаление пользователя',
                    'Удалить пользователя? Это действие необратимо.'
                );
                if (confirmed) {
                    try {
                        await deleteUser(userId);
                        showNotification('Пользователь удалён', 'success');
                        loadUsers();
                    } catch (err) {
                        showNotification(err.message, 'error');
                    }
                }
            });
        });
    }

    const savedToken = getToken();
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

    // Периодическое обновление списка (каждые 30 секунд)
    setInterval(() => {
        if (getToken()) {
            loadUsers();
        }
    }, 10000);
});