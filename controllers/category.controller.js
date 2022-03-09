


const db = require("../models/index");
const category_schema = db.category;

exports.create =(req,res)=>{
   
    const category ={
        name : req.body.name,
        description : req.body.description
    }
    category_schema.create(category).then(data=>{
        console.log(`category name : [ ${category.name}] got inserted in the db`);
        res.status(200).send(data);
    }).catch(err=>{
        console.log(`Issue in inserting the category name : [ ${category.name}]. Error message : ${err.message}`);
        res.staus(500).send({
            message : "some error happened"
        })
    })
}
/**
 * 
 * find everything in table
 * 
 * path params : /ecom/v1/categorties/123 --123 is path
 * query params :  /ecom/v1/categories/?name=naveen --query
 * intercept query paramaters
*/


exports.findall =(req,res)=>{
 const categoryName = req.query.name;
 let promise;  //just a variable that holds the return thing from findAll

 if(categoryName){
    promise= category_schema.findAll({where:{name:categoryName}})
 }
 else {
    promise= category_schema.findAll();
    
 }

   promise.then((data)=>{
        res.status(200).send(data);
    }).catch(err=>{
        res.status(500).send({
            message : "some error happened"
        })
    })
}

exports.findOne =(req,res)=>{
    const categoryID = req.params.id;

    category_schema.findByPk(categoryID).then((data)=>{    //find by primary Key
        res.status(200).send(data);
    }).catch(err=>{
        res.status(500).send(err);
    })
}

/**
 * 
 * update method..update() to update 
 * findByPk to print that 
 */
exports.update = (req,res)=>{
    const category = {
        name : req.body.name,
        description : req.body.description
    }
   const  categoryId = req.params.id;

   category_schema.update(category,{ where : { id : categoryId}, returning : true }).then(()=>{
       category_schema.findByPk(categoryId).then(updatedCategory=>{
        res.status(200).send(updatedCategory);      
       })
       .catch(()=>{
           res.status(500).send({
               message : "some internal error happened"
           })
       })
     
   }).catch(err=>{
       res.status(500).send(err);
   })
}


/**
 * deleting category
 */


exports.delete = (req,res)=>{
    categoryID =req.params.id;

    category_schema.destroy({where :{ id :categoryID}}).then(()=>{
        res.status(200).send({
            message : "successfully deleted the message"
         })
    }).catch(()=>{
        res.status(500).send({
            message : "some internal error"
        })
    })
}