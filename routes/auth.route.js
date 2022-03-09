
const authController = require("../controllers/auth.controller");
const {verifySignUp} = require("../middleware");
module.exports = (app)=>{
    app.post("/ecomm/api/v1/auth/signup",[verifySignUp.checkDuplicateUsernameOrEmail,verifySignUp.checkRolesExisted],authController.signup);
   
    app.post("/ecomm/api/v1/auth/signin",authController.signin);
}