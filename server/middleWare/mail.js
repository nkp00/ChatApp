var nodemailer = require('nodemailer');
var sendemail=(token)=>{
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'neerajkp501@gmail.com',
    pass: "05021997"
  }
});

var mailOptions = {
  from: 'neerajkp501@gmail.com',
  to: 'neerajkp501@gmail.com',
  subject: 'Forgot password request',
  text: `Hello, please open the following link to proceed \nhttp://localhost:3000/#!/forgot/${token}`
};

transporter.sendMail(mailOptions, (error, info)=>{
     
  if (error) {
        console.log(error);
      } 
      else {
        console.log('Email sent: ' + info.response);
        // return true;
      }

   }); 
}


module.exports={sendemail}