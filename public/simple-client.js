console.log("sanity check, JS script is loaded in client browser");

// function for building an HTML string to append later
function buildTodo(todo) {
    var todoHtml = '<div class="todo" id="'
    + todo._id + '"><h2>' + todo.title
    + '</h2><p>' + todo.description
    + '</p><button class="btn btn-danger delete-todo">Delete</button></div>';

    return todoHtml;
}

$(document).ready(function() {
    // use jQuery to select the HTML element with class 'notes-container'
    // listen for a submit event; fire addNote callback when one occurs
    $('.todo-container').on('submit', function(e) {
        // prevent default from form submission so page doesn't refresh
        e.preventDefault();

        console.log(e.target); // the form
        // convert form data to JSON to pass to AJAX call
        var formData = $(e.target).serialize();
        $('#create-todo').trigger("reset");

        // invoking AJAX constructor function, passing an object literal as an argument
        $.ajax({
            url: '/todos', // matches server-side route
            type: 'post', // matches app.methodName in server
            data: formData // will be handled with bodyParser
        })
        // at this point, control is with the server
            .done(function(data) {
                // data is the server response that you specify using res.json(someObject) or res.whateverMethod
                console.log(data);
                // building the HTML string using the JSON response
                var todo = buildTodo(data)
                // appending HTML string to DOM
                $('.todo-container').append(todo);
            })
            .fail(function(data) {
                console.log("post route failed :", data);
            })
    });

    // setting up click listener on todo-container because it is there when the page loads
    // specify delete-todo so that Javascript will check for clicks on todo-container HTML element and THEN check if that click was also on an element with delete-todo class, at which point it exexutes the callback function
    $('.todo-container').on('click', '.delete-todo', function(e) {
        // pass e to the callback because event is a global keyword that you should not manipulate and it is passed in as the first argument to an event listener callback by default anyway
        e.preventDefault();

        // this is the clicked button, .closest climbs up the DOM tree and finds the first element with the specified selector
        var todo = $(this).closest('.todo');
        // grab the id of the todo div
        var id = $(todo).attr('id');

        console.log("delete clicked");

        $.ajax({
            url: '/todos/' + id, // specifying the URL params for the server to use
            type: 'delete'
        })
        // control passes to the server
        .done(function(data) {
            // remove the todo div from the DOM
            $(todo).remove();
            console.log(data);
        })
        .fail(function(data) {
            console.log("error: ", data);
        })
    })
});