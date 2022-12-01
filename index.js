// Creo el objeto para guardar los gastos, ingresos y mi ahorro
let states = {
    balance: 0,
    income: 0,
    expense: 0,
    transactions: []
}

// Llamo a los elemento del DOM y le asigno sus variables
let balanceElement = document.querySelector('#balance');
let incomeElement = document.querySelector('#income');
let expenseElement = document.querySelector('#expense');
let transactionsElements = document.querySelector('#transaction');
let btnElement = document.querySelector('#addBtn');
let nameInputElement = document.querySelector('#name');
let amountInputElement = document.querySelector('#amount');

// Función que inicia el programa
function starTheProgram() {
    let local = JSON.parse(localStorage.getItem('saveData'));

    if(local !== null) {
        states = local;
    }

    
    updateState();
    clickBtn();
}


// Llamo al botón para cuando haga click haga su función
function clickBtn() {
    btnElement.addEventListener('click', onAddBtnClick);
}

// Creo la función para cuando presione el botón añada gastos o ingresos
function onAddBtnClick() {
    let name = nameInputElement.value;
    let amount = amountInputElement.value;

    // Compruebo que si la cantidad es mayor que cero,no está vacía y el nombre no está vacío añadimos un ingreso
    if(amount > 0 && name !== '' && amount !== '') {
        let transactionIncome = {
            name: nameInputElement.value,
            amount: parseInt(amountInputElement.value), type: 'income'
        };
        states.transactions.push(transactionIncome);
        updateState();
    // Si el valor es menor que cero añadimos un gasto    
    }else if(amount < 0 && name !== '' && amount !== '') {
        let transactionExpense = {
            name: nameInputElement.value,
            amount: parseInt(amountInputElement.value), type: 'expense'
        };
        states.transactions.push(transactionExpense);
        updateState();
    } else {
        alert('Por favor introduce un dato válido');
    }
    
}

// Función para borrar los elementos del listado
function deleteClick(event) {
    let id =parseInt(event.target.getAttribute('data-id'));
    let deleteIndex;

    for(let i = 0; i < states.transactions.length; i++) {
        if(states.transactions[i].id === id) {
            deleteIndex = i;
            break;        
        }
    }

    states.transactions.splice(deleteIndex, 1);
    updateState();
}

// Creo la función para actualizar el estado 
function updateState() {
    let balance = 0,
        income = 0,
        expense = 0,
        item;

    // Recorro el objeto con un for
    for(let i = 0; i < states.transactions.length; i++) {
        item = states.transactions[i];
        // Si el tipo de elemento es ingreso lo aumento en los ingresos
        if(item.type === 'income') {
            income += item.amount;
        // Si el tipo de elemento es un gasto lo aumento en los gastos
        } else if (item.type === 'expense') {
            expense += item.amount;
        }
    }

    // Añado al ahorro los ingresos más los gastos (lo pongo en positivo, porque los gastos van en negativo)
    balance = income + expense;
    states.balance = balance;
    states.income = income;
    states.expense = expense;

    localStorage.setItem('saveData', JSON.stringify(states));

    render();
}


// Creo la función para añadir los datos en sus respectivos sitios
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
        btnElement.setAttribute('data-id', item.id);
        btnElement.innerHTML = 'X';

        btnElement.addEventListener('click', deleteClick);

        containerElement.appendChild(btnElement);

        transactionElements.appendChild(containerElement);
        
    }
}

// Inicializo el programa
starTheProgram();