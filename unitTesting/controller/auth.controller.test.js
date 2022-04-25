
const { user, role } = require("../../models");
const {mockRequest,mockedResponse} = require("../interceptor");
const newUser = require("../mockData/newUser.json");
const authController = require("../../controllers/auth.controller");

/**
 * prep work before the tests are executed
 */
let req,res;
beforeEach(()=>{
    //this will run each test run
    req = mockRequest();
    res = mockedResponse();
})



/**
 * test sign up
 *  1) Successful sign up
 *          a. when we provide the roles
 *          b. when we don't provide the roles 
 * 
 *  2) SignUp failed
 * 
 *  Totally 3 tests, under one topic.
 */
describe("Testing Signup method of authcontroller",()=>{
    //1. sucessful sign up, when we provide the roles
    it("sucessful sign up, when we provide the roles",async()=>{
        //mocking request, user and role model. 
        req.body = newUser;

        const resFromCreate = {
            setRoles : async() => Promise.resolve()
        }

        const spyOnCreate =jest.spyOn(user,'create').mockImplementation(()=> Promise.resolve(resFromCreate));
        const spyOnFindAll=jest.spyOn(role,'findAll').mockImplementation(()=> Promise.resolve());
        
        await authController.signup(req,res);

        //validating the test
        await expect(spyOnCreate).toHaveBeenCalled();
        await expect(spyOnFindAll).toHaveBeenCalled();
        await expect(user.create).toHaveBeenCalled();
        await expect(role.findAll).toHaveBeenCalled();

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({message: "user registered successfully"})
    }); 

    //2. Successful sign up, when don't provide the roles
    it("Successful sign up, when don't provide the roles",()=>{

    })

    //3. Signup failed
    it("sign up failed",()=>{

    })

})


/**
 * test sign in
 */









/**
 * test sign in
 */
