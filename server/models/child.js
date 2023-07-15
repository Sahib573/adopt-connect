const mongoose = require('mongoose');
const path = require('path');

const childSchema = mongoose.Schema({
    child_id: {
        type: String, 
        unique: true,
        required:true
    },
    state: {
        type: String
    },
    district: {
        type: String
    },
    shelterHome: {
        type: String
    },
    childName: {
        type: String
    },
    linkedWithSAA: {
        type: String
    },
    gender: {
        type: String
    },
    dateOfBirth: {
        type: String
    },
    age: {
        type: String
    },
    childClassification: {
        type: String,
        required:true
    },
    recommendedForAdoption: {
        type: String
    },
    inquiryDateOfAdmission: {
        type: String
    },
    reasonForAdmission: {
        type: String
    },
    reasonForFlagging: {
        type: String
    },
    lastVisit: {
        type: String
    },
    lastCall: {
        type: String
    },
    caseHistory: {
        type: String
    },
    caseStatus: {
        type: String,
        default:'inactive'
    },
    guardianListed: {
        type: String
    },
    familyVisitsPhoneCall: {
        type: String
    },
    siblings: {
        type: String
    },
    lastDateOfCWCOrder: {
        type: String
    },
    Lastcwcorder: {
        type: String
    },
    lengthOfStayInShelter: {
        type: String
    },
    caringsRegistrationNumber: {
        type: String
    },
    dateLFA_CSR_MERUploadedInCARINGS: {
        type: String
    },
    createdByUser: {
        type: String
    },
    createdDate: {
        type: String
    },

    contactNo: 
        {
            type: Number
        }
    ,
    worker_alloted: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    avatar: {
        type: Buffer
    },
    childNote:{
        type:String
    },
    individualAdoptionFlow:{
        currMajorTask:{
            type:Number,
            default:0
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
    },
    uploaded_documents:[
        {
        name: String,
        data: Buffer
    }]

}, {
    timestamps: true
});


const Child = mongoose.model('Child', childSchema);
module.exports = Child;