// requirements for app
var express = require('express');
var app = express();

// require body-parser for parsing form data
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({
    extended: false
});

// set up EJS for view rendering; specify static assets folders
var ejs = require('ejs');
app.set('view engine', 'ejs');
app.use(express.static('public'));

// require mongoose
var mongoose = require('mongoose');
// connect to DB
mongoose.connect('mongodb://localhost/test');
// set db to connection property of mongoose
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(callback) {
    console.log("connection open!")
});

var todoSchema = mongoose.Schema({
    title: String,
    description: String
});

// the Todo model
var Todo = mongoose.model('Todo', todoSchema);
var myTodo = new Todo({
    title: "Kamehameha",
    description: "Do it now Gohan!"
});

console.log(myTodo);

app.get('/', function(req, res) {
    res.redirect('/todos');
})

app.get('/todos', function(req, res) {
  // search for all Todo object in DB
    Todo.find(function(err, todos) {
        if (err) return console.error(err);
        console.log("existing todos are: ", todos);
        // render index page, passing todos as local variable
        res.render('index', {
            todos: todos
        });
    });
})

// this route uses parseUrlencoded to add the form data to the req.body object
app.post('/todos', parseUrlencoded, function(req, res) {
    // create a new Todo
    var todo = new Todo({
        title: req.body.title,
        description: req.body.description
    })
    console.log("created todo: ", todo);

    // save your todo in the DB
    todo.save(function(err, todo) {
        if (err) return console.error(err);
        console.log("save successful");
        return todo;
    });
    // return JSON of your todo
    res.json(todo);
    // control goes back to the client now
})

app.delete('/todos/:id', function(req, res) {
  // find the todo to delete in the DB
    var target = Todo.findById(req.params.id, function(err, todo) {
        return todo;
    });

  // delete the todo from the DB
    target.remove(function(err, target) {
        if (err) return handleError(err);
    // prove that it's gone by failing to find it
        Todo.findById(req.params.id, function(err, todo) {
            console.log("todo in find in remove callback: ", todo); // null
            // show all the remaining todos
            // normally wouldn't do this, it's just a sanity check
            Todo.find(function(err, todos) {
                if (err) return console.error(err);
                console.log(todos);
            });
            // tell the client everything is okay
            res.status(200).send("Todo deleted");
        })
    })
})

app.listen(3000, function() {
    console.log("server listening on localhost:3000");
})