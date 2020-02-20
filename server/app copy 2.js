
let express = require('express');
let app = express();
let test = require('./controllers/testcontroller')
let user = require('./controllers/usercontroller')

let sequelize = require('./db');

sequelize.sync(); // tip: pass in {force: true} for resetting tables

app.use(express.json())

app.use('/test', test)  

app.use('/api/user', user)

app.use('/api/test', function(req, res){
    res.send("This is data from the /api/test endpoint. It's from the server.")
});

app.listen(3000, function(){
    console.log('App is listening on 3000.')
})

