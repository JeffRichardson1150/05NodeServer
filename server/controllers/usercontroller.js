let express = require('express');
let router = express.Router();
let sequelize = require('../db');
let User = sequelize.import('../models/user');
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');

/************************
 * Create User Endpoint: Starter
 **************************/
/*
1. Create a variable to hold the token.
2. .sign() creates the token. It takes at least 2 parameters: the payload and the signature. You can also supply some specific options or a callback.
3. This is the payload, or data we're sending. user.id is the primary key of the user table and is the number assigned to the user when created in the database.
4. This is the signature, which is used to help encode and decode the token. You can make it anything you want, and we will make this private later.
5. We set an option to make the token expire. Here, we're taking (seconds minutes hours); in other words, 1 day.
6. We pass the value of the token back in our response. The server has now assigned a token to a specific user, and the client will have that token to work with (once we have a client).
*/
router.post('/createuser', function (req, res) {

    let username = req.body.user.username;
    let pass = req.body.user.password; 

    User.create({
        username: username,
        passwordhash: bcrypt.hashSync(pass, 10)
    }).then(
        function createSuccess(user) {
              //1           //2     //3             //4             //5
            let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});

            res.json({
                user: user,
                message: 'created',
                sessionToken: token   //6
            })
        },
        function createError(err) {
            res.send(500, err.message);
        }
    );
});

/*
21. The findOne() method is a Sequelize method that does exactly what it says: it tries to find something within the database that we tell it to look for. This is called Data Retrieval. Check out the Sequelize docs here (Links to an external site.).
22. is an object within Sequelize that tells the database to look for something matching its properties.
23. We're looking in the username column in the user table for one thing that matches the value passed from the client.
24. The promise is handled within the .then() function.
25. Here we have a function that is called when the promise is resolved, and if successful, sends the user object back in the response.
26. Function called if the promise is rejected. We print the error to the console.
27. We're sending data this time, so we use router.post instead of router.get.
*/
/*
31. First we check to make sure that a match for the username was found.
32. Before, we used bcrypt to encrypt the password. Now, we use it to decrypt the hash value and compare it to the supplied password. This is a complex task, and we let the highly reputable and revered bcrypt package handle the algorithm for doing that. As a best practice, you shouldn't try to write this or use something that you have written. First of all, it will take months of your life to rebuild something that is already working. You can read more about bcrypt.compare() at the npm registry (https://www.npmjs.com/package/bcryptjs).
33. Here we pull in the password value from the current request when the user is signing up.
34. This pulls the hashed password value from the database.
35. Run a callback function that will run on either success or failure of compare.
36. If the hashed password in the database matches the one that has been entered, print to the console that the password values match. Note that the matches variable is a boolean.
37. Handle situations where the match fails.
*/
        //27
router.post('/signin', function(req, res) {
            //21    /22     //23                                /24
    User.findOne({where: {username: req.body.user.username}}).then(
        //25
        function(user) {
            //31
            if (user) {
                //32                    //33                     //34              //35
                bcrypt.compare(req.body.user.password, user.passwordhash, function(err, matches) {
                    console.log("******** The value matches:", matches);  //36
                    console.log("************** err is: ", err);
                });
                // res.json(user);
            } else {  //37
                res.status(500).send({error: " failed to authenticate"});
            }
        },
        function (err) {
        res.status(501).send({error: "you failed, yo"});  //26
        }
    )
})



module.exports = router;

