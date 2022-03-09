
const db = require("../models/index");

const product_schema = db.product;


exports.create=(req,res)=>{

 const prod ={
     name : req.body.name,
     description : req.body.description,
     cost : req.body.cost,
     categoryId : req.body.categoryId
 }
    product_schema.create(prod).then(data=>{
        console.log(`product  ${prod.name} is added`);
        res.status(200).send(data);
    }).catch(err=>{
        res.status(500).send({
            message : "Internal Error"
        })
    })
}

exports.findall =(req,res)=>{
    const productName = req.query.name;
    let promise;  //just a variable that holds the return thing from findAll
   
    if(productName){
       promise= product_schema.findAll({where:{name:productName}})
    }
    else {
       promise= product_schema.findAll();
       
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
       const productId = req.params.id;
   
       product_schema.findByPk(productId).then((data)=>{  //find by primary Key
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
    const product = {
        name : req.body.name,
        description : req.body.description,
        cost : req.body.cost
    }

   const  productId = req.params.id;

   product_schema.update(product,{ where : { id : productId}, returning : true }).then(()=>{
    
       product_schema.findByPk(productId).then(updatedProduct=>{
        res.status(200).send(updatedProduct);      
       })
       .catch(err=>{
           res.status(500).send({
               message : "some internal error happened"
           })
       })
     
   }).catch(err=>{
       res.status(500).send(err);
   })
}


/**
 * deleting product
 */

exports.delete = (req,res)=>{
   
    productID =req.params.id;
    
    product_schema.destroy({where :{ id :productID}}).then(result=>{
        res.status(200).send({
            message : "successfully deleted the message"
         })
    }).catch(err=>{
        res.status(500).send({
            message : "some internal error"
        })
    })
}


