/**
 * this will export everything in models
 */
const Sequelize = require("sequelize");
const config =require("../configs/db.conig");

const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,{
        host : config.HOST,
        dialect : config.dialect,
        
        pool :{
            max : config.pool.max,
            min : config.pool.min,
            acquire : config.pool.acquire,
            idle : config.pool.idle
        }
    }
);


var db ={};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.category = require("./category.model")(sequelize,Sequelize);
db.product = require("./product.model")(sequelize,Sequelize);
db.user = require("./user.model")(sequelize,Sequelize);
db.role = require("./role.model")(sequelize,Sequelize);
db.cart = require("./cart.model")(sequelize,Sequelize);

db.role.belongsToMany(db.user,{
    through : "user_roles",
    foreginKey : "role_id",
    otherKey : "user_id"
});

db.user.belongsToMany(db.role ,{
    through : "user_roles",
    foreginKey : "user_id",
    otherKey : "roll_id"
});

/**
 * 1) relation btwn user and cart(1 to many)
 * 2)relation between cart and prodcut(many to many)
 */

db.user.hasMany(db.cart); 

db.product.belongsToMany(db.cart,{
    through : "cart_products",
    foreginKey : "product_id",
    otherKey : "cart_id"
});

db.cart.belongsToMany(db.product,{
    through : "cart_products",
    foreginKey : "cart_id",
    otherKey : "product_id"
});

db.Roles=["customer","admin"]; //defining this coz we should not call db everytime from DB

module.exports = db;