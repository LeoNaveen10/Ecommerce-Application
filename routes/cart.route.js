
const cartControl = require("../controllers/cart.controller");
const {authJwt} = require("../middleware");

module.exports=(app)=>{
 app.post("/ecomm/api/v1/carts",[authJwt.verifyToken],cartControl.create);
 
 //app.put must come
 app.put("/ecomm/api/v1/carts/:id",[authJwt.verifyToken],cartControl.update);

 app.get("/ecomm/api/v1/carts/:id",[authJwt.verifyToken],cartControl.getCart);

}