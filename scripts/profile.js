document.addEventListener('DOMContentLoaded', () => {
 
  updateProfileStats();
});

function updateProfileStats() {
  const transactions = JSON.parse(localStorage.getItem('transactions')) || [];

  const transCountEl = document.getElementById('profileTransCount');
  
  if (transCountEl) {
      transCountEl.textContent = transactions.length;
  }
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
  const completedTasks = tasks.filter(task => task.completed === true || task.isCompleted === true);
  
  const tasksCountEl = document.getElementById('profileTasksCount');
  
  if (tasksCountEl) {
      tasksCountEl.textContent = completedTasks.length;
  }
  const balanceEl = document.getElementById('profileBalance');
  if (balanceEl) {
      const totalBalance = transactions.reduce((acc, t) => {
          return t.type === 'income' ? acc + parseFloat(t.amount) : acc - parseFloat(t.amount);
      }, 0);
      balanceEl.textContent = `$${totalBalance.toFixed(2)}`;
  }
}
document.addEventListener('DOMContentLoaded', () => {
  const homeCurrentBalanceEl = document.getElementById('homeCurrentBalance');
  const homeTotalTransactionsEl = document.getElementById('homeTotalTransactions');
  const homeCompletedTasksEl = document.getElementById('homeCompletedTasks');

  const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  let totalBalance = 0;
  transactions.forEach(transaction => {
      if (transaction.type === 'income') {
          totalBalance += parseFloat(transaction.amount) || 0;
      } else if (transaction.type === 'expense') {
          totalBalance -= parseFloat(transaction.amount) || 0;
      }
  });

  const totalTransactions = transactions.length;
  const completedTasks = tasks.filter(task => task.isCompleted).length;

  if (homeCurrentBalanceEl) {
      homeCurrentBalanceEl.textContent = `$${totalBalance.toFixed(2)}`;
      homeCurrentBalanceEl.style.color = totalBalance < 0 ? '#e57373' : '#5a6e5f';
  }
  if (homeTotalTransactionsEl) homeTotalTransactionsEl.textContent = totalTransactions;
  if (homeCompletedTasksEl) homeCompletedTasksEl.textContent = completedTasks;
});
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

        if (!newAvatar || !newName || !newEmail) {
            alert("Please fill in all fields.");
            return;
        }

        const updatedUserProfile = {
            avatar: newAvatar,
            name: newName,
            email: newEmail,
            memberSince: (JSON.parse(localStorage.getItem('userProfile')) || defaultUserProfile).memberSince
        };
        localStorage.setItem('userProfile', JSON.stringify(updatedUserProfile));
        
        updateProfileDisplay(); 
        closeEditProfileModal();
    };

    updateProfileDisplay(); 
});
document.addEventListener('DOMContentLoaded', () => {
  const savedBalance = localStorage.getItem('totalBalance') || "0";

  const profileBalanceEl = document.getElementById('profileBalanceValue');
  
  if (profileBalanceEl) {
      profileBalanceEl.textContent = `$${parseFloat(savedBalance).toFixed(2)}`;
  }
});