// setup ======================

var express = require("express"),
    app = express(),
    mongo = require("mongoose");

mongo.connect('mongodb://localhost/todoApp');

app.use(express.static(__dirname + '/public'));

app.use(require('body-parser')());


// define model
var Todo = mongo.model('Todo', {
    text : String,
    done : Boolean
});


// Routes

// api get all todos
app.get('/api/todos', function(req, res) {
    Todo.find(function(err, todos) {
        if (err)
            res.send(err);
        res.json(todos);
    });
});

app.post('/api/todos', function(req, res) {
    console.log(req.body);
    Todo.create({
        text: req.body.text,
        done: false
    }, function(err, todo) {
        if (err) {
            res.send(err);
        }
        
        Todo.find(function(err, todos) {
            if (err) {
                res.send(err);
            }
            
            res.json(todos);
        });
    });
});

// delete todo
app.delete('/api/todos/:todo_id', function(req, res) {
    Todo.remove({
        _id : req.params.todo_id
    }, function(err, todo) {
        if (err) {
            res.send(err);
        }
        Todo.find(function(err, todos) {
            if (err) {
                res.send(err);
            }
            
            res.json(todos);
        });
    });
});


// application 

app.get('*', function(req, res) {
    res.sendfile('./public/index.html');
});

// Listen (start app with node  server.js)
app.listen(8080);
console.log('App listening on port 8080');
