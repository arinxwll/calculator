const currentBalanceValueEl = document.getElementById('currentBalanceValue');
const monthlyIncomeValueEl = document.getElementById('monthlyIncomeValue');
const monthlyExpensesValueEl = document.getElementById('monthlyExpensesValue');
const balanceTrendEl = document.getElementById('balanceTrend');
const balanceTrendPercentageEl = document.getElementById('balanceTrendPercentage');
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