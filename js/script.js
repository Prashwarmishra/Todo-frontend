/*-----------------------------------Variable-declaration--------------------------------------*/

const todoList = document.querySelector('#todo-list');
const todoSubmitButton = document.querySelector('#todo-submit-button');
let todoInput = document.querySelector('#todo-input');
let completeAllTaskButton = document.querySelector('#complete-all-task');
let clearCompletedTaskButton = document.querySelector('#clear-completed-task');
let allTaskButton = document.querySelector('#all-tasks');
let uncompletedTaskButton = document.querySelector('#uncompleted-tasks');
let completedTaskButton = document.querySelector('#completed-tasks');


/*-------------------------------------Event-Listeners------------------------------------------*/

window.addEventListener('DOMContentLoaded', fetchFromLocalStorage);

//update list when submit button is clicked
todoSubmitButton.addEventListener('click', updateList);

//delete all the tasks when completeAllTask button is clicked
completeAllTaskButton.addEventListener('click', emptyList);

//delete completed tasks when clearCompletedTask button is clicked
clearCompletedTaskButton.addEventListener('click', deleteSelectedTasks); 

//show all the tasks when allTask button is clicked
allTaskButton.addEventListener('click', showAllTasks);

//show uncompleted tasks when uncompletedTask button is clicked
uncompletedTaskButton.addEventListener('click', showUncompletedTasks);

//show completed tasks when completedTask button is clicked
completedTaskButton.addEventListener('click', showCompletedTasks);

/*-----------------------------------Function-declaration--------------------------------------*/

//function to add a todo to the list of todos
function updateList(event){
    event.preventDefault();

    //create a div
    let todo = document.createElement('div');
    //add class todo to the div
    todo.classList.add('todo');

    //create a checkbox input
    let checkBoxInput = document.createElement('input');
    checkBoxInput.type = 'checkbox';
    checkBoxInput.name = 'todo-checkbox';
    //add class to the checkbox input
    checkBoxInput.classList.add('todo-checkbox');

    //add a li
    let todoListItem = document.createElement('li');
    //add class to li
    todoListItem.classList.add('todo-task');

    //add todo input value to li
    todoListItem.innerHTML = `${todoInput.value}`

    //create delete button
    let deleteButton = document.createElement('button');
    //add class to delete button
    deleteButton.classList.add('todo-delete-button');
    //add delete-icon to deleteButton
    deleteButton.innerHTML = `<span><i class="fas fa-minus-circle"></i></span>`;

    //append checkbox checkBoxInput, li and deleteButton to div
    todo.append(checkBoxInput);
    todo.append(todoListItem);    
    todo.append(deleteButton);

    //add li to todo-list
    todoList.append(todo);

    //add todo input value to localStorage
    addToLocalStorage(todoInput.value);

    //add class selected to the li when checkbox is ticked
    checkBoxInput.addEventListener('click', function(){
        todoListItem.classList.toggle('selected');

        //update uncompleted tasks
        updateTasksLeft();
    });

    //activate todo delete button
    deleteButton.addEventListener('click', function(){
        deleteTask(todo);
    });

    //reset todo-input value
    todoInput.value = "";

    //update uncompleted tasks
    updateTasksLeft();
}

//function to delete all tasks 
function emptyList(){
    let todos = document.querySelectorAll('.todo');

    //loop through all the todos and remove them all
    todos.forEach(todo => {
        deleteTask(todo);
    });
}

//function to delete selected tasks
function deleteSelectedTasks(){
    let todos = document.querySelectorAll('.todo');
    
    //loop through all the todos
    todos.forEach(todo => {
        let selected = todo.querySelector('.selected');

        //if a todo is selected, delete it
        if(selected){
            deleteTask(todo);
        }
    });
}

//function to update tasks left uncompleted
function updateTasksLeft(){
    
    //set initial count to 0
    let count = 0;
    let todos = document.querySelectorAll('.todo');

    //loop through all the todos
    todos.forEach(todo => {
        let selected = todo.querySelector('.selected');

        //if a todo is not selected, increase count
        if(selected == null){
            count++;
        }
    });

    //select count div
    let tasksLeft = document.querySelector('#tasks-left>span');

    //update count
    tasksLeft.innerHTML = `<b>${count}</b>`;
}

//function to show all the todos
function showAllTasks(){
    //select all the todos
    let todos = document.querySelectorAll('.todo');

    //loop though each todo and set their display to grid 
    todos.forEach(todo => {
        todo.style.display = 'grid';
    });
}

//function to show all uncompleted tasks
function showUncompletedTasks(){
    let todos = document.querySelectorAll('.todo');

    //loop through all todos and show only those which are pending
    todos.forEach(todo => {
        //check if a todo is selected
        let selected = todo.querySelector('.selected');

        //if selected hide the todo
        if(selected){
            todo.style.display = 'none';
        }else{
            todo.style.display = 'grid';
        }

    });
}

//function to show all completed tasks
function showCompletedTasks(){
    let todos = document.querySelectorAll('.todo');

    //loop through all todos and show only those which are completed
    todos.forEach(todo => {
        //check if a todo is selected
        let selected = todo.querySelector('.selected');

        //if selected hide the todo
        if(selected){
            todo.style.display = 'grid';
        }else{
            todo.style.display = 'none';
        }

    });
}

//function to delete a todo
function deleteTask(todo){
    
    //add class fall to add little transition effects
    todo.classList.add('fall');

    //remove todo as soon as falling transition ends
    todo.addEventListener('transitionend', function(e){
        todo.remove();
        updateTasksLeft();
        deleteFromLocalStorage(todo);
    });
}

//function to check local storage for pending todos when browser is refreshed
function checkLocalStorage(){

    //if nothing exists return an empty array
    if(localStorage.getItem('todos') === null){
        return [];
    }
    //else return the stored data as an array
    else{
        return JSON.parse(localStorage.getItem('todos'));
    }
}

//function to add todo to local storage
function addToLocalStorage(todoListItem){

    //get all existing todos from local storage
    let todos = checkLocalStorage();
    
    //push the todoListItem to that array
    todos.push(todoListItem);

    //push the array back into local storage
    localStorage.setItem('todos', JSON.stringify(todos));

}

//function to get todos from local storage and display them on homepage
function fetchFromLocalStorage(){
    let todos = checkLocalStorage();

    todos.forEach(currentTodo => {
        //create a div
        let todo = document.createElement('div');
        //add class todo to the div
        todo.classList.add('todo');

        //create a checkbox input
        let checkBoxInput = document.createElement('input');
        checkBoxInput.type = 'checkbox';
        checkBoxInput.name = 'todo-checkbox';
        //add class to the checkbox input
        checkBoxInput.classList.add('todo-checkbox');

        //add a li
        let todoListItem = document.createElement('li');
        //add class to li
        todoListItem.classList.add('todo-task');

        //add todo input value to li
        todoListItem.innerHTML = currentTodo;

        //create delete button
        let deleteButton = document.createElement('button');
        //add class to delete button
        deleteButton.classList.add('todo-delete-button');
        //add delete-icon to deleteButton
        deleteButton.innerHTML = `<span><i class="fas fa-minus-circle"></i></span>`;

        //append checkbox checkBoxInput, li and deleteButton to div
        todo.append(checkBoxInput);
        todo.append(todoListItem);    
        todo.append(deleteButton);

        //add li to todo-list
        todoList.append(todo);

        //add class selected to the li when checkbox is ticked
        checkBoxInput.addEventListener('click', function(){
            todoListItem.classList.toggle('selected');

            //update uncompleted tasks
            updateTasksLeft();
        });

        //activate todo delete button
        deleteButton.addEventListener('click', function(){
            deleteTask(todo);
        });

        //update uncompleted tasks
        updateTasksLeft();
    });

}

//function to delete todo from localStorage
function deleteFromLocalStorage(todo){
    let todoListItem = todo.querySelector('.todo-task').innerText;
    let todos = checkLocalStorage();

    todos.splice(todos.indexOf(todoListItem), 1);

    localStorage.setItem('todos', JSON.stringify(todos));
}

