const {mockRequest,mockedResponse} =require("../interceptor");
const newCategory = require("../mockData/newCategory.json");
const category = require("../../models/index").category;
const categoryController = require("../../controllers/category.controller");


let req,res;
beforeEach(()=>{
    req = mockRequest;
    res = mockedResponse;
})

describe("category create test",()=>{

    beforeEach(()=>{
        request.body = newCategory;
    })

    
    it("test successful creation of new category",async()=>{

        
        const spy = jest.spyOn(category,'create').mockImplementation((newCategory) => Promise.resolve(newCategory));

        await categoryController.create(req,res);


        expect(spy).toHaveBeenCalledWith();    
        expect(category.create).toHaveBeenCalledWith(newCategory);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(newCategory);
    }) 

    it("test failure during the creation of a new category",async()=>{
        const spy =jest.spyOn(category,'create').mockImplementation((newCategory)=>Promise.reject(Error("Error happened while creating category")));

        await categoryController.create(req,res);
        await expect(spy).toHaveBeenCalledWith();
        expect(category.create).toHaveBeenCalledWith(newCategory);
        expect(res.staus).toHaveBeenCalledWith()
    })
})


describe("mocking findALL method",()=>{

    it("test the find all method when no query params was passed",async()=>{

        const spy = jest.spyOn(category,"findAll").mockImplementation(()=>Promise.resolve(newCategory));
        await categoryController.findall(req,res);


        expect(spy).toHaveBeenCalledWith();
        expect(category.findAll).toHaveBeenCalledWith();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(newCategory);

    })

   it("test the find all method with the  query param",async()=>{
       const queryParam = {
           where : {name : "electronics"}
       }
   });

   const spy = jest.spyOn(category,'findAll').mockImplementation((queryParam)=>Promise.resolve());

   await expect(spy).toHaveBeenCalledWith();
   expect(category.findAll).toHaveBeenCalledWith(queryParam);
   expect(res.status).toHaveBeenCalledWith(200);
   expect(res.send).toHaveBeenCalledWith(newCategory);
})