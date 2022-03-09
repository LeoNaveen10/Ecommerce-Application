

const { category } = require("../models")

const validateCategoryRequest = (req, res, next) => {

    if (!req.body.name) {
        res.status(400).send({
            message: "name is not provided"
        })
        return;
    }
    if (!req.body.description) {
        res.status(400).send({
            message: "description is not provided"
        })
        return;
    }

    next(); //go to controller
}

const validationProductRequest = (req, res, next) => {
    //name
    if (!req.body.name) {
        res.status(400).send({
            message: "name is not provided"
        })
        return;
    }
    //description
    if (!req.body.description) {
        res.status(400).send({
            message: "description is not provided"
        })
        return;
    }
    //cost
    if (!req.body.cost || req.body.cost <= 0) {
        res.status(400).send({
            message: "cost doesn't make sense here"
        })
        return;
    }
    //category id in body
    if (req.body.categoryId) {
        category.findByPk(req.body.categoryId).then((category) => {
            if (!category) {
                res.status(400).send("Invalid customer ID");
                return;
            }
            next();
        })
    } else {
        res.status(400).send({
            message: "category is not provided"
        });
        return;
    }
}





module.exports = {
    validateCategoryRequest: validateCategoryRequest,
    validationProductRequest: validationProductRequest
}