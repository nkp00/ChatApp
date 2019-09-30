

 const express = require('express');
 const app = express();
 app.use(express.json());
 //const app1=require('../services/userServices');
 const userController=require('../controller/userController')
app.get('/get',userController.getdata)
app.post('/login',userController.testLogin);
app.post('/signup',userController.testSignup);
app.patch('/login/reset',userController.testLoginReset);
app.post('/forgot',userController.testForgot);
app.patch('/forgot/:tokenId',userController.testForgotId);


module.exports=app


























// const ChatApp = require('../app/models/userModel');

// app.get('/signup', (req, res) => {
//     ChatApp.find()
//         //console.log(nkp);
//         .then((info) => {
//             res.json(info);
//         })
//         .catch(err => {
//             res.json(err)
//         })
// })
// app.post('/post',(req, res) => {
//     // if(!req.body.name|| req.body.name.length<3){
//     //     res.status(400).send("Name is required");
//     //     return ;
//     // }

// // const schema={
// //     email:Joi.string().required().email().min(6),
// //     password:Joi.string().required().min(8)
// // };
//     // const result =Joi.validate(res.body, schema);
//     // if (result.error){
//     //     res.status(401).send(error)
//     //     //return;
//     // }

//     const chat = new ChatApp({
//         name: req.body.name,
//         email: req.body.email
//     });
//     chat.save().then(result => {
//         console.log(result);
//         res.json(result);
//     }).catch(err => {
//         console.log(err);
//         res.json(err)
//     })
// })

// app.put('/put:id', (req, res) => {

//     const chat1 = new ChatApp();

//     chat1.name = req.body.name;
//     chat1.Email = req.body.email;
//     console.log(chat1);
//     res.send(chat1);
// });

// app.get('/reset', (req, res) => {
//     res.json({ "reset": "you are on password reset page:" })
// });

// app.post('/signup', (req, res) => {
  
//     ChatApp.find({ email: req.body.email }) // it returns a array.
//         .exec()
//         .then(chatApp => {
//             if (chatApp.length >= 1) {
//                 return res.status(409).send("User already exist")
//             }
//             else {

//                 bcrypt.hash(req.body.password, 10, (error, hash) => {
//                     if (error) {
//                         res.status(500).send(error[0].email.validationError);
//                     }
//                     else {
//                         const newuser = new ChatApp({
//                             // name: req.body.name,
//                             email: req.body.email,
//                             password: hash
//                         });
//                         newuser.save().then(result => {
//                             console.log(result);
//                             res.json("Signup Successfull");
//                         }).catch(err => {
//                            // console.log(err);
//                             res.send(err.errors.email.properties.message)
//                         })
//                     }
//                 });
//             };
//         });
//     })

//     app.post('/login',(req,res)=>{
//         ChatApp.find({email:req.body.email})
//         .exec()
//         .then(user=>{
//             if(user.length<1){
//                 res.status(404).send("User does not exist")
//                // return;
//             }
//             else {
//             //console.log(user[0].password);
//             bcrypt.compare(req.body.password, user[0].password ,(error,result)=>{
//                 if(error){
//                     //console.log(error)
//                     res.status(401).send(error);
//                     return;
//                 }
//                 if(result){
//                    const token= jwt.sign(
//                         {email:user[0].email},
//                         'secret',
//                         {
//                             expiresIn:"1h"
//                         }
//                         )
//                     res.header("pass",token);
//                    // res.send("hello");
//                    return res.status(200).json({
//                       message:"Login successful" ,
//                       Token:token
//                      });
//                 }
//                 return res.status(401).send("Password is incorrect");
//             })
//         }
//         })
//         .catch(error=> res.status(401).send(error));
//     })


//     app.patch('/login/reset',(req,res)=>{

//         const pass=req.header('pass')
//         if(!pass){
//             res.status(401).send("Token not found")
//         }
//         else{
//             jwt.verify(pass,'secret',(error,data)=>{
//                 if (error){
//                     res.status(403).send("could not proceed");
//                     return;
//                 }
//                 if(data){
//                     bcrypt.hash(req.body.newpassword, 10, (error, hash) => {
//                         if (error) {
//                            // console.log(error[0].email.message);
//                             res.status(500).send(error[0].email.validationError);
//                             return;
//                         }
                    
//                     ChatApp.updateOne({email:data.email},{$set:{password:hash}})
//                     .then(result=>{
//                         res.send("Password updated");
//                     })
//                     .catch(error=>{
//                         res.send(error)
//                     })
//                 })
//             }
//         })
//     }
// })

//     app.post('/forgot',(req,res)=>{
//         ChatApp.find({email:req.body.email})
//         .exec()
//         .then(user=>{
//             if(user.length<1){
//                 res.status(404).send("User does not exist")
//                 return;
//             }
//             else{
//                 const token= jwt.sign(
//                      {email:user[0].email},
//                      'secret',
//                      {
//                          expiresIn:"1h"
//                      }
//                      )
//                  //res.header("pass",token);
//                 mail.sendemail(token);
//                return res.status(200).send("Email sent");
//              }
       
//         })

//     })

//     app.patch('/forgot/:tokenId',(req,res)=>{

//         const tokenId=req.params.tokenId;
//         jwt.verify(tokenId,'secret',(error,data)=>{
//             if (error){
//                 res.status(403).send("could not proceed");
//                 return;
//             }
//             if(data){
//                 bcrypt.hash(req.body.newpassword, 10, (error, hash) => {
//                     if (error) {
//                        // console.log(error[0].email.message);
//                         res.status(500).send(error[0].email.validationError);
//                         return;
//                     }
                
//                 ChatApp.updateOne({email:data.email},{$set:{password:hash}})
//                 .then(result=>{
//                     res.send("Password updated");
//                 })
//                 .catch(error=>{
//                     res.send(error)
//                 })
//             })
//         }
//     })

// })



//     module.exports = app
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
//     /*
    
//     const courses=[
//         {id:1,name:"aaa"},
//         {id:2,name:"bbb"},
//         {id:3,name:"ccc"}
//     ];
//     app.get('/h',(req,res)=>{
//         res.send("hello word")
//     });
    
//     app.get('/a',(req,res)=>{
//         res.send([1,3,5]);
//     })
//     app.get('/courses',(req,res)=>{
//         res.send(courses);
//     })
//     app.get('/courses/:id',(req,res)=>{
//         const course=courses.find(c => c.id===parseInt(req.params.id))
//         if(!course){
//             res.status(404).send("Entered Id is not found");
//         }
//         res.send(course);
//     })
//     app.post('/courses',(req,res)=>{
//         const schema={
//            name:Joi.string().min(3).required() 
//         };
//         const result=Joi.validate(req.body,schema);
//         //console.log(result);
    
//         if(result.error){
//             res.status(400).send(result.error.details[0].message);
//             return;
//         }
//         const course={
//             id:courses.length+1,
//             name:req.body.name
//         };
//         courses.push(course);
//         res.send(course);
//     })
    
//     app.put('/courses/:id',(req,res) =>{
//         const course=courses.find(c => c.id===parseInt(req.params.id))
//         if(!course){
//             res.status(404).send("Entered Id is not found");
//         }
//          const {error}=validatecourse(req.body);
//          //console.log(result);
     
//          if(error){
//              res.status(400).send(error.details[0].message);
//              return;
//          }
    
//          course.name=req.body.name;
//          res.send(course);
    
//     })
    
    
//     // app.delete('/courses/:id',(req,res)=>{
//     //     const course=courses.find(c => c.id===parseInt(req.params.id))
//     //     if(!course){
//     //         res.status(404).send("Entered Id is not found");
//     //     }
//     //     const index=courses.indexOf(course);
//     //     courses.splice(index,1);
//     //     res.send(course);
    
//     // })
    
    
//     //const Joi = require('joi');
//     /*
//      validatepassword=(password,email)=> {
//         const schema = Joi.object().keys({
//             email: Joi.string().min(3).required(),
//             password:Joi.string().min(6).required()
//         });
//         return Joi.validate(password,email, schema);
    
//     };
//     */
