/**
 * for duplicate emial or usrname
 */
const db = require("../models/index");
const User = db.user;
const Roles = db.Roles;

const checkDuplicateUsernameOrEmail = (req, res, next) => {
    User.findOne({ where: { username: req.body.username } }).then(user =>{
        if (user) {
            res.status(400).send({
                message: "Failed : username already exists"
            });
            return;
        }
    })

    User.findOne({ where: { email: req.body.email } }).then(user => {
        if(user){
            res.status(400).send({
                message: "Failed : email already exists"
            });
            return;
        }
        next();
    })
}

/**
 * check whether the roles is right(customer/admin)
*/

const checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        for (i = 0; i < req.body.roles.length; i++) {
            //check whether it is present
            if (!Roles.includes(req.body.roles[i])) {
                res.status(400).send({
                    message: "failed Role is not valid" + req.body.roles[i]
                })
                return;
            }
        }
    }
    next();
}

const verifySignUp = {
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
    checkRolesExisted: checkRolesExisted
}

module.exports = verifySignUp;