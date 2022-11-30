let states = {
    balance: 100,
    income: 1200,
    expense: 200,
    transactions: [
        {name: 'Salary', amount: 5000, type: 'income'},
        {name: 'Buy', amount: 50, type: 'expense'},
        {name: 'Buy Guitar', amount: 500, type: 'expense'}

    ]
}

let balanceElement = document.querySelector('#balance');
let incomeElement = document.querySelector('#income');
let expenseElement = document.querySelector('#expense');
let transactionsElements = document.querySelector('#transaction');
let btnElement = document.querySelector('#addBtn');
let nameInputElement = document.querySelector('#name');
let amountInputElement = document.querySelector('#amount');


function init() {
    updateState();
    initListener();
}


function initListener() {
    btnElement.addEventListener('click', onAddBtnClick);
}

function onAddBtnClick() {
    let transaction = {
        name: nameInputElement.value,
        amount: parseInt(amountInputElement.value), type: 'income'
    };

    states.transactions.push(transaction);
    updateState();
}

function updateState() {
    let balance = 0,
        income = 0,
        expense = 0,
        item;

    for(let i = 0; i < states.transactions.length; i++) {
        item = states.transactions[i];

        if(item.type === 'income') {
            income += item.amount;
        } else if (item.type === 'expense') {
            expense += item.amount;
        }
    }

    balance = income - expense;
    states.balance = balance;
    states.income = income;
    states.expense = expense;

    render();
}


function render() {
    balanceElement.innerHTML = `${states.balance}€`;
    incomeElement.innerHTML = `${states.income}€`;
    expenseElement.innerHTML = `${states.expense}€`;

    let transactionElements, containerElement, amountElement, item, btnElement;
    transactionsElements.innerHTML = '';

    for(let i = 0; i < states.transactions.length; i++) {
        item = states.transactions[i];
        transactionElements = document.createElement('li');
        transactionElements.append(item.name);


        transactionsElements.appendChild(transactionElements);
        
        containerElement = document.createElement('div');
        amountElement = document.createElement('span');
        if(item.type === 'income') {
            amountElement.classList.add('income-amt');
        } else if(item.type === 'expense') {
            amountElement.classList.add('expense-amt');
        }

        amountElement.innerHTML = `${item.amount}€`;

        
        containerElement.appendChild(amountElement);

        btnElement = document.createElement('button');
        btnElement.innerHTML = 'X';
        containerElement.appendChild(btnElement);

        transactionElements.appendChild(containerElement);
        
    }
}

init();