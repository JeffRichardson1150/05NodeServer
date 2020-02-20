let express = require('express');
let router = express.Router();
let sequelize = require('../db');
let User = sequelize.import('../models/user')
/************************
 * Create User Endpoint: Starter
 **************************/
//2
router.post('/createuser', function (req, res) {

    let username = "Capn Crunch";
    let pass = "CrunchBerries";  //3

    User.create({
        username: username,
        passwordhash: pass
    }).then(
        function message() {
            res.send("Stays crunchy, even in milk");
        }
    );

})

module.exports = router;

