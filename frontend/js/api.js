// Модуль для работы с API
const API_URL = 'https://maxline-test.onrender.com/api';

// Инициализируем токены из localStorage
let accessToken = localStorage.getItem('accessToken');
let refreshToken = localStorage.getItem('refreshToken');
let currentUser = null;

// Переменная, чтобы избежать множественных запросов на обновление,
// если одновременно упало несколько запросов
let isRefreshing = false;
let refreshSubscribers = [];

// Вспомогательная функция для добавления запросов в очередь ожидания нового токена
const subscribeTokenRefresh = (cb) => {
    refreshSubscribers.push(cb);
};

// Вызов всех отложенных запросов после успешного обновления токена
const onRefreshed = (token) => {
    refreshSubscribers.map((cb) => cb(token));
    refreshSubscribers = [];
};

export const setTokens = (newAccessToken, newRefreshToken) => {
    accessToken = newAccessToken;
    refreshToken = newRefreshToken;

    if (newAccessToken) {
        localStorage.setItem('accessToken', newAccessToken);
    } else {
        localStorage.removeItem('accessToken');
    }

    if (newRefreshToken) {
        localStorage.setItem('refreshToken', newRefreshToken);
    } else {
        localStorage.removeItem('refreshToken');
    }
};

export const getAccessToken = () => accessToken;
export const getRefreshToken = () => refreshToken;

export const setCurrentUser = (user) => {
    currentUser = user;
};

export const getCurrentUser = () => currentUser;

// Универсальная обертка над fetch, которая сама обрабатывает 401 ошибку и обновляет токен
async function authenticatedFetch(url, options = {}) {
    // Гарантируем наличие заголовков
    options.headers = options.headers || {};

    // Если есть accessToken, добавляем его в каждый запрос
    if (accessToken) {
        options.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    const res = await fetch(url, options);

    // Если получили 401, пробуем обновить токен
    if (res.status === 401) {
        if (!refreshToken) {
            logout();
            throw new Error('Сессия истекла, войдите снова');
        }

        // Если обновление уже идет, ставим запрос в очередь
        if (isRefreshing) {
            return new Promise((resolve) => {
                subscribeTokenRefresh((newToken) => {
                    options.headers['Authorization'] = `Bearer ${newToken}`;
                    resolve(fetch(url, options));
                });
            });
        }

        isRefreshing = true;

        try {
            // Запрос на бэкенд для обновления токена
            const refreshRes = await fetch(`${API_URL}/auth/refresh`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ refreshToken })
            });

            if (!refreshRes.ok) {
                // Если refresh-токен тоже протух/невалиден
                throw new Error('Refresh token invalid');
            }

            const data = await refreshRes.json();
            // Предполагаем, что бэкенд вернет { accessToken, refreshToken }
            setTokens(data.accessToken, data.refreshToken);

            isRefreshing = false;
            onRefreshed(data.accessToken);

            // Повторяем исходный запрос с новым токеном
            options.headers['Authorization'] = `Bearer ${data.accessToken}`;
            return await fetch(url, options);

        } catch (error) {
            isRefreshing = false;
            logout();
            throw new Error('Сессия истекла, войдите снова');
        }
    }

    return res;
}

// === API МЕТОДЫ ===

// Регистрация
export async function register(login, password) {
    const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, password })
    });
    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Ошибка регистрации');
    }
    return await res.json();
}

// Вход
export async function login(login, password) {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, password })
    });
    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Ошибка входа');
    }
    const data = await res.json();

    // Бэкенд должен отдавать оба токена при логине
    setTokens(data.accessToken, data.refreshToken);
    setCurrentUser(data.user || data);
    return data;
}

// Выход
export function logout() {
    setTokens(null, null);
    setCurrentUser(null);
}

// Получить список пользователей с результатами
export async function fetchUsers() {
    const res = await authenticatedFetch(`${API_URL}/users`);
    if (!res.ok) {
        throw new Error('Ошибка загрузки списка');
    }
    return await res.json();
}

// Сохранить результат теста
export async function saveTestResult(result) {
    const res = await authenticatedFetch(`${API_URL}/test/result`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result)
    });
    if (!res.ok) {
        throw new Error('Ошибка сохранения результата');
    }
    return await res.json();
}

// Удалить пользователя (только админ)
export async function deleteUser(userId) {
    const res = await authenticatedFetch(`${API_URL}/users/${userId}`, {
        method: 'DELETE'
    });
    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Ошибка удаления');
    }
    return await res.json();
}

// Сбросить результаты пользователя (только админ)
export async function resetUserResults(userId) {
    const res = await authenticatedFetch(`${API_URL}/users/${userId}/reset`, {
        method: 'POST'
    });
    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Ошибка сброса результатов');
    }
    return await res.json();
}

export async function refreshCurrentUser() {
    if (!getAccessToken()) return null;
    const res = await authenticatedFetch(`${API_URL}/users/me`);
    if (res.ok) {
        const user = await res.json();
        setCurrentUser(user);
        return user;
    }
    return null;
}

export { API_URL };