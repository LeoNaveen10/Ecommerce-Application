
const { cart } = require("../models");
const db = require("../models");
const cart_schema = db.cart;
const Product_schema = db.product;

/**
 * handler for creating cart request
 */

exports.create = (req, res) => {

    const cartDetails = {
        userid: req.userid
    }

    cart_schema.create(cartDetails).then(data => {
        res.status(200).send(data);
    }).catch(() => {
        res.status(500).send({
            message: " some internal error happened"
        })
    })
}

/**
 * for updating cart
 */
exports.update = (req, res) => {

    const cartId = req.params.id;

    cart_schema.findByPk(cartId).then(cart => {
        //get products from product id
        var productIds = req.body.productIds;

        Product_schema.findAll({ where: { id: productIds } }).then(products => {
            if (!products) {
                res.status(400).send({
                    message: "products trying to add doesn't exists"
                })
                return;
            } else {

                cart.setproducts(products).then(() => {
                    console.log("successfully added to the cart");
                    var cost=0;
                    var productsSelected =[];
                    cart.getProducts().then(cartproducts=>{
                        for(let i=0;i<cartproducts.length;i++){
                        productsSelected.push({
                            id : cartproducts[i].id,
                            name : cartproducts[i].name,
                            cost : cartproducts[i].cost
                        });
                        cost +=cartproducts[i].cost;     
                       }
                       res.status(200).send({
                           id : cart.id,
                           productsSelected : productsSelected,
                           cost : cost
                       })
                    })
                })
            }
        })

    }).catch(err => {
        res.status(500).send({
            message: "cart trying to access is not present"
        })
    })

}



/**
 * search for a cart based on cart_id
 */



exports.getCart = (req,res)=>{
    const cartId = req.params.cartId;

    cart_schema.findByPk(cartId).then(cart=>{
        var cost=0;
        var productsSelected =[];
        cart.getProducts().then(cartproducts=>{
            for(let i=0;i<cartproducts.length;i++){
            productsSelected.push({
                id : cartproducts[i].id,
                name : cartproducts[i].name,
                cost : cartproducts[i].cost
            });
            cost +=cartproducts[i].cost;     
           }
           res.status(200).send({
               id : cart.id,
               productsSelected : productsSelected,
               cost : cost
           })
        })
    }).catch(err=>{
        message : "cart is not present in the given id"
    })
}

