/*
1. We import the Express framework and it inside the variable express. This instance becomes our gateway to using Express methods.

2. We create a new variable called router. Since the express variable(line 1) gives us access into the express framework, we can access express properties and methods by calling express + .. Therefore, when we call express.Router(), we are using the express variable to access the Router() method.
The Router() method will return a router object for us. You can read about it more at the Express docs (https://expressjs.com/en/4x/api.html#router).

3. We use the router object by using the router variable to get access into the Router() object methods.

4. get() is one of the methods in the object, and we call it here. This method allows us to complete an HTTP GET request. We pass two arguments into the .get method.

5. The first argument is the path. In this case, the path is just a /. More on this later.

6. The second argument is a callback function. This is also sometimes called a “handler function”. This function gets called when the application receives a request to the specified route and HTTP method. The application “listens” for requests that match the specified route(s) and method(s), and when it detects a match, it calls the specified callback function.

7. Inside our callback function, we call res.send(). send() is an express method that can be called on the res or response object. Our response parameter is just a simple string.

8. We export the module for usage outside of the file.
*/

let express = require('express'); //1
let router = express.Router();  //2

//  ***************  CHALLENGE #2 array of contacts objects
let myContacts = 
    [{user : "Kenn",
    email : "kenn@beastmode.com"},
    {user : "Aaron",
    email : "aaron@beastmode.com"}, 
    {user : "Tom",
    email : "tom@beastmode.com"}, 
    {user : "Quincy",
    email : "quincy@beastmode.com"}]

// ******************  CHALLENGE #2 array of projects
let projects = ['Project1', 'Project2']

//3    //4  //5           //6
router.get('/', function (req,res) {
    //7
    res.send('Hey!!! This is a test route!');
});

// ***************  CHALLENGE #1 - about route
router.get('/about', function (req,res) {
    //7
    res.send('Hey!!! This is an about route!');
});
// **************  Challenge #2 routes - start  ***************
router.get('/contact', function (req,res) {
    res.send(contacts[0]);
});

router.get('/projects', function (req,res) {
    res.send(projects);
});

router.get('/mycontacts', function (req,res) {
    res.send(myContacts);
});
// ***************  Challenge #2 routes - end  ****************


//8
module.exports = router;