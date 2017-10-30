console.log("Is Script File Loading");
//const RESPONSE_DONE = 4;
//const STATUS_OK = 200;
const ACTIVE_TODOS_LIST_ID = "active_todos_list_div";
const COMPLETE_TODOS_LIST_ID = "complete_todos_list_div"
const DELETED_TODOS_LIST_ID = "deleted_todos_list_div"
const  NEW_TODO_INPUT_ID = "new_todo_input";

// This function loads the body element initially with the todos stored in local storage
/*function getTodosAJAX() {
    getActiveTodosAJAX();
    getCompleteTodosAJAX();
    getDeletedTodosAJAX();
}*/

// This function loads the corresponding div element with different lists
function addTodoElements(id,todos){
    var parent = document.getElementById(id);       // Stores reference to the parent div
    parent.innerHTML = "";                          // Empty content of div to reload the list at each call of this function
    if(parent){
        todos.forEach(                 // Iterate through all the todos and create an html element for each todo
            function (todo) {
                var todo_element = createTodoElement(id,todo.id,todo); // Creates todo element
                parent.appendChild(todo_element);
            }
        )
    }
}

function createTodoElement(temp,id,todo_object) {
    var todo_element = document.createElement("div"); // Creates div element to contain the todo

    todo_element.setAttribute("data-id",id);
    todo_element.setAttribute("class","contain");

    var title_div = document.createElement("div");   // Creates div element to contain the title of todo
    title_div.innerText = todo_object.title;        // Sets the text to todo's title
    title_div.setAttribute("class","middle-element " + todo_object.status);
    todo_element.appendChild(title_div);

    if(temp !== DELETED_TODOS_LIST_ID){
        var complete_checkbox = document.createElement("div");

        var delete_image = document.createElement("div");
        delete_image.setAttribute("class","right-element glyphicon glyphicon-trash");
        if(temp === COMPLETE_TODOS_LIST_ID){
            //complete_checkbox.checked = true;
            complete_checkbox.setAttribute("class","left-element1 glyphicon glyphicon-ok-sign");
            complete_checkbox.setAttribute("onclick", "activeTodoAJAX("+id+")");
            delete_image.setAttribute("onclick","deleteFromCompleteTodoAJAX("+id+")");
        }
        else{
            complete_checkbox.setAttribute("class","left-element2 glyphicon glyphicon-ok-sign");
            complete_checkbox.setAttribute("onclick", "completeTodoAJAX("+id+")");
            delete_image.setAttribute("onclick","deleteFromActiveTodoAJAX("+id+")");
        }
        todo_element.appendChild(complete_checkbox);
        todo_element.appendChild(delete_image);
    }

    return todo_element;
}

// This function makes an AJAX call to fetch the active todos from the API and send the response to addTodoElements function.

function getActiveTodosAJAX(){
    var activeTodos = [];
    var todos = getItem();
    if(todos != null){
        todos.forEach(function(todo){
            if(todo.status == "active"){
                activeTodos.push(todo);
            }
        });
    }

    if(activeTodos != null){
        addTodoElements(ACTIVE_TODOS_LIST_ID,activeTodos);
    }

}

// This function makes an AJAX call to fetch the complete todos from the API and send the response to addTodoElements function.
function getCompleteTodosAJAX() {
    var completedTodos = [];
    var todos = getItem();
    if (todos != null) {
        todos.forEach(function (todo) {
            if (todo.status == "complete") {
                completedTodos.push(todo);
            }
        });
    }

    if (completedTodos != null) {
        addTodoElements(COMPLETE_TODOS_LIST_ID, completedTodos);
    }
}

// This function makes an AJAX call to fetch the deleted todos from the API and send the response to addTodoElements function.
function getDeletedTodosAJAX(){
    var deletedTodos = [];
    var todos = getItem();
    if(todos != null){
        todos.forEach(function(todo){
            if(todo.status == "delete"){
                deletedTodos.push(todo);
            }
        });
    }

    if(deletedTodos != null){
        addTodoElements(DELETED_TODOS_LIST_ID,deletedTodos);
    }
}

// This function makes an AJAX call to add the active todo using API
function addActiveTodoAJAX() {
    var title = document.getElementById(NEW_TODO_INPUT_ID).value; // stores the reference to new_todo_input input and fetch its value
    console.log(title);
    addItem(title);

    getActiveTodosAJAX();
}

// This function marks the active todo as complete
function completeTodoAJAX(id) {
    updateItem(id,"complete");

    getCompleteTodosAJAX();
    getActiveTodosAJAX();
}

// This function marks the complete todo as active
function activeTodoAJAX(id) {
    updateItem(id,"active");

    getCompleteTodosAJAX();
    getActiveTodosAJAX();
}
// This function marks the active todo as deleted
function deleteFromActiveTodoAJAX(id) {
    updateItem(id,"delete");

    getDeletedTodosAJAX();
    getActiveTodosAJAX();
}

// This function marks the complete todo as deleted
function deleteFromCompleteTodoAJAX(id) {
    updateItem(id,"delete");

    getDeletedTodosAJAX();
    getCompleteTodosAJAX();
}

// This function changes the display attribute of deleted todos list's div element.
function toggle1() {
    var x = document.getElementById(DELETED_TODOS_LIST_ID); // Stores the reference to the deleted todos list's div
    var y = document.getElementById("delete");
    if (x.style.display === 'none') {
        x.style.display = 'block';          //Show deleted todos list
        y.innerText = "Hide Deleted Items"
    } else {
        x.style.display = 'none';           // Hide deleted todos list
        y.innerText = "Show Deleted Items"
    }
}

// This function changes the display attribute of complete todos list's div element.
function toggle2() {
    var x = document.getElementById(COMPLETE_TODOS_LIST_ID);    // Stores the reference to the completed todos list's div
    var y = document.getElementById("complete");
    if (x.style.display === 'none') {
        x.style.display = 'block';          //Show completed todos list
        y.innerText = "Hide Completed Items"
    } else {
        x.style.display = 'none';           //Hide completed todos list
        y.innerText = "Show Completed Items"
    }
}