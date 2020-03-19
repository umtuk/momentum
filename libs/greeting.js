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
    save: function() {
        this.storage[this.app] = JSON.stringify(this.data);
    },
    deleteAll: function() {
        this.storage[this.app] = '{}';
    }
};

var greeting = new storage('greeting');
// greeting.deleteAll();

var greetingNode = document.getElementById('greeting');
var formNode = document.getElementById('form');
var labelNode = formNode.childNodes[1];
var inputNode = document.getElementById('greetingInput');
var commentNode = document.getElementById('greetingComment');

var initForm = function() {
    labelNode.innerText = '';
    if (!greeting.getItem('name')) {
        labelNode.innerText = "Hello, what's your name?";
        formNode.style.display = 'block';
        commentNode.style.display = 'none';
    }
    else if (!greeting.getItem('email')) {
        labelNode.innerText = "What's your email, " + greeting.getItem('name') + '?';
        formNode.style.display = 'block';
        commentNode.style.display = 'none';
    }
    else if (!greeting.getItem('password')) {
        labelNode.innerText = "Please choose a password";
        formNode.style.display = 'block';
        commentNode.style.display = 'none';
        inputNode.type = 'password';
    }
    else {
        commentNode.style.display = 'block';
        formNode.style.display = 'none';
    }
}

var initComment = function() {
    commentNode.innerText = 'Hi, ' + greeting.getItem('name');
}

var setGreetingItem = function() {
    var key;
    if (!greeting.getItem('name')) { key = 'name' ;}
    else if (!greeting.getItem('email')) { key = 'email'; }
    else if (!greeting.getItem('password')) { key = 'password'; initComment();}
    else { return; }
    console.log(inputNode);
    greeting.setItem(key, inputNode.value);
    greeting.save();
    inputNode.value = '';
    initForm();
}

document.addEventListener('DOMContentLoaded', function() {
    initForm();
    initComment();
    document.getElementById('greetingBtn').addEventListener('click', function() {
        setGreetingItem();
    }, false)
});