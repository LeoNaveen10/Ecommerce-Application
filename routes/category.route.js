/**
 * this has REST apis
 */

const category = require("../controllers/category.controller");
const {requestValidator,authJwt} = require("../middleware");


module.exports =function(app){

    //create
    app.post('/ecomm/api/v1/categories',[authJwt.verifyToken,authJwt.isAdmin,requestValidator.validateCategoryRequest],category.create);
    //find all
    app.get('/ecomm/api/v1/categories',category.findall);
    //find by PK
    app.get("/ecomm/api/v1/categories/:id",category.findOne);
    //to update
    app.put('/ecomm/api/v1/categories/:id',[authJwt.verifyToken,authJwt.isAdmin,requestValidator.validateCategoryRequest],category.update);
    //to delete
    app.delete('/ecomm/api/v1/categories/:id',[authJwt.verifyToken,authJwt.isAdmin],category.delete);
    
}