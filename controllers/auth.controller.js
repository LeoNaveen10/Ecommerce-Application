/**
 * this file is used for authentication and authorization
 */

const db = require("../models");
const user_schema = db.user;
const role_schema = db.role;
const bcrypt = require("bcryptjs");
const Op = db.Sequelize.Op; //operator of Sequelize
const jwt = require("jsonwebtoken");
const secretKey = require("../configs/secret.config");

//for sign up
exports.signup = (req, res) => {

    //getting user details
    const userobj = {
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8) //need to encrypt
    }

    user_schema.create(userobj).then(user => {
        console.log("user created");

        //check whether roles are provided along with user details
        if (req.body.roles) {
            role_schema.findAll({ where: { name: { [Op.or]: req.body.roles } } }).then(roles => {
                console.log("roles", roles);
                user.setRoles(roles).then(() => {
                    console.log("registration done");
                    res.status(200).send({
                        message: "user registered successfully"
                    })
                })
            })
        } else {
            /** 
             * option 1 ;
             * 
             role_schema.findOne({ where: { name: "customer" } }).then(roles => {
                 user_schema.setRoles([roles]).then(() => {
                     console.log("user registration succesful");
                     res.status(200).send({
                         message: "user registered successfully"
                     })
                 })
                     **/
            //if we know primaryKey,only then we can use this

            user.setRoles([1]).then(() => {
                console.log("registration successful");
                res.status(201).send({
                    message: "successful"
                })
            })
        }
    }).catch(err => {
        console.log("Error while creating user");
        res.status(500).send({
            message: err
        })
    })
}

//for sign in
exports.signin = (req, res) => {
    user_schema.findOne({ where: { email: req.body.email } }).then(user => {
        //if that user is not present
        if (!user) {
            res.status(404).send({
                message: "user not found"
            })
            return;
        }
        //verify the password
        var passowrdIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passowrdIsValid) {
            res.status(401).send({
                message: "invalid password"
            })
            return;
        }
        /**
         * access token generated here
         */
        var token = jwt.sign({ id: user.id }, secretKey.secret, {
            expiresIn: 300 //this in seconds  //can be kept in config file 
        });

        var authorities = [];
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++)
                authorities.push("Role =" + roles[i].name.toUpperCase());
            
            res.status(200).send({
                id: user.id,
                username: user.username,
                email: user.email,
                roles: authorities,
                accessToken: token
            })
        })
    }).catch(err => {
        res.status(400).send({
            message: "Internal error while signing in"
        })
    })
}
