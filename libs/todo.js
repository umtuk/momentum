var storage = function(app) {
    this.app = app;
    this.storage = localStorage;
    this.data = JSON.parse(this.storage[this.app] || '{}');
}

storage.prototype = {
    getItem: function(key) {
        return this.data[key];
    },
    setItem: function(key, value) {
        this.data[key] = value;
    },
    setListItem: function(key, value) {
        if (!this.data[key]) {
            this.data[key] = [];
        }
        this.data[key].push(value);
    },
    save: function() {
        this.storage[this.app] = JSON.stringify(this.data);
    },
    deleteAll: function() {
        this.storage[this.app] = '{}';
    }
};

var todo = new storage('todo');
// todo.deleteAll();

var todoNode = document.getElementById('todo');
var todoCommentNode = todoNode.childNodes[1];
var todoInputNode = todoNode.childNodes[3];
var todoListNode = todoNode.childNodes[7];

var initTodo = function() {
    if (JSON.parse(localStorage['greeting']).password) {
        todoNode.style.display = 'block';
    } else {
        todoNode.style.display = 'none';
    }
}

var setTodoList = function() {
    var values = todo.getItem('todoList');
    if (values) {
        for (var value of values) {
            todoListNode.innerHTML = '<li>' + value + '</li>' + todoListNode.innerHTML;
        }
    } else {
        //
    }
}

var addTodoList = function() {
    todo.setListItem('todoList', todoInputNode.value);
    todoListNode.innerHTML = '<li>' + todoInputNode.value + '</li>' + todoListNode.innerHTML;
    todoInputNode.value = '';
    todo.save();
}

initTodo();
setTodoList();
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('greetingBtn').addEventListener('click', function() {
        initTodo();
    }, false);
    document.getElementById('todoBtn').addEventListener('click', function() {
        addTodoList();
    }, false);
});