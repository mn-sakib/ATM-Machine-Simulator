// Initial balance
let balance = 1000;

// DOM Elements
const actionSelect = document.getElementById('action');
const amountInput = document.getElementById('amountInput');
const amountField = document.getElementById('amount');
const submitBtn = document.getElementById('submitBtn');
const cancelBtn = document.getElementById('cancelBtn');
const currentBalance = document.getElementById('currentBalance');
const messageDiv = document.getElementById('message');
const transactionIdDiv = document.getElementById('transactionId');

// Show/Hide amount input based on action
actionSelect.addEventListener('change', () => {
    if (actionSelect.value === '2' || actionSelect.value === '3') {
        amountInput.style.display = 'block';
    } else {
        amountInput.style.display = 'none';
    }
});

// Handle Submit Button Click
submitBtn.addEventListener('click', () => {
    const action = actionSelect.value;
    const amount = parseFloat(amountField.value);

    // Clear previous Transaction ID and message
    transactionIdDiv.innerHTML = '';
    messageDiv.innerHTML = '';

    switch (action) {
        case '1': // Check Balance
            showMessage(`Your current balance is: $${balance}`, 'info');
            break;

        case '2': // Withdraw Money
            if (isNaN(amount) || amount <= 0) {
                showMessage('Invalid amount!', 'danger');
            } else if (amount > balance) {
                showMessage('Insufficient Balance!', 'danger');
            } else {
                balance -= amount;
                updateBalance();
                const transactionId = generateTransactionId();
                showMessage(`Withdrawal successful! New balance: $${balance}`, 'success');
                transactionIdDiv.innerHTML = `<strong>Transaction ID:</strong> ${transactionId}`;
            }
            break;

        case '3': // Deposit Money
            if (isNaN(amount) || amount <= 0) {
                showMessage('Invalid amount!', 'danger');
            } else {
                balance += amount;
                updateBalance();
                const transactionId = generateTransactionId();
                showMessage(`Deposit successful! New balance: $${balance}`, 'success');
                transactionIdDiv.innerHTML = `<strong>Transaction ID:</strong> ${transactionId}`;
            }
            break;

        default:
            showMessage('Invalid Input!', 'danger');
            break;
    }
});

// Handle Cancel/Exit Button Click
cancelBtn.addEventListener('click', () => {
    showMessage('Thank you for using the ATM. Goodbye!', 'info');
    setTimeout(() => {
        resetATM();
    }, 2000);
});

// Update Balance Display
function updateBalance() {
    currentBalance.textContent = balance.toFixed(2);
}

// Show Messages
function showMessage(message, type) {
    messageDiv.innerHTML = `<div class="alert alert-${type}">${message}</div>`;
}

// Reset ATM
function resetATM() {
    balance = 1000;
    updateBalance();
    actionSelect.value = '1';
    amountInput.style.display = 'none';
    amountField.value = '';
    messageDiv.innerHTML = '';
    transactionIdDiv.innerHTML = '';
}

// Generate a random Transaction ID
function generateTransactionId() {
    return 'TXN' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
}