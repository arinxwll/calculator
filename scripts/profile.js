
const profileAvatarEl = document.getElementById('profileAvatar');
const profileNameEl = document.getElementById('profileName');
const profileEmailEl = document.getElementById('profileEmail');
const memberSinceEl = document.getElementById('memberSince');
const currentBalanceEl = document.getElementById('currentBalanceValue');
const transactionsCountEl = document.getElementById('transactionsCount');
const completedTasksCountEl = document.getElementById('completedTasksCount');
const editProfileModal = document.getElementById('editProfileModal');
const editAvatarInput = document.getElementById('editAvatarInput');
const editNameInput = document.getElementById('editNameInput');
const editEmailInput = document.getElementById('editEmailInput');

function loadProfileData() {

    const userData = JSON.parse(localStorage.getItem('userProfile')) || {
        avatar: 'AS',
        name: 'Arina Sharabura',
        email: 'arina.200011@email.com',
        memberSince: 'May 2025'
    };

    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    if (profileAvatarEl) profileAvatarEl.textContent = userData.avatar;
    if (profileNameEl) profileNameEl.textContent = userData.name;
    if (profileEmailEl) profileEmailEl.textContent = userData.email;
    if (memberSinceEl) memberSinceEl.textContent = `Member since ${userData.memberSince}`;

    let totalBalance = 0;
    transactions.forEach(transaction => {
        if (transaction.type === 'income') {
            totalBalance += parseFloat(transaction.amount) || 0;
        } else if (transaction.type === 'expense') {
            totalBalance -= parseFloat(transaction.amount) || 0;
        }
    });

    if (currentBalanceEl) {
        currentBalanceEl.textContent = `$${totalBalance.toFixed(2)}`;
        if (totalBalance < 0) {
            currentBalanceEl.style.color = '#e57373';
        } else {
            currentBalanceEl.style.color = '#5a6e5f';
        }
    }

    if (transactionsCountEl) {
        transactionsCountEl.textContent = transactions.length;
    }

    if (completedTasksCountEl) {
        const completedTasks = tasks.filter(task => task.isCompleted).length;
        completedTasksCountEl.textContent = completedTasks;
    }
}

function openEditProfileModal() {

    const userData = JSON.parse(localStorage.getItem('userProfile')) || {};
    editAvatarInput.value = userData.avatar || profileAvatarEl.textContent;
    editNameInput.value = userData.name || profileNameEl.textContent;
    editEmailInput.value = userData.email || profileEmailEl.textContent;

    editProfileModal.classList.add('active');
}

function closeEditProfileModal() {
    editProfileModal.classList.remove('active');
}

function saveProfileChanges() {

    const newAvatar = editAvatarInput.value.trim();
    const newName = editNameInput.value.trim();
    const newEmail = editEmailInput.value.trim();

    if (!newAvatar || !newName || !newEmail) {
        alert("Please fill in all fields.");
        return;
    }

    const updatedUserProfile = {
        avatar: newAvatar,
        name: newName,
        email: newEmail,
    
        memberSince: JSON.parse(localStorage.getItem('userProfile'))?.memberSince || 'May 2025' 
    };
    localStorage.setItem('userProfile', JSON.stringify(updatedUserProfile));

    if (profileAvatarEl) profileAvatarEl.textContent = newAvatar;
    if (profileNameEl) profileNameEl.textContent = newName;
    if (profileEmailEl) profileEmailEl.textContent = newEmail;


    closeEditProfileModal();
}

document.addEventListener('DOMContentLoaded', loadProfileData);

document.addEventListener('DOMContentLoaded', () => {

    const currentBalanceEl = document.getElementById('currentBalanceValue');
    const transactionsCountEl = document.getElementById('transactionsCount');
    const completedTasksCountEl = document.getElementById('completedTasksCount');
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let totalBalance = 0;
    transactions.forEach(transaction => {
        if (transaction.type === 'income') {
            totalBalance += parseFloat(transaction.amount);
        } else if (transaction.type === 'expense') {
            totalBalance -= parseFloat(transaction.amount);
        }
    });

    const totalTransactions = transactions.length;

    const completedTasks = tasks.filter(task => task.isCompleted).length;

    if (currentBalanceEl) {
        currentBalanceEl.textContent = `$${totalBalance.toFixed(2)}`;
        if (totalBalance < 0) {
            currentBalanceEl.style.color = '#e57373';
        } else {
            currentBalanceEl.style.color = '#5a6e5f';
        }
    }
    
    if (transactionsCountEl) {
        transactionsCountEl.textContent = totalTransactions;
    }

    if (completedTasksCountEl) {
        completedTasksCountEl.textContent = completedTasks;
    }
});