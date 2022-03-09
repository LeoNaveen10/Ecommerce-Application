/**
 * this has cart_schema details
 */



module.exports = (sequelize,Sequelize)=>{
 
    const cart = sequelize.define("cart",{
        id :{
            type : Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        cost : {
            type : Sequelize.INTEGER
        }
    });
    return cart;
}