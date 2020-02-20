/*
1. we require the use of the express npm package that we've installed in our dependencies
2. we create an instance of express. We're actually firing off a top-level express() function, a function exported by the Express module. This allows us to create an Express app.
3. app.listen will use express to start a UNIX socket and listen for connections on the given path. This method is identical to Node's http.Server.listen().
4. The given path is localhost:3000
5. We call a callback function when the connection happens with a simple console.log

6. We import the route object that we just created and store it in a variable called test.
7. We call app.use and in the first parameter create a base url called /test. So our base url will look like this: http://localhost:3000/test
8. For our second parameter for the use() function, we pass in test. This means that all routes created in the testcontroller.js file will be sub-routes. It will look like this: http://localhost:3000/test or http://localhost:3000/test/

*/
require('dotenv').config();

let express = require('express'); //1
let app = express(); //2
let test = require('./controllers/testcontroller') //6
let user = require('./controllers/usercontroller')

let sequelize = require('./db');

sequelize.sync(); // tip: pass in {force: true} for resetting tables

/*
11. This app.use statement MUST go above any routes. Any routes above this statement will not be able to use the express.json() function, so they will break. You should read through this article (https://expressjs.com/en/api.html#express.json) to get a starter understanding of how express.json() is working with req.body. Warning: this will lead you down a rabbit hole of understanding. For our purposes, it's important to know this:
app.use(express.json()) tells the application that we want json to be used as we process this request.

Express has functionality built into it, that allows it to be able to process requests that come into our server. 
*/
app.use(express.json()) // 11

          //7     //8
app.use('/test', test)

app.use('/api/user', user)

app.use('/api/test', function(req, res){
    res.send("This is data from the /api/test endpoint. It's from the server.")
});

//3         //4
app.listen(3000, function(){
    console.log('App is listening on 3000.') //5
    // console.log('Hey man!!!')
})

