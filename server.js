const express = require("express");
const bodyparser = require("body-parser");

const serverConfig =require("./configs/server.configs");


const app = express();
app.use(bodyparser.json());

const db = require("./models");

const category = db.category;
const product = db.product;
const roles = db.role;

category.hasMany(product);

db.sequelize.sync({force : true}).then(()=>{
console.log("tables got recreated");
init();            //method call while starting
}).catch(err=>{
    console.log(err);
});

/**
 * this function should execute in the beginning
 */

function init(){
    
  var categories =[
 {
    name : "Electronics",
      description :"all electronics are present here"
  },
  {
    name : "kitchenItems",
    description :"kitchen for home and offices"
 
  }
 ]

category.bulkCreate(categories).then(()=>{
    console.log("startup prodcts added");
}).catch(err=>{
    console.log(err);
})

/**
 * create roles
 */
roles.create({
    id : 1,
    name : "customer"
});
roles.create({
    id : 2 ,
    name : "admin"
});

}


require("./routes/category.route")(app);
require("./routes/product.route")(app);
require("./routes/auth.route")(app);
require("./routes/cart.route")(app);

app.listen(serverConfig.PORT,()=>{
    console.log("Application started on port no :",serverConfig.PORT);
})

