/**
 * this file contains
 */

module.exports = (sequelize,Sequelize)=>{
    const user = sequelize.define("user",{
       
        username : {
            type : Sequelize.STRING,
            allowNUll : false
        },
        email : {
            type : Sequelize.STRING,
            allowNull : false
        },
        password :{
            type : Sequelize.STRING,
            allowNull : false
        }
    });
    return user;
}