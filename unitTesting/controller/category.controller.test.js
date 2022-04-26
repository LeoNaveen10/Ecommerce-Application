const request = require("express/lib/request");
const {mockRequest,mockedResponse} =require("../interceptor");
const newCategory = require("../mockData/newCategory.json");
const db = require("../../models/index");
const category = db.category;
const categoryController = require("../../controllers/category.controller");


let req,res;
beforeEach(()=>{
    req = mockRequest;
    res = mockedResponse;
})

describe("category create test",()=>{

    it("test successful creation of new category",async()=>{

        request.body = newCategory;
        
        const spy = jest.spyOn(category,'create').mockImplementation((newCategory) => Promise.resolve(newCategory));

        await categoryController.create(req,res);


        expect(spy).toHaveBeenCalledWith();    
        expect(category.create).toHaveBeenCalledWith(newCategory);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(newCategory);
    }) 

})