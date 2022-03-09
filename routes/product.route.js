const productController = require("../controllers/product.controller");
const{ requestValidator,authJwt} = require("../middleware");

module.exports=(app)=>{
     //create product
     app.post("/ecomm/api/v1/products",[authJwt.verifyToken,authJwt.isAdmin,requestValidator.validationProductRequest],productController.create);
     //find all
     app.get('/ecomm/api/v1/products',productController.findall);
     //find by PK
     app.get("/ecomm/api/v1/products/:id",productController.findOne);
     //to update
     app.put('/ecomm/api/v1/products/:id',[authJwt.verifyToken,authJwt.isAdmin,requestValidator.validationProductRequest],productController.update);
     //to delete
     app.delete('/ecomm/api/v1/products/:id',[authJwt.verifyToken,authJwt.isAdmin],productController.delete);
    
}   