let aboutExpress = require('express'); //1
let aboutRouter = aboutExpress.Router();  //2

//3    //4  //5           //6
aboutRouter.get('/', function (req,res) {
    //7
    res.send('Hey!!! This is an about route!');
});

//8
module.exports = aboutRouter;