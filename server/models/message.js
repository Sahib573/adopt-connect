const mongoose=require('mongoose');
// const path=require('path');
// const { buffer } = require('stream/consumers');


const messageSchema=mongoose.Schema({
    from_user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    to_user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    content:{
        type:String,
        required:true
    },
    seen:{
        type:Number,
        default:0
    }
    
},{
    timestamps:true
});


const Message=mongoose.model('Message',messageSchema);
module.exports=Message;