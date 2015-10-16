# AJAX Example (Node/Express/Mongoose)

## Purpose

Example of making an AJAX call to demonstrate interaction between server and client. Explanation of what AJAX is.

### What is AJAX?

AJAX stands for Asynchronous Javascript and XML. To break that down:

1. Asynchronous - not happening at the same time. In this case, AJAX lets you make HTTP requests separately from the initial page load.
2. Javascript - the language used for scripting in the browser (and now the server – thanks Node.js!).
3. [XML](https://en.wikipedia.org/wiki/XML) - a language for passing data. Still in use, but JSON has become much more popular.

The takeaway here is that AJAX is a way to use Javascript to make HTTP requests without leaving/refreshing the page you are on. This is how single-page apps work.

### What is **not** AJAX?

Everything else. DOM manipulation, event listeners, jQuery selectors, and so on. That's just Javascript. The only part of your code that is truly AJAX is this part:

```js
$.ajax({
  type: "post",
  url: "api/todos",
  data: data
}) // At this point the request is sent to the server
// and the client uses the response it gets down here
  .done(function(response) {
    console.log(response);
  }
```

### Process

**Server: Handling requests, serving templates, processing data**

The server will build your templates, populating them with data dynamically pulled from a database or other information source. This is what makes web apps interactive – think of it like improv comedy as opposed to a book or play, which is static.

The server handles requests from the client via routing – you make a request at a certain address to do a certain action. One analogy is that of a restaurant – the client being the menu, the waiter representing the HTTP request / response cycle, and the cooks in the kitchen representing the server. You (the user) make a request via the client (menu). The waiter takes the request to the kitchen (server) where your dish is prepared by the cooks (your template being built) and then the waiter brings you your dish (the response).

Some example steps to follow:

1. Create EJS template(s) to render for a given route.
2. Set up a route to handle incoming request (specifying the URL of the route and how to respond, e.g., rendering a template that you pass local variables to) like `app.get('/todos', function(req, res) { res.render('index', {todos: todos})})`
3. Start your server and make sure you can load the requested page.
4. After you verify that your client is hitting the server (and sending the right data for non-GET routes), revise your existing route or make new ones to handle other request you might need, like: `app.delete('/todos/:id', function(req, res) // code that deletes a todo })`

**Client: Requesting information or actions from the server, manipulating the DOM to affect user experience**

The client (your browser or native app) makes requests to the server, which processes the request and returns a response, which will either be what you wanted, or an error). Based on the outcomes of these request / response interactions, the client can be updated by manipulating the DOM (adding or removing elements, changing colors, etc.).

1. Verify you can hit your `get` route to your `index.html` page (or whatever page you are loading).
2. Set up event handlers like `$('.myClass').on('click', myCallback);`
2. use `preventDefault();` to keep user from being redirected
3. Set any variables you might need later (DOM elements, ids, urls, etc.) such as `var todo = $(this).closest('.todo');`
4. Make AJAX request to the server, like `$.ajax({ type: 'get', url: 'api/todos'});`

To use:

1. Clone this repo: `git clone <url>`
2. `cd` into the directory and run `npm install` to install the dependencies (check `package.json` after to see if they are there)
3. Start the server with `nodemon app.js`
4. Navigate to `localhost:3000`
5. Create and delete todos
6. **Read through `/public/simple-client.js`**
