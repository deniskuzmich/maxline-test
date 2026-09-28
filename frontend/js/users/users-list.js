import { fetchUsers, deleteUser, resetUserResults, getCurrentUser, logout } from '../core/api.js';
import { showNotification } from '../core/utils.js';

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

export async function loadUsers() {
    try {
        const users = await fetchUsers();
        renderUsers(users);
    } catch (err) {
        console.error(err);
        showNotification(err.message, 'error');
        if (err.message.includes('Сессия истекла')) {
            logout();
            document.getElementById('authModal').style.display = 'flex';
            document.getElementById('mainLayout').style.display = 'none';
        }
    }
}

function renderUsers(users) {
    const usersList = document.getElementById('usersList');
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

export function initUsersList() {
    // Даём доступ извне (например, из test.js после сохранения результата)
    window.loadUsers = loadUsers;
}
