const transactionAmountInput = document.getElementById('transactionAmountInput');
const transactionCategoryInput = document.getElementById('transactionCategoryInput');
const transactionDateInput = document.getElementById('transactionDateInput'); 
const transactionDescriptionInput = document.getElementById('transactionDescriptionInput'); 

const transactionListEl = document.querySelector('.transaction-list');

window.switchType = function(type) {
    currentType = type;
    
    document.getElementById('tabExpense').classList.remove('active');
    document.getElementById('tabIncome').classList.remove('active');
    
    if (type === 'expense') {
        document.getElementById('tabExpense').classList.add('active');
    } else {
        document.getElementById('tabIncome').classList.add('active');
    }

    const mainBtn = document.getElementById('mainActionBtn');
    if (type === 'expense') {
        mainBtn.textContent = 'Add Expense';
        mainBtn.className = 'btn-save btn-expense'; 
    } else {
        mainBtn.textContent = 'Add Income';
        mainBtn.className = 'btn-save btn-income';
    }
}

window.executeTransaction = function() {
    const amount = parseFloat(transactionAmountInput.value);
    const category = transactionCategoryInput.value; 
    const date = transactionDateInput.value; 
    const description = transactionDescriptionInput.value.trim();

    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }
    if (!category) {
        alert("Please select a category.");
        return;
    }
    const currentTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
    
    const newTransaction = {
        id: Date.now(),
        type: currentType, 
        amount: amount,
        category: category,
        date: date || new Date().toISOString(),
        description: description 
    };

    currentTransactions.push(newTransaction);

    localStorage.setItem('transactions', JSON.stringify(currentTransactions));

    transactionAmountInput.value = '';
    transactionCategoryInput.selectedIndex = 0;
    transactionDateInput.value = '';
    transactionDescriptionInput.value = ''; 
    if (typeof renderTransactions === 'function') {
        renderTransactions();
    }
    
    if (typeof updateProfileTransactionCount === 'function') updateProfileTransactionCount();
    if (typeof renderHomeStats === 'function') renderHomeStats();

    alert(`Transaction (${currentType}) added successfully!`);
};

function renderTransactions() {
    if (!transactionListEl) return;
    transactionListEl.innerHTML = ''; 

    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];

    if (transactions.length === 0) {
        transactionListEl.innerHTML = '<p class="no-transactions-message">No transactions yet.</p>';
eturn;
    }

    const sortedTransactions = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));

    sortedTransactions.forEach(t => {
        const item = document.createElement('div');
        item.className = 'transaction-item';
        item.dataset.id = t.id;

        const isExpense = t.type === 'expense';
        const amountSign = isExpense ? '-' : '+';
        const amountColorClass = isExpense ? 'amount-expense' : 'amount-income';
        const avatarLetter = t.category ? t.category.charAt(0).toUpperCase() : (isExpense ? 'E' : 'I');
        const avatarColorClass = isExpense ? 'avatar-red' : 'avatar-green';

        let formattedDate = 'N/A';
        if (t.date) {
            try {
                const dateObj = new Date(t.date);
          
                formattedDate = dateObj.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
            } catch (e) {
                console.error("Error formatting date:", e);
                formattedDate = t.date;
            }
        }
        
        item.innerHTML = `
            <div class="item-info">
                <div class="avatar ${avatarColorClass}">${avatarLetter}</div>
                <div class="details">
                    <div class="item-name">${t.category}</div>
                    <div class="item-category">${t.description || (isExpense ? 'Expense' : 'Income')}</div>
                </div>
            </div>
            <div class="item-amount-section">
                <div class="amount-value ${amountColorClass}">${amountSign}$${(parseFloat(t.amount) || 0).toFixed(2)}</div>
                <div class="amount-date">${formattedDate}</div>
                <button class="delete-transaction-btn" data-id="${t.id}">X</button>
            </div>
        `;
        transactionListEl.appendChild(item);
    });
}

function deleteTransaction(idToDelete) {
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    const updatedTransactions = transactions.filter(t => t.id !== idToDelete);
    localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
    renderTransactions();
    // if (typeof updateProfileTransactionCount === 'function') updateProfileTransactionCount();
    // if (typeof renderHomeStats === 'function') renderHomeStats();
}
if (transactionListEl) {
    transactionListEl.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-transaction-btn')) {
            const idToDelete = parseInt(event.target.dataset.id);
            if (confirm("Are you sure you want to delete this transaction?")) {
                deleteTransaction(idToDelete);
            }
        }
    });
}

