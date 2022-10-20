

var todolistApi = "http://localhost:3000/todolist";


function start(){
    getToDoList(renderToDoList);

    handleCreateFrom();
};

start();


function getToDoList(callback){
    fetch(todolistApi)
        .then(response => response.json())
        .then(callback)
};

function createToDoList(data,callback){
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch(todolistApi,options)
        .then((response) => response.json())
        .then(callback);
}

function handleEditToDoList(data, callback, id){
    var options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch(todolistApi + '/' + id,options)
        .then((response) => response.json())
        .then(callback);
}

function fillToDoList(id){
    var createBtn = document.querySelector('#add-item');
    createBtn.innerText = 'Update';

    document.querySelector('input[name = "name"]').value = document.querySelector(`.list-items-${id} .text`).innerText;

    createBtn.onclick = function(){
        var nameCurrent = document.querySelector('input[name = "name"]').value;
        var formData = {
            name: nameCurrent,
        }

        handleEditToDoList(formData, function(){
            getToDoList(renderToDoList);
            document.querySelector('input[name = "name"]').value = "";
            createBtn.innerText = 'Add items';

            handleCreateFrom();
        },id)
    }
}

function handleDeleteToDoList(id){
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    }
    fetch(todolistApi + '/' + id,options)
        .then((response) => response.json())
        .then(function(){
            var listItem = document.querySelector('.list-items-'+ id);
            if(listItem){
                listItem.remove();
            }
        });
}

function renderToDoList(items){
    var listItemsBlock = document.querySelector('.list-items');
    var htmls = items.map(function(item){
        return `
            <ul class="item list-items-${item.id}">
                <li class="text">${item.name}</li>
                <div class="icons">
                    <li><i onclick= "fillToDoList(${item.id})" class="edit far fa-edit"></i></li>
                    <li><i onclick= "handleDeleteToDoList(${item.id})" class="delete far fa-times-circle"></i></li>
                </div>
            </ul>
        `;
    });
    listItemsBlock.innerHTML = htmls.join('');
}

function handleCreateFrom(){
    var createBtn = document.querySelector('#add-item');

    createBtn.onclick = function(){
        var name = document.querySelector('input[name="name"]').value;

        var formData = {
            name : name
        }

        if(name){
            createToDoList(formData,function(){
                getToDoList(renderToDoList);
            });
        }
    }
}

