// Модуль для работы с API
const API_URL = 'https://maxline-test.onrender.com'; // изменить на продакшн-URL

// Сохраняем токен в localStorage
let token = localStorage.getItem('token');
let currentUser = null;

export const setToken = (newToken) => {
    token = newToken;
    if (newToken) {
        localStorage.setItem('token', newToken);
    } else {
        localStorage.removeItem('token');
    }
};

export const getToken = () => token;

export const setCurrentUser = (user) => {
    currentUser = user;
};

export const getCurrentUser = () => currentUser;

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
    setToken(data.token);
    setCurrentUser(data);
    return data;
}

// Выход
export function logout() {
    setToken(null);
    setCurrentUser(null);
    localStorage.removeItem('token');
}

// Получить список пользователей с результатами
export async function fetchUsers() {
    const res = await fetch(`${API_URL}/users`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (!res.ok) {
        if (res.status === 401) {
            logout();
            throw new Error('Сессия истекла, войдите снова');
        }
        throw new Error('Ошибка загрузки списка');
    }
    return await res.json();
}

// Сохранить результат теста
export async function saveTestResult(result) {
    const res = await fetch(`${API_URL}/test/result`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(result)
    });
    if (!res.ok) {
        if (res.status === 401) {
            logout();
            throw new Error('Сессия истекла');
        }
        throw new Error('Ошибка сохранения результата');
    }
    return await res.json();
}

// Удалить пользователя (только админ)
export async function deleteUser(userId) {
    const res = await fetch(`${API_URL}/users/${userId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Ошибка удаления');
    }
    return await res.json();
}

// Сбросить результаты пользователя (только админ)
export async function resetUserResults(userId) {
    const res = await fetch(`${API_URL}/users/${userId}/reset`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Ошибка сброса результатов');
    }
    return await res.json();
}