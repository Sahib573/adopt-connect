const mongoose=require('mongoose');
const path=require('path');

const adoptionFlowSchema=mongoose.Schema({
    childClassification:{
        type:String,
        required:true,
        unique:true
    },
    majorTask:[
        {
            start_time:{
                type:Date
            },
            end_time:{
                type:Date
            },
            majorTaskStatement:{
                type:String
            },
            majorTaskStatus:{
                type:Number,
                default:0
            },
            majorTaskNote:{
                type:String
            },
            iterationMethod:{
                type:String,
            },
            currMinorTask:{
                type:Number,
                default:0
            },
            minorTask:[
                {
                    minorTaskStatement:{
                        type:String
                    },
                    minorTaskStatus:{
                        type:Number,
                        default:0
                    },
                    minorTaskNote:{
                        type:String
                    }
                }
            ]

        }
    ]
    
},{
    timestamps:true
});


const AdoptionFlow=mongoose.model('AdoptionFlow',adoptionFlowSchema);
module.exports=AdoptionFlow;