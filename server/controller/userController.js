
//const validator= require('express-validator/check');
const userServices = require('../services/userServices')
exports.testSignup = (req, res) => {
    req.checkBody("email").isEmail().withMessage("Email must be valid")
    req.checkBody("password").isLength({ min: 6 }).withMessage('Password must be at least 6 characters in length.')

    req.getValidationResult().then(errors => {

        if (!errors.isEmpty()) {
            //res.status(400).json(errors.array()[0].msg);
            let result={
                message:errors.array()[0].msg,
                status:400
            }
            res.status(400).send(result.message)
            return false;
        }
        else {
            userServices.signup(req, (error,result)=>{
                if(error)
                res.status(401).send(error.message)
                if(result){
                    res.status(200).json({
                        message:"signup successful"
                    })
                }
            });
        }
    })
}

exports.testLogin = (req, res) => {
    req.checkBody("email").isEmail().withMessage("Email must be valid")
    req.checkBody("password").isLength({ min: 6 }).withMessage('Password must be at least 6 characters in length.')
    req.getValidationResult().then(errors => {

        if (!errors.isEmpty()) {
            res.status(400).json(errors.array()[0].msg);
            return false;
        }
        else {
            userServices.login(req,(error,response)=>{
                if(error){
                    res.status(error.status).send(error.message)
                }
                if(response){
                    res.status(response.status).send(response)
                }

            });
        }
    })
}
exports.testLoginReset = (req, res) => {
    req.checkBody("newpassword").isLength({ min: 6 }).withMessage('Password must be at least 6 characters in length.')
    req.getValidationResult().then(errors => {

        if (!errors.isEmpty()) {
            res.status(400).json(errors.array()[0].msg);
        }
        else {
            userServices.loginReset(req, (error,response)=>{
                if(error){
                    res.status(error.status).send(error.message)
                }
                if(response){
                    res.status(response.status).send(response.message)
                }
            });
        }
    })
}
exports.testForgot = (req, res) => {
    req.checkBody("email").isEmail().withMessage("Email must be valid")
    req.getValidationResult().then(errors => {

        if (!errors.isEmpty()) {
            res.status(400).json(errors.array()[0].msg);
        }
        else {
            //return userServices.forgot(req, res);
            userServices.forgot(req,(error,response)=>{
                if(error){
                    res.status(error.status).send(error.message)
                }
                if(response){
                    res.status(response.status).send(response)
                }
            })
        }
    }).catch(error => {
        res.status(401).send("Invalid");
    })
}

exports.testForgotId = (req, res) => {
    const tokenId=req.body.Token
    console.log(tokenId);
    req.checkBody("newpassword").isLength({ min: 6 }).withMessage('Password must be at least 6 characters in length.')
    req.getValidationResult().then(errors => {

        if (!errors.isEmpty()) {
            res.status(400).json(errors.array()[0].msg);
        }
        else {
            //return userServices.forgotId(req, res);
            userServices.forgotId(req,(error,response)=>{
                if(error){
                    res.status(error.status).send(error.message)
                }
                if(response){
                    res.status(response.status).send(response.message)
                }

            })
        }
    })
}

exports.getdata=(req,res)=>{
    //res.status(200).send()
    userServices.getData(req,(error,response)=>{
        if(error){
            res.status(error).send(error)
        }
        if(response){
            res.status(200).json((response))
        }
    })
}

//module.exports = { testSignup, testLogin,testLoginReset}