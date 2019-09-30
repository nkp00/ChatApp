
const express = require('express');
const app = express();
app.use(express.json());
const bcrypt = require('bcrypt');
const token=require('../middleWare/token');
const mail=require('../middleWare/mail')
const ChatApp = require('../app/models/userModel');


result={};                                    // Taking a gloabl empty object to store error messages and status codes

exports.getData=(req,callback)=>{
    ChatApp.find().then(chatApp=>{
        callback(null,chatApp)
    }).catch(error=>{
       // console.log(error)
       callback(error)
    })
  //  callback(null,ChatApp.email)
}
exports.signup=(req,callback)=> {

    ChatApp.find({ email: req.body.email }) // it returns a array.
            .exec()
            .then(chatApp => {
                 if (chatApp.length >= 1) {
                     //res.status(409).send("User already exist")
                      result={message:"User already exist",
                      status:403};
                     callback(result);
                    }
                else{
                    bcrypt.hash(req.body.password, 10, (err, hash) => {
                        if (err) {
                            //res.status(500).send(err)//error[0].email.validationError);
                            callback(err);
                        }
                        else {
                            var newuser = new ChatApp({
                                    name: req.body.name,
                                    email: req.body.email,
                                    password: hash
                            });
                            
                                newuser.save().then(result =>{
                                   if(result) //{console.log(result);
                                    //res.json("Signup Successfull");
                                    callback(null,result);
                                    
                                }).catch(err2 => {
                                    // console.log(err);
                                    //res.status(404).send(err2)//.//errors.email.properties.message)
                                    callback(err2)
                            })
                       
                        }
                    
                    });
                
                };
    
            })
      
     };

exports.login=(req,callback)=>{   
    
        ChatApp.find({email:req.body.email})
        .exec()
        .then(user=>{
            if(user.length<1){
               result={
                message:"User does not exist",
                status:404};
               callback(result)
            }
            else {
            let response=bcrypt.compareSync(req.body.password, user[0].password )
            
                if(!response){
                    result={
                        message:"invalid password",
                        status:401
                    }
                    callback(result);
                }
                if(response){
                   const token1=token.generateToken(user[0].email)
                   console.log(token1);
                   result=({
                      message:"Login successful" ,
                      Token:token1,
                      status:200
                    });
                    callback(null,result);
                
                };
              
            };

        });

    };


 //app.patch('/login/reset',(req,res)
 exports.loginReset=(req,callback)=>{

        const pass=req.header('pass')
        console.log(pass)
            if(!pass){
                //res.status(401).send("Token not found")
                result={
                    message:"Token not found",
                    status:401
                }
                callback(result)
            }
            else {
                    token.verifyToken(pass,(err,data)=>{
                        if(err)
                           // res.status(500).send("Invalid Token");
                           result={
                               message:"Hello Invalid Token",
                               status:500
                           }
                           console.log(data);
                           callback(result)
                        if(data){
                            bcrypt.hash(req.body.newpassword, 10, (error, hash) => {
                                if (error) {
                                // console.log(error[0].email.message);
                                    //res.status(500).send(error[0].email.validationError);
                                    //return;
                                    result={
                                        message:error[0].email.validationError,
                                        status:500
                                    }
                                    callback(result)
                                }
                            
                            ChatApp.updateOne({email:data.email},{$set:{password:hash}})
                            .then(data=>{
                                //res.send("Password updated");
                                result={
                                    message:"Password Updated",
                                    status:200
                                }
                                callback(null,result)
                            })
                            // .catch(error=>{
                            //     res.send(error)
                            // })
                        })
                    }
                })
            }
    }


//app.post('/forgot',(req,res)=>{
exports.forgot=(req,callback)=>{

        ChatApp.find({email:req.body.email})
        .exec()
        .then(user=>{

            if(user.length<1){
                // res.status(404).send("User does not exist")
                // return;
                result={
                    message:"User does not exist",
                    status:404
                }
                callback(result);
            }
            else{
                 var token1=token.generateToken(user[0].email);
                 //res.header("pass",token1);                     // sending token in header
                 mail.sendemail(token1);
                // res.status(200).send("Password reset link is sent to your mail");
                result={
                    message:"Password reset link is sent to your mail",
                    Token:token1,
                    status:200
                }
                callback(null,result);
            }
       
       })

}


//app.patch('/forgot/:tokenId',(req,res)
exports.forgotId=(req,callback)=>{

    const tokenId=req.params.tokenId;
  
//    const tokenId=req.body.Token
//      console.log(tokenId);
    token.verifyToken(tokenId,(err,data)=>{
        console.log("here it is");
        
        if(err){
        // res.status(500).send("Invalid Token");
        result={
            message:"Invalid Token",
            status:500
        }
        callback(result);
    }
        if(data)
        {  
            console.log(req.body.newpassword);
            console.log(req.body.confirmPassword);

            if(req.body.newpassword!=req.body.confirmPassword)   {
                result={
                    message:"Password did not match",
                    status:422
                }
                callback(result)
            }  
            else{
                        
                    bcrypt.hash(req.body.newpassword, 10, (error, hash) => {

                    if (error) {
                     result={
                                message:error[0].email.validationError,
                                status:500
                            }
                            callback(result);
                    }   
                            
                    ChatApp.updateOne({email:data.email},{$set:{password:hash}})
                            .then(response=>{
                            // res.send("Password updated");
                            result={
                                message:"Password updated",
                                status:200
                            }
                            callback(null,result)
                                })
                                .catch(error=>{
                                    //res.send(error)
                                    result={
                                        message:error,
                                        status:500
                                    }
                                    callback(result)
                        
                                })
                            })
          
                        }
          
                 }
   
       
          })
    
    };


//module.exports = app
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
    /* // Rough work.
    
    const courses=[
        {id:1,name:"aaa"},
        {id:2,name:"bbb"},
        {id:3,name:"ccc"}
    ];
    app.get('/h',(req,res)=>{
        res.send("hello word")
    });
    
    app.get('/a',(req,res)=>{
        res.send([1,3,5]);
    })
    app.get('/courses',(req,res)=>{
        res.send(courses);
    })
    app.get('/courses/:id',(req,res)=>{
        const course=courses.find(c => c.id===parseInt(req.params.id))
        if(!course){
            res.status(404).send("Entered Id is not found");
        }
        res.send(course);
    })
    app.post('/courses',(req,res)=>{
        const schema={
           name:Joi.string().min(3).required() 
        };
        const result=Joi.validate(req.body,schema);
        //console.log(result);
    
        if(result.error){
            res.status(400).send(result.error.details[0].message);
            return;
        }
        const course={
            id:courses.length+1,
            name:req.body.name
        };
        courses.push(course);
        res.send(course);
    })
    
    app.put('/courses/:id',(req,res) =>{
        const course=courses.find(c => c.id===parseInt(req.params.id))
        if(!course){
            res.status(404).send("Entered Id is not found");
        }
         const {error}=validatecourse(req.body);
         //console.log(result);
     
         if(error){
             res.status(400).send(error.details[0].message);
             return;
         }
    
         course.name=req.body.name;
         res.send(course);
    
    })
    
    
    // app.delete('/courses/:id',(req,res)=>{
    //     const course=courses.find(c => c.id===parseInt(req.params.id))
    //     if(!course){
    //         res.status(404).send("Entered Id is not found");
    //     }
    //     const index=courses.indexOf(course);
    //     courses.splice(index,1);
    //     res.send(course);
    
    // })
    
    
    //const Joi = require('joi');
    /*
     validatepassword=(password,email)=> {
        const schema = Joi.object().keys({
            email: Joi.string().min(3).required(),
            password:Joi.string().min(6).required()
        });
        return Joi.validate(password,email, schema);
    
    };
*/
