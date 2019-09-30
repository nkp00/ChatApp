const mongoose = require('mongoose');
// const Schema = mongoose.Schema();
const chatappSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email: { 
        type: String, 
        required: true, 
        //unique: true 
    },
    password: { type:String,hide:true, required: true,min: 4},
    timestamp:{type:Date}
});
const messageSchema=mongoose.Schema({
    message:{
        type:String
    }
})

module.exports = mongoose.model('ChatApp', chatappSchema)
//module.exports=mongoose.model('Message',messageSchema)