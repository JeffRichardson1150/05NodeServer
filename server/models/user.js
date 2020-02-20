/*
1. A function with a Sequelize object that calls the define method.

2. A first parameter that will create a users table in Postgres.

3. An object with username and passwordhash that will be the columns in the table. We'll talk more about a passwordhash later.

*/

module.exports = function (sequelize, DataTypes) {
            //1        //2
    return sequelize.define('user', {
        username: DataTypes.STRING,  //3
        passwordhash: DataTypes.STRING  //3
    });
}