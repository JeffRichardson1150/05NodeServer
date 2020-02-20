/*
1. We use the Express router object to call the post() method. This corresponds to the type of HTTP request that we are sending. POST is telling the server that the incoming request has data coming with it. You use a POST request when you sign up for an application, send an email, send a tweet, post on a wall, etc. POST sends data through HTTP to the server, which might send the data to the database to be stored.
2. /one will be the endpoint/route we are using. Our route will be named http://localhost:3000/test/one. After that, we'll run a callback function, which will fire off a response.
3. When the client requests the given endpoint, we simply send a string in our response.

KEY POINT: Notice that we are not yet talking to our model or database. We are simply sending an empty POST and returning a string response.
*/

let express = require('express'); 
let router = express.Router(); 
let sequelize = require('../db');

/**************************************
 * Controller Method #1: Simple Response
***************************************/
        //1    //2
router.post('/one', function(req, res){
    //3
    res.send("Test 1 went through!")
});

module.exports = router;