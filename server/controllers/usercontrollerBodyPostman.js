let express = require('express');
let router = express.Router();
let sequelize = require('../db');
let User = sequelize.import('../models/user')

/************************
 * Create User Endpoint: Starter
 **************************/
router.post('/createuser', function (req, res) {

    let username = req.body.user.username;
    let pass = req.body.user.password; 

    User.create({
        username: username,
        passwordhash: pass
    }).then(
        function createSuccess(user) {
            res.json({
                user: user,
                message: 'created'

            })
        },
        function createError(err) {
            res.send(500, err.message);
        }
    );
});

module.exports = router;

