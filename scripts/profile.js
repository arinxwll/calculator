
document.addEventListener('DOMContentLoaded', () => {
   
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
    const editPasswordInput = document.getElementById('editPasswordInput');

    const defaultUserProfile = {
        avatar: 'AS',
        name: 'Arina Sharabura',
        email: 'arina.200011@email.com',
        memberSince: 'May 2025' 
    };

    function updateProfileDisplay() {
        const userData = JSON.parse(localStorage.getItem('userProfile')) || defaultUserProfile;
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

            currentBalanceEl.style.color = totalBalance < 0 ? '#e57373' : '#5a6e5f';
        }
        if (transactionsCountEl) transactionsCountEl.textContent = transactions.length;
        if (completedTasksCountEl) completedTasksCountEl.textContent = tasks.filter(task => task.isCompleted).length;
    }

    window.openEditProfileModal = function() { 
        const userData = JSON.parse(localStorage.getItem('userProfile')) || defaultUserProfile;
        editAvatarInput.value = userData.avatar;
        editNameInput.value = userData.name;
        editEmailInput.value = userData.email;
        editProfileModal.classList.add('active');
    };

    window.closeEditProfileModal = function() { 
        editProfileModal.classList.remove('active');
    };

    window.saveProfileChanges = function() {
        const newAvatar = editAvatarInput.value.trim().toUpperCase().substring(0, 2); 
        const newName = editNameInput.value.trim();
        const newEmail = editEmailInput.value.trim();
        const newPassword = editPasswordInput.value.trim();

        if (!newAvatar || !newName || !newEmail) {
            alert("Please fill in all fields.");
            return;
        }

        const updatedUserProfile = {
            avatar: newAvatar,
            name: newName,
            email: newEmail,
            password: newPassword,
            memberSince: (JSON.parse(localStorage.getItem('userProfile')) || defaultUserProfile).memberSince
        };

        

        localStorage.setItem('userProfile', JSON.stringify(updatedUserProfile));
        
        updateProfileDisplay(); 
    };

    updateProfileDisplay(); 
});
