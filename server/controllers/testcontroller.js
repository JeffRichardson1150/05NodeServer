/*
1. We import the test model and store it in TestModel variable. It is convention to use Pascal casing (uppercase on both words) for a model class with Sequelize. You'll find this to be true in other programming languages as well.
2. testData is going to have a fixed string that we'll use every time a POST request comes in.
3. We use the TestModel variable to access the model that we are using. This will grant us access to the Test model properties and to Sequelize methods.
4. .create() is a Sequelize method that allows us to create an instance of the Test model and send it off to the db, as long as the data types match the model.
5. We pass the value of testData down to satisfy the key/value pair for the model. The string that we are sending will be the value that's stored in the variable. Currently, it is the string Test data for endpoint two;
6. testdata is the key in the object, and it represents the column being used in the table.
*/

let express = require('express'); 
let router = express.Router(); 
let sequelize = require('../db');
let TestModel = sequelize.import('../models/test') //1

/**************************************
 * Controller Method #1: Simple Response
***************************************/
router.post('/one', function(req, res){
    res.send("Got a post request.")
});

/**************************************
 * Controller Method #2: Simple Response
***************************************/
router.post('/two', function(req, res){
    let testData = "Test data for endpoint two";  //2

    TestModel  //3
        .create({  //4
        //6
    testdata: testData //5
    }).then(dataFromDatabase => {
        res.send("Test two went through!")
    })
});


/*
1. Here we use the req.body middleware provided by Express and append two more properties to it. This is what we're sending to the database. req is the actual request, and body is where our data is being held. testdata is a property of body, while item is a property of testdata. We'll see this in Postman in a little while.
2. create() is a Sequelize method. It creates a SQL statement that will insert our data into the database. You'll learn more about SQL later.
*/
/**************************************
 * Controller Method #3: req.body
***************************************/
router.post('/three', function(req, res){
                    //1
    let testData = req.body.testdata.item;  

    TestModel 
        .create({  //2
    testdata: testData 
    })
    res.send("Test three went through!")
    console.log("Test three went through!")
});

/**************************************
 * Controller Method #4: async Promise for POST request (.then)
  1. We call the  .then()  method. As you'll read in the the MDN docs, the  .then()  method returns a Promise. Hence, we use this asynchronous function to force the message to wait for the insert statement to finish. 
  2. The callback function will print the success message to the console once testData is done running.
***************************************/
router.post('/four', function(req, res){
let testData = req.body.testdata.item;  

TestModel 
    .create({ 
        testdata: testData 
    })
    .then(   //1
        function message() {  //2
            res.send("Res Send - Test four went through!")
            console.log("Console Log - Test four went through!")
        })
});

/*************************************************
* Route 5: Return data in a Promise
**************************************************/
router.post('/five', function(req, res){
    let testData = req.body.testdata.item;  
    
    TestModel 
        .create({ 
            testdata: testData 
        })
        .then(   //1
            function message(data) {  //2
                res.send(data);
                console.log(`Console Log - Test five data: ${data}`)
            })
    });
    
/*************************************************
* Route 6: Return response as JSON
**************************************************/
router.post('/six', function(req, res){
    let testData = req.body.testdata.item;  
    
    TestModel 
        .create({ 
            testdata: testData 
        })
        .then(   //1
            function message(testdata) {  //2
                res.json({
                    testdata: testdata
                });
                console.log(`Console Log - Route six testdata: ${testdata}`)
            })
    });
    
/*************************************************
* Route 7: Handle errors
**************************************************/
router.post('/seven', function(req, res){
    let testData = req.body.testdata.item;  
    
    TestModel 
        .create({ 
            testdata: testData 
        })
        .then(   //1
            function createSuccess(testdata) {
                res.json({
                    testdata: testdata
                });
                console.log(`Console Log - Route six testdata: ${testdata}`)
            },
            function createError(err) {
                res.send(500, err.message);
            }
            );
    });
    
    
module.exports = router;