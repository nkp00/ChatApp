const jwt=require('jsonwebtoken');

exports.generateToken=(email)=>{
    const token= jwt.sign(
        {email},
        'secret',
        {
            expiresIn:"1h"
        }
    )
    return token;
}
exports.verifyToken=(pass,callback)=>{

    jwt.verify(pass,'secret',(error,data)=>{
        if (error){
            callback(error);
        }
        if(data){   
            callback(null,data);
        }
    })
}

