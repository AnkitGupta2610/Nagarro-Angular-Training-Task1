

interface todo{
    id:number,
    title: string,
    status: string
}

var next_todo_id: number = 2;

class TodoList {
    public todos: todo [];

    constructor(){
        this.todos = [];
    }

    add(todo: todo){
        this.todos.push(todo);
        console.log("inner Add");
    }

    update(id:number,status:string){
        this.todos.forEach(function(todo){
            if(todo.id == id){
                todo.status = status;
            }
        });
    }

    display(){
        return this.todos;
    }
}
/*var todo1:todo = {
id : next_todo_id++,
title : "todo1",
status : "active"
}*/

var list = new TodoList();

//list.add(todo1);

console.log("here");
function addItem(title:string){
    var newTodo: todo = {
        id : next_todo_id++,
        title : title,
        status : "active"
    };

    list.add(newTodo);
    console.log("Outer Add");
}

function  updateItem(id:number,status:string){
    list.update(id,status);
}

function deleteItem(id:number){

}

function getItem() {
    return list.display();
}