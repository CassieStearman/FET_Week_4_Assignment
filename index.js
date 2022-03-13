class Item {
    constructor(name, quantity) {
        this.name = name;
        this.quantity = quantity
    }
}

class List {    //to add and delete items
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.items = []; 
    }

    addItem(item) { // method for the List class
        this.items.push(item);
    }

    deleteItem(item) {
        let index = this.items.indexOf(item);
        this.items.splice(index, 1); //will only remove one item (the second parameter)
    }
}

// connects to HTML
let lists = []; //an array of lists, every list will be stored in this array
let listId = 0; // this will assign a new, automatically incremented ID to each new list that is created

onClick('new-list', () => {
    lists.push(new List(listId++, getValue('new-list-name')))
    drawDOM(); //build tables for lists
});

//a function to create buttons
function onClick(id, action) {
    let element = document.getElementById(id);
    element.addEventListener('click', action);
    return element;
}

function getValue(id) {
    return document.getElementById(id).value;
}

function drawDOM() {
    let listDiv = document.getElementById('lists');  //this and the next line will clear out the list div
    clearElement(listDiv);
    for(list of lists) { //iterate over the lists
        let table = createListTable(list); //creates a table for each list
        let title = document.createElement('h2');
        title.innerHTML = list.name;
        title.appendChild(createDeleteListButton(list)); //creates a delete button to delete each list
        listDiv.appendChild(title);
        listDiv.appendChild(table);
        for (item of list.items) {  //adds all the items to each list
            createItemRow(list, table, item);  
        }
    }
}

//creates new rows
function createItemRow(list, table, item) {
    let row = table.insertRow(2);
    row.insertCell(0).innerHTML = item.name;
    row.insertCell(1).innerHTML = item.quantity;
    let actions = row.insertCell(2);
    actions.appendChild(createDeleteRowButton(list, item));
}

//creates row buttons
function createDeleteRowButton(list, item) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-info';
    btn.innerHTML = 'Delete';
    btn.onclick = () => {
        let index = list.items.indexOf(item);
        list.items.splice(index, 1);
        drawDOM();
    };
    return btn;
}

//creates list buttons
function createDeleteListButton(list) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-info';
    btn.innerHTML = 'Delete List';
    btn.onclick = () => {
        let index = lists.indexOf(list);
        lists.splice(index, 1);
        drawDOM();
    };
    return btn;
}

function createNewItemButton(list) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-info';
    btn.innerHTML = 'Create';
    btn.onclick = () => {
        list.items.push(new Item(getValue(`name-input-${list.id}`), getValue(`quantity-input-${list.id}`)));
        drawDOM();
    };
    return btn;
}

function createListTable(list) {
    let table = document.createElement('table');
    table.setAttribute('class', 'table table-light table-striped table-hover');
    let row = table.insertRow(0);
    let nameColumn = document.createElement('th');
    let quantityColumn = document.createElement('th');
    nameColumn.innerHTML = 'Item';
    quantityColumn.innerHTML = 'Quantity';
    row.appendChild(nameColumn);
    row.appendChild(quantityColumn);
    let formRow = table.insertRow(1);
    let nameTh = document.createElement('th');
    let quantityTh = document.createElement('th');
    let createTh = document.createElement('th');
    let nameInput = document.createElement('input');
    nameInput.setAttribute('id', `name-input-${list.id}`);
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('class', 'form-control');

    let postitionInput = document.createElement('input');
    postitionInput.setAttribute('id', `quantity-input-${list.id}`);
    postitionInput.setAttribute('type', 'text');
    postitionInput.setAttribute('class', 'form-control');

    let newItemButton = createNewItemButton(list);
    nameTh.appendChild(nameInput);
    quantityTh.appendChild(postitionInput);
    createTh.appendChild(newItemButton);
    formRow.appendChild(nameTh);
    formRow.appendChild(quantityTh);
    formRow.appendChild(createTh);
    return table;
}

function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}