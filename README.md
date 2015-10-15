# AJAX Example (Node/Express/Mongoose)

## Premise

Example of making an AJAX call to demonstrate interaction between server and client.

## Process

**Server**
1. Create EJS template(s) to render for a given route

**Client**
1. Set up event handlers like `$('.myClass').on('click', myCallback);`
2. use `preventDefault();` to keep user from being redirected
3. Set any variables you might need later (DOM elements, ids, urls, etc.) such as `var todo = $(this).closest('.todo');`
4. Make AJAX request to the server, like `$.ajax({ type: 'get', url: 'api/todos'});`

**Server: Handling the Route**
1. Set up a route to handle incoming request (specifying the URL of the route and how to respond, e.g., rendering a template that you pass local variables to) like `app.get('/todos', function(req, res) { res.render('index', {todos: todos})})
2. Start your server and test it out!

To use:

1. Clone this repo: `git clone <url>`
2. `cd` into the directory and run `npm install` to install the dependencies (check `package.json` after to see if they are there)
3. Start the server with `nodemon app.js`
4. Navigate to `localhost:3000`
5. Create and delete todos
6. **Read through `/public/simple-client.js`**