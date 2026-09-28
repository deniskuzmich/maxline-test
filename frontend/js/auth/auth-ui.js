import {
    API_URL,
    getAccessToken,
    login,
    logout,
    register,
    setCurrentUser
} from '../core/api.js';
import { clearStateFromStorage, state } from '../core/state.js';
import { showNotification } from '../core/utils.js';

// Настраивает модалку входа/регистрации и кнопку выхода.
// onAuthorized(me) вызывается после успешного входа с данными пользователя.
export function initAuth(onAuthorized) {
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

    let isLoginMode = true;

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

            // После логина получаем полные данные пользователя с сервера
            const meRes = await fetch(`${API_URL}/users/me`, {
                headers: { 'Authorization': `Bearer ${getAccessToken()}` }
            });
            if (!meRes.ok) {
                throw new Error('Не удалось загрузить данные пользователя');
            }
            const me = await meRes.json();
            setCurrentUser(me); // обновляем данные пользователя (теперь есть results и role)
            state.currentUserRole = me.role;

            authModal.style.display = 'none';
            mainLayout.style.display = 'flex';
            userMenu.style.display = 'flex';
            currentUserLogin.textContent = me.login;

            onAuthorized(me);
        } catch (err) {
            authError.textContent = err.message;
            showNotification(err.message, 'error');
        }
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
}
