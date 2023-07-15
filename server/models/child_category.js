const mongoose=require('mongoose');
const path=require('path');


const childcategorySchema=mongoose.Schema({
    childClassification:{
        type:String,
        required:true
    }
    
},{
    timestamps:true
});


const ChildCategory=mongoose.model('ChildCategory',childcategorySchema);
module.exports=ChildCategory;