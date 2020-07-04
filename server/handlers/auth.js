const db = require("../models");
const jwt = require("jsonwebtoken");

//sign in
exports.signin = async function(req,res, next) {
    try{
        //finding a user
        let user = await db.User.findOne({
            email:req.body.email
        });
        let { id, username, profileImageUrl, email, created} = user;
        let isMatch = await user.comparePassword(req.body.password);
        if(isMatch){
            let token = jwt.sign({
                id,
                username,
                profileImageUrl,
                email,
                created
            }, process.env.SECRET_KEY);
            return res.status(200).json({
                id,
                username,
                profileImageUrl,
                email,
                created,
                token
            });
        } else {
            return next({
                status: 400,
                message: "Invalid email/password."
            });
        } 
    } catch (e) {
        return next({ status: 400, message: "Invalid Email/Password."});
    }
};

//sign up 
exports.signup = async function(req, res, next) {
    try{
        let user = await db.User.create(req.body);
        let {id, username, profileImageUrl, email, created} = user;
        let token = jwt.sign({
            id,
            username,
            profileImageUrl,
            created,
            email
        }, process.env.SECRET_KEY);
        return res.status(200).json({
            id,
            username,
            profileImageUrl,
            email,
            created,
            token
        });
    } catch (err) {
        //if a validation fails;
        if(err.code === 11000){
            err.message = "Sorry, that username and/or email is taken"
        }
        return next({
            status: 400,
            message: err.message
        })
    }
};