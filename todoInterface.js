var next_todo_id = 2;
var TodoList = /** @class */ (function () {
    function TodoList() {
        this.todos = [];
    }
    TodoList.prototype.add = function (todo) {
        this.todos.push(todo);
        console.log("inner Add");
    };
    TodoList.prototype.update = function (id, status) {
        this.todos.forEach(function (todo) {
            if (todo.id == id) {
                todo.status = status;
            }
        });
    };
    TodoList.prototype.display = function () {
        return this.todos;
    };
    return TodoList;
}());
/*var todo1:todo = {
id : next_todo_id++,
title : "todo1",
status : "active"
}*/
var list = new TodoList();
//list.add(todo1);
console.log("here");
function addItem(title) {
    var newTodo = {
        id: next_todo_id++,
        title: title,
        status: "active"
    };
    list.add(newTodo);
    console.log("Outer Add");
}
function updateItem(id, status) {
    list.update(id, status);
}
function deleteItem(id) {
}
function getItem() {
    return list.display();
}
