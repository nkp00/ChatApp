const mongoose = require('mongoose');
const chatSchema = mongoose.Schema({
    sender:{
        type:String,
        required:true,
    },
    receiver: { 
        type: String, 
        required: true, 
        //unique: true 
    },
    chatHistory:[ {message: { type:String}}]
  
});


module.exports = mongoose.model('Message', chatSchema)
