const Child = require('../models/child');
const ChildCategory = require('../models/child_category');
const AdoptionFlow = require('../models/adoption_flow');
const User = require('../models/user');
// const { Readable } = require('stream');
const csv = require('csvtojson');
const fs = require('fs');
const createCsvStringifier = require('csv-writer').createObjectCsvStringifier;
const fastcsv = require('fast-csv');
module.exports.create = async function (req, res) {

    // console.log(req.body);
    try {
        // if (req.user.category != 'admin') {
        //     return res.status(200).send("you are not accessed to create child");
        // }
        const childclass = req.body.childClassification.toLowerCase();
        let child = await Child.findOne({ child_id: req.body.child_id });

        let childcategory = await ChildCategory.findOne({ childClassification: childclass })

        if (!childcategory) return res.status(200).send(`${req.body.childClassification} category doesn't exist`);
        if (!child) {
            let child = await Child.create(
                {
                    child_id: req.body.child_id,//required(child_id ===>> caseNumber)
                    state: req.body.state,
                    district: req.body.district,
                    shelterHome: req.body.shelterHome,
                    childName: req.body.childName,
                    linkedWithSAA: req.body.linkedWithSAA,
                    gender: req.body.gender,
                    dateOfBirth: req.body.dateOfBirth,
                    age: req.body.age,
                    childClassification: childclass,//required(abandoned,surrendered.....)
                    recommendedForAdoption: req.body.recommendedForAdoption,
                    inquiryDateOfAdmission: req.body.inquiryDateOfAdmission,
                    reasonForAdmission: req.body.reasonForAdmission,
                    reasonForFlagging: req.body.reasonForFlagging,
                    lastVisit: req.body.lastVisit,
                    lastCall: req.body.lastCall,
                    caseHistory: req.body.caseHistory,
                    caseStatus: req.body.caseStatus,
                    guardianListed: req.body.guardianListed,
                    familyVisitsPhoneCall: req.body.familyVisitsPhoneCall,
                    siblings: req.body.siblings,
                    lastDateOfCWCOrder: req.body.lastDateOfCWCOrder,
                    Lastcwcorder: req.body.Lastcwcorder,
                    lengthOfStayInShelter: req.body.lengthOfStayInShelter,
                    caringsRegistrationNumber: req.body.caringsRegistrationNumber,
                    dateLFA_CSR_MERUploadedInCARINGS: req.body.dateLFA_CSR_MERUploadedInCARINGS,
                    createdByUser: req.body.createdByUser,
                    createdDate: req.body.createdDate,
                    avatar: req.body.avatar,
                    childNote: req.body.childNote
                })
            if (req.body.contact_no) child.contactNo = req.body.contact_no;
            let flow = await AdoptionFlow.findOne({ childClassification: childclass });
            // console.log(flow);
            child.individualAdoptionFlow.majorTask = flow.majorTask;
            // console.log(await AdoptionFlow.findOne({ childClassification: childclass }))
            // console.log(child.individualAdoptionFlow);
            child.save();
            // console.log(child);

            // console.log("ad");
            // console.log(typeof(req.body.worker_alloted))
            // console.log(User.findById(worker_alloted));
            // child.populate('worker_alloted');
            return res.status(200).json({ "response": child });
        } else {
            return res.status(200).send("child already exists");
        }
    } catch (err) {
        return res.status("some error occured in creating the child")
    }
}

module.exports.update_details_child = async function (req, res) {
    try {
        // if (req.user.category != 'admin') {
        //     return res.status(200).send("you are not accessed to update child");
        // }
        const childclass = req.body.childClassification.toLowerCase();
        let child = await Child.findOne({ child_id: req.body.child_id }).select('-uploaded_documents');
        let childcategory = await ChildCategory.findOne({ childClassification: childclass })

        if (!childcategory) return res.status(200).send(`${req.body.childClassification} category doesn't exist`);
        if (child) {
            child.state = req.body.state;
            child.district = req.body.district;
            child.shelterHome = req.body.shelterHome;
            child.childName = req.body.childName;
            child.linkedWithSAA = req.body.linkedWithSAA;
            child.gender = req.body.gender;
            child.dateOfBirth = req.body.dateOfBirth;
            child.age = req.body.age;
            child.recommendedForAdoption = req.body.recommendedForAdoption;
            child.inquiryDateOfAdmission = req.body.inquiryDateOfAdmission;
            child.reasonForAdmission = req.body.reasonForAdmission;
            child.reasonForFlagging = req.body.reasonForFlagging;
            child.lastVisit = req.body.lastVisit;
            child.lastCall = req.body.lastCall;
            child.caseHistory = req.body.caseHistory;
            child.caseStatus = req.body.caseStatus;
            child.guardianListed = req.body.guardianListed;
            child.familyVisitsPhoneCall = req.body.familyVisitsPhoneCall;
            child.siblings = req.body.siblings;
            child.lastDateOfCWCOrder = req.body.lastDateOfCWCOrder;
            child.Lastcwcorder = req.body.Lastcwcorder;
            child.lengthOfStayInShelter = req.body.lengthOfStayInShelter;
            child.caringsRegistrationNumber = req.body.caringsRegistrationNumber;
            child.dateLFA_CSR_MERUploadedInCARINGS = req.body.dateLFA_CSR_MERUploadedInCARINGS;
            child.createdByUser = req.body.createdByUser;
            child.createdDate = req.body.createdDate;
            child.avatar = req.body.avatar;
            child.childNote = req.body.childNote;
            if (req.body.contact_no) child.contactNo = req.body.contact_no;
            if (req.body.childClassification != child.childClassification) {
                child.childClassification = childclass
                child.individualAdoptionFlow.majorTask = await AdoptionFlow.findOne({ childClassification: childclass });
            };
            child.save();
            // child.populate('worker_alloted');
            return res.status(200).json({ response: child });
        } else {
            return res.status(200).send("child not found");

        }
    } catch (err) {
        res.status(200).send("error in updating child details");
    }
}
module.exports.delete_child = async function (req, res) {
    // if (req.user.category != 'admin') {
    //     return res.status(200).send("you are not accessed to delete child. contact to admin");
    // }
    let child = await Child.findOne({ child_id: req.body.child_id })
    if (!child) {
        return res.status(200).send("no child found with given id");
    }
    let worker = User.findById(child.worker_alloted);
    worker.alloted_children.pull(child._id);
    child.remove();
    return res.status(200).send("child deleted");
}


//creation and deletion of child category
module.exports.create_child_category = async function (req, res) {
    // if (req.user.category != 'admin') {
    //     return res.status(200).send("you are not accessed to create child=> contact to admin");
    // }
    try {
        const childclass = req.body.childClassification.toLowerCase();
        const childcategory = await ChildCategory.findOne({ childClassification: childclass })
        if (childcategory) { return res.status(200).send("child category already exist"); }
        const childcateg = await ChildCategory.create({
            childClassification: childclass
        })
        await AdoptionFlow.create({ childClassification: childclass });
        return res.status(200).json({
            response: childcateg
        })
    } catch (err) {
        res.status(200).send("error in creating child category");
    }


}
module.exports.delete_child_category = async function (req, res) {
    try {
        const childclass = req.body.childClassification.toLowerCase();
        let childcateg = await ChildCategory.findOneAndDelete({ childClassification: childclass });
        let adoptflow = await AdoptionFlow.findOneAndDelete({ childClassification: childclass })

        return res.status(200).send("child-category deleted successfully");
    } catch (err) {
        return res.status(200).send("error in deleting child category");
    }


}

module.exports.get_child_category = async function (req, res) {
    try {
        let child_category = await ChildCategory.find({});
        return res.status(200).json({
            response: child_category
        })
    } catch (err) {
        return res.status(200).send("error in getting child category");
    }
}

//adoption flow status update
module.exports.statusUpdate = async function (req, res) {
    try {
        let child = await Child.findOne({ child_id: req.body.child_id });
        // let minorTaskStatus = req.body.minorTaskStatus;
        // let majorTaskPosition = req.body.majorTaskPosition;
        // let minorTaskPosition = req.body.minorTaskPosition;
        // let majorStatus = child.individualAdoptionFlow.majorTask[majorTaskPosition];
        // majorStatus.minorTask[minorTaskPosition].minorTaskStatus = minorTaskStatus;
        // let flag = 0;
        // for (let u of majorStatus.minorTask) {
        //     if (u.minorTaskStatus == 1) {
        //         majorStatus.majorTaskStatus = 1;
        //     }
        //     if (u.minorTaskStatus == 0 || u.minorTaskStatus == 1) {
        //         flag = 1;
        //     }
        // }
        // if (!flag && majorStatus.minorTask.length) {
        //     majorStatus.majorTaskStatus = 2;
        // }
        // child.save();
        // return res.status(200).json({
        //     response: child
        // })
        let status_object = req.body.statusObject;
        let curr_major = 0;
        for (let u of status_object) {
            let curr_minor = 0;
            let flag = 0;
            if (u.minorTask.length == 0) break;
            for (let minor of u.minorTask) {
                if (minor.minorTaskStatus == 2) {
                    if (!u.start_time) u.start_time = new Date();
                    curr_minor = curr_minor + 1;
                    u.majorTaskStatus = 1;
                }
                if (minor.minorTaskStatus == 0 || minor.minorTaskStatus == 1) {
                    flag = 1;
                }
            }
            if (curr_minor > 0) {
                child.caseStatus = "inprogress"
            }
            u.currMinorTask = curr_minor;
            // u.save();
            if (!flag) {
                u.majorTaskStatus = 2;
                curr_major = curr_major + 1;
                if (!u.end_time) u.end_time = new Date();

            } else break;
        }
        // status_object.save();
        child.individualAdoptionFlow.currMajorTask = curr_major;
        child.individualAdoptionFlow.majorTask = status_object;
        if (curr_major == status_object.length) child.caseStatus = "completed";
        child.save();

        if (curr_major && !child.individualAdoptionFlow.majorTask[curr_major - 1].end_time) child.individualAdoptionFlow.majorTask[curr_major - 1].end_time = new Date();
        return res.status(200).json({
            response: child
        })

    } catch (err) {
        return res.status(200).send("error in updating the status")
    }

}

module.exports.getChildbyId = async function (req, res) {
    try {
        let child = await Child.findOne({ child_id: req.body.child_id }).populate('worker_alloted').select('-uploaded_documents');
        res.status(200).json({
            response: child
        })
    } catch (err) {
        return res.status(200).send("error in getting child by id");
    }
}




module.exports.upload = async function (req, res) {
    try {
        let child = await Child.findOne({ child_id: req.body.child_id });
        let docData = {
            name: req.file.originalname,
            data: req.file.buffer
        }
        child.uploaded_documents.push(docData);
        child.save();
        return res.status(200).send("file uploaded successfully");
    } catch (err) {
        console.log(err);
        return res.status(200).send("error in uploading files");
    }
}


module.exports.download = async function (req, res) {
    try {
        let child = await Child.findOne({ child_id: req.body.child_id });
        let docId = req.body.docId;
        // let file = child.uploaded_documents;
        // console.log(child);
        let file;
        for (let u of child.uploaded_documents) {
            if (u._id == docId) {
                file = u;
                break;
            }
        }
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="${file.name}"`);
        return res.status(200).send(file);
        // const fileStream = new Readable();
        // fileStream.push(file.data);
        // fileStream.push(null);

        // // Pipe the file stream to the response stream
        // fileStream.on('error', (err) => {
        //     console.error('Error reading file stream:', err);
        //     res.status(200).json({ error: 'Failed to read file stream' });
        // });
        // fileStream.pipe(res);

    } catch (err) {
        console.log(err);
        return res.status(200).send("error in downloading files");
    }
}


module.exports.deleteFile = async function (req, res) {
    try {
        let child = await Child.findOne({ child_id: req.body.child_id });
        let docId = req.body.docId;
        if (child.uploaded_documents.length == 0) {
            return res.status(200).send("there is no file to delete");
        }
        let file;
        for (let u of child.uploaded_documents) {
            if (u._id == docId) {
                file = u;
                break;
            }
        }
        if (file == null) return res.status(200).send("not able to fetch the file");
        child.uploaded_documents.pull(file);
        child.save();
        return res.status(200).send("document deleted successfuly");
    } catch (err) {
        console.log(err);
        return res.status(200).send("error in deleting the file");
    }

}

module.exports.imageUpload = async function (req, res) {
    try {
        let child = await Child.findOne({ child_id: req.body.child_id });
        if (!child) return res.status(200).send("child doesn't exists");
        child.avatar = req.file.buffer;
        child.save();
        return res.status(200).send("file uploaded successfully");
    } catch (err) {
        console.log(err);
        return res.status(200).send("error in uploading image");

    }
}


module.exports.getImage = async function (req, res) {
    try {
        let child = await Child.findOne({ child_id: req.body.child_id });
        if (child.avatar) {
            return res.status(200).json({
                response: child.avatar
            })
        }
        else {
            return res.status(200).send("avatar is not uploaded yet");
        }
    } catch (err) {
        console.log(err);
        return res.status(200).send("error in getting image");
    }
}


module.exports.deleteImage = async function (req, res) {
    try {
        let child = await Child.findOne({ child_id: req.body.child_id });
        child.avatar = null;
        child.save();
        return res.status(200).send("profile image deleted successfully");
    } catch (err) {
        console.log(err);
        return res.status(200).send("error in deleting the image");
    }
}


module.exports.getDocuments = async function (req, res) {
    try {
        let child = await Child.findOne({ child_id: req.body.child_id });
        const modifiedResponse = child.uploaded_documents.map((item) => {
            return {
                name: item.name,
                docId: item._id,
            };
        });
        if (child) {
            return res.status(200).json({
                response: modifiedResponse
            })
        } else return res.status(200).send("child doesn't exists");
    } catch (err) {
        console.log(err);
        return res.status(200).send("error in getting documents");
    }
}

const columnMappings = {
    csvChildId: 'Case Number',
    csvState: 'State',
    csvDistrict: 'District',
    csvShelterHome: 'Shelter Home',
    csvChildName: 'Child Name',
    csvLinkedWithSAA: 'Linked with SAA',
    csvGender: 'Gender',
    csvDateOfBirth: 'Date of Birth',
    csvAge: 'Age',
    csvChildClassification: 'Child Classification',
    csvRecommendedForAdoption: 'Recommended For Adoption Inquiry',
    csvInquiryDateOfAdmission: 'Date of Admission',
    csvReasonForAdmission: 'Reason for Admission',
    csvReasonForFlagging: 'Reason for Flagging',
    csvLastVisit: 'Last Visit Since',
    csvLastCall: 'Last Call Since',
    csvCaseHistory: 'Case History',
    csvGuardianListed: 'Guardian listed',
    csvFamilyVisitsPhoneCall: 'Family Visits /Phone Call',
    csvSiblings: 'Siblings',
    csvLastDateOfCWCOrder: 'Last Date of CWC Order or Review',
    csvLastcwcorder: 'Last CWC Order',
    csvLengthOfStayInShelter: 'Length of stay in the shelter',
    csvCaringsRegistrationNumber: 'CARINGS Registration Number',
    csvDateLFA_CSR_MERUploadedInCARINGS: 'Date the LFA,CSR,MER Uploaded in CARINGS',
    csvCreatedByUser: 'Created by User',
    csvCreatedDate: 'Created Date'
};



module.exports.bulkUpload = async function (req, res) {
    try {
        const results = [];
        const fileBuffer = req.file.buffer;
        const fileContents = fileBuffer.toString();
        let uploadFailed = [];
        const csvData = await csv({
            delimiter: ',',
            noheader: false,
            trim: true,
        }).fromString(fileContents);

        for (const row of csvData) {
            if (row[columnMappings.csvChildId]) {
                if (row[columnMappings.csvChildClassification]) {
                    let prevChild = await Child.findOne({ child_id: row[columnMappings.csvChildId] })
                    if (prevChild) {
                        continue;
                    }
                    const childclass = row[columnMappings.csvChildClassification].toLowerCase();
                    let i = await ChildCategory.findOne({ childClassification: childclass });
                    // console.log(i);
                    if (i) {
                        const childData = {
                            child_id: row[columnMappings.csvChildId] || undefined,
                            state: row[columnMappings.csvState] || undefined,
                            district: row[columnMappings.csvDistrict] || undefined,
                            shelterHome: row[columnMappings.csvShelterHome] || undefined,
                            childName: row[columnMappings.csvChildName] || undefined,
                            linkedWithSAA: row[columnMappings.csvLinkedWithSAA] || undefined,
                            gender: row[columnMappings.csvGender] || undefined,
                            dateOfBirth: row[columnMappings.csvDateOfBirth] || undefined,
                            age: row[columnMappings.csvAge] || undefined,
                            childClassification: i.childClassification || undefined,
                            recommendedForAdoption: row[columnMappings.csvRecommendedForAdoption] || undefined,
                            inquiryDateOfAdmission: row[columnMappings.csvInquiryDateOfAdmission] || undefined,
                            reasonForAdmission: row[columnMappings.csvReasonForAdmission] || undefined,
                            reasonForFlagging: row[columnMappings.csvReasonForFlagging] || undefined,
                            lastVisit: row[columnMappings.csvLastVisit] || undefined,
                            lastCall: row[columnMappings.csvLastCall] || undefined,
                            caseHistory: row[columnMappings.csvCaseHistory] || undefined,
                            guardianListed: row[columnMappings.csvGuardianListed] || undefined,
                            familyVisitsPhoneCall: row[columnMappings.csvFamilyVisitsPhoneCall] || undefined,
                            siblings: row[columnMappings.csvSiblings] || undefined,
                            lastDateOfCWCOrder: row[columnMappings.csvLastDateOfCWCOrder] || undefined,
                            Lastcwcorder: row[columnMappings.csvLastcwcorder] || undefined,
                            lengthOfStayInShelter: row[columnMappings.csvLengthOfStayInShelter] || undefined,
                            caringsRegistrationNumber: row[columnMappings.csvCaringsRegistrationNumber] || undefined,
                            dateLFA_CSR_MERUploadedInCARINGS: row[columnMappings.csvDateLFA_CSR_MERUploadedInCARINGS] || undefined,
                            createdByUser: row[columnMappings.csvCreatedByUser] || undefined,
                            createdDate: row[columnMappings.csvCreatedDate] || undefined,
                        };

                        //   console.log(childData);

                        const child = await Child.create(childData)
                        if (req.body.contact_no) child.contactNo = req.body.contact_no;
                        let childcategory = childData.childClassification.toLowerCase();
                        let flow = await AdoptionFlow.findOne({ childClassification: childcategory });
                        // console.log(flow);
                        child.individualAdoptionFlow.majorTask = flow.majorTask;
                        // console.log(await AdoptionFlow.findOne({ childClassification: childclass }))
                        // console.log(child.individualAdoptionFlow);
                        child.save();
                    } else {
                        uploadFailed.push({
                            reason: 'this child category does not exist',
                            row: row
                        })
                    }
                } else {
                    uploadFailed.push({
                        reason: 'child category is not present in csv',
                        row: row
                    })
                }
            }
            else {
                uploadFailed.push({
                    reason: 'Case number is not present',
                    row: row
                })
            }
        }

        res.status(200).json({ message: uploadFailed });
    } catch (err) {
        console.log(err);
        return res.status(200).send('Error in bulk uploading');
    }
};



module.exports.csvDownload = async function (req, res) {
    try {
        let children = await Child.find({})
            .populate({
                path: 'worker_alloted',
                select: 'name'
            })
            .select('-avatar -childNote -uploaded_documents');

        const csvData = [];
        const header = [
            'Case Number',
            'State',
            'District',
            'Shelter Home',
            'Child Name',
            'Linked with SAA',
            'Gender',
            'Date of Birth',
            'Age',
            'Child Classification',
            'Recommended for Adoption',
            'Inquiry Date of Admission',
            'Reason for Admission',
            'Reason for Flagging',
            'Last Visit',
            'Last Call',
            'Case History',
            'Case Status',
            'Guardian Listed',
            'Family Visits Phone Call',
            'Siblings',
            'Last Date of CWC Order',
            'Last CWC Order',
            'Length of Stay in Shelter',
            'CARINGS Registration Number',
            'Date the LFA,CSR,MER Uploaded in CARINGS',
            'Created By User',
            'Created Date',
            'Contact No',
            'Worker Allotted',
            'Adoption Task completed'
        ];
        csvData.push(header);

        children.forEach(child => {
            const completedMajorTaskStatements = [];
            // console.log(child.individualAdoptionFlow);
            const majorTasks = child.individualAdoptionFlow.majorTask ? child.individualAdoptionFlow.majorTask : [];
            majorTasks.forEach(majorTask => {
                if (majorTask.majorTaskStatus === 2) {
                    completedMajorTaskStatements.push(majorTask.majorTaskStatement);
                }
            });

            const record = [
                child.child_id,
                child.state,
                child.district,
                child.shelterHome,
                child.childName,
                child.linkedWithSAA,
                child.gender,
                child.dateOfBirth,
                child.age,
                child.childClassification,
                child.recommendedForAdoption,
                child.inquiryDateOfAdmission,
                child.reasonForAdmission,
                child.reasonForFlagging,
                child.lastVisit,
                child.lastCall,
                child.caseHistory,
                child.caseStatus,
                child.guardianListed,
                child.familyVisitsPhoneCall,
                child.siblings,
                child.lastDateOfCWCOrder,
                child.Lastcwcorder,
                child.lengthOfStayInShelter,
                child.caringsRegistrationNumber,
                child.dateLFA_CSR_MERUploadedInCARINGS,
                child.createdByUser,
                child.createdDate,
                child.contactNo,
                child.worker_alloted ? child.worker_alloted.name : '',
                completedMajorTaskStatements.join(', ')
            ];
            csvData.push(record);
        });

        const csvStream = fastcsv.format({ headers: true }).transform(row => row.map(value => value === undefined ? '' : value));

        res.setHeader('Content-Disposition', 'attachment; filename=child_details.csv');
        res.set('Content-Type', 'text/csv');

        csvStream.pipe(res);
        csvData.forEach(data => csvStream.write(data));
        csvStream.end();

    } catch (err) {
        console.log(err);
        return res.status(200).send('Error in downloading CSV file of children');
    }
};

module.exports.getadoptionbychildid = async function (req, res) {
    try {
        let adoptionflowchild = await Child.findById(req.body.child_id).select('individualAdoptionFlow');
        return res.status(200).json({
            response: adoptionflowchild
        })
    } catch (err) {
        return res.status(200).send("error in sending individual adoption flow");
    }
}

module.exports.getChildNote=async function(req,res){
    try{
        let child=await Child.findOne({child_id:req.body.child_id});
        return res.status(200).json({
            response:child.childNote
        })
    }catch(err){
        return res.status(200).send("error in getting the child note");
    }
}
module.exports.updateChildNote=async function(req,res){
    try{
        let child=await Child.findOne({child_id:req.body.child_id});
        child.childNote=req.body.note;
        await child.save();
        return res.status(200).json({
            response:child.childNote
        })
    }catch(err){
        return res.status(200).send("error in getting the child note");
    }
}
