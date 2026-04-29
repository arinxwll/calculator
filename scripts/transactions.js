const expenseBtn = document.getElementById('expense-btn');
const incomeBtn = document.getElementById('income-btn');
const submitBtn = document.getElementById('submit-btn');

let currentType = 'expense';
function switchTab(type) {
    currentType = type;

    if (type === 'expense') {
        expenseBtn.classList.add('active');
        incomeBtn.classList.remove('active');
        submitBtn.textContent = 'Add Expense';
        submitBtn.style.backgroundColor = '#0d1117'; 
    } else {
        incomeBtn.classList.add('active');
        expenseBtn.classList.remove('active');
        submitBtn.textContent = 'Add Income';
        submitBtn.style.backgroundColor = '#0d1117'; 
    }
}

expenseBtn.addEventListener('click', () => switchTab('expense'));
incomeBtn.addEventListener('click', () => switchTab('income'));

function addTransaction() {
    const amount = document.getElementById('amount').value;
    const category = document.getElementById('category').value;
    const date = document.getElementById('date').value;
    const description = document.getElementById('description').value;

    if (!amount || !category || !date) {
        alert("Пожалуйста, заполните все основные поля");
        return;
    }

    const newTransaction = {
        id: Date.now(),
        type: currentType,
        amount: parseFloat(amount),
        category: category,
        date: date,
        description: description
    };

    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    transactions.push(newTransaction);
    localStorage.setItem('transactions', JSON.stringify(transactions));

    document.getElementById('amount').value = '';
    document.getElementById('description').value = '';
    renderTransactions();
}
function renderTransactions() {
    const listElement = document.getElementById('transaction-list');
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    
    listElement.innerHTML = ''; 
    transactions.reverse().forEach(t => {
        const item = document.createElement('div');
        item.className = 'transaction-item';
        
        const sign = t.type === 'expense' ? '-' : '+';
        const colorClass = t.type === 'expense' ? 'amount-expense' : 'amount-income';

        item.innerHTML = `
            <div class="item-info">
                <strong>${t.category}</strong>
                <span>${t.date} ${t.description ? '• ' + t.description : ''}</span>
            </div>
            <div class="item-amount ${colorClass}">
                ${sign}$${t.amount.toFixed(2)}
            </div>
        `;
        listElement.appendChild(item);
    });
}

document.addEventListener('DOMContentLoaded', renderTransactions);