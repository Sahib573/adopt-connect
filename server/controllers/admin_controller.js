const User = require('../models/user');
const Child = require('../models/child');
const Message=require('../models/message');
const mongoose = require('mongoose');

module.exports.getAllAdmin = async function (req, res) {
    try {
        let alladmin = await User.find({}).populate('alloted_children');

        res.status(200).json({
            response: alladmin
        })
    } catch (err) {
        return res.status(200).send("error in sending all admins");
    }
}

module.exports.getAllAdmin2 = async function (req, res) {
  try {
      let allworkers = await User.find({}).select('user_id name category email')

      // allworkers.populate('alloted_children')
      res.status(200).json({
          response: allworkers
      })
  } catch (err) {
      res.status(200).send("error in finding all workers");
  }

}
module.exports.getAllWorkers = async function (req, res) {
    try {
        let allworkers = await User.find({ category: "worker" }).populate('alloted_children');

        // allworkers.populate('alloted_children')
        res.status(200).json({
            response: allworkers
        })
    } catch (err) {
        res.status(200).send("error in finding all workers");
    }

}
module.exports.getAllWorkers2 = async function (req, res) {
    try {
        let allworkers = await User.find({ category: "worker" }).select('user_id name category email')

        // allworkers.populate('alloted_children')
        res.status(200).json({
            response: allworkers
        })
    } catch (err) {
        res.status(200).send("error in finding all workers");
    }

}
// module.exports.getAllCaseManagers = async function (req, res) {
//     try {
//         let allmanagers = await User.find({ category: "manager" }).populate('alloted_children');

//         // allworkers.populate('alloted_children')
//         res.status(200).json({
//             response: allmanagers
//         })
//     } catch (err) {
//         res.status(200).send("error in finding all managers");
//     }

// }
module.exports.getAllChild = async function (req, res) {
    try {
        let allchild = await Child.find({}).populate('worker_alloted');

        // allchild.populate('worker_alloted');
        res.status(200).json({
            response: allchild
        })
    } catch (err) {
        console.log(err);
        res.status(200).send("error in sending all childs");
    }
}
module.exports.getAllChild2 = async function (req, res) {
    try {
        let allchild = await Child.find({}).select('child_id childName childClassification caseStatus shelterHome gender');

        // allchild.populate('worker_alloted');
        res.status(200).json({
            response: allchild
        })
    } catch (err) {
        console.log(err);
        res.status(200).send("error in sending all childs");
    }
}
//request coming from admin/case-manager from worker profile
module.exports.addChildtoWorker = async function (req, res) {
    try {
        let child = await Child.findOne({ child_id: req.body.child_id });
        let worker = await User.findOne({ user_id: req.body.user_id });
        if (!worker.alloted_children.includes(child._id)) {

            worker.alloted_children.push(child._id);
            worker.save();
            // console.log(child.worker_alloted);
            let prevWorker = await User.findById(child.worker_alloted);
            // console.log(prevWorker)
            if (prevWorker) {

                prevWorker.alloted_children.pull(child._id);
                prevWorker.save();
                // console.log(prevWorker)
                child.worker_alloted = worker._id;
            } else {
                child.worker_alloted = worker._id;
                // console.log(child.worker_alloted)
            }
            child.save();
            // console.log(child.worker_alloted);


        }
        return res.status(200).json({ response: worker });
    } catch (err) {
        return res.status(200).send("erorr in adding child");
    }
}

module.exports.deleteChildfromWorker = async function (req, res) {
    try {
        let child = await Child.findOne({ child_id: req.body.child_id });
        let worker = await User.findOne({ user_id: req.body.user_id });
        worker.alloted_children.pull(child._id);
        // await Child.findByIdAndUpdate(child._id, { $unset: { worker_alloted: 1 } }, { new: true })
        child.worker_alloted = null;
        worker.save();
        // child.worker_alloted=mongoose.Types.ObjectId();
        child.save();
        return res.status(200).json({
            response: worker
        })
    } catch (err) {
        console.log(err);

        return res.status(200).send("error in deleting child from worker");
    }
}


module.exports.createMessage=async function(req,res){
    try{
        let message=await Message.create({
            from_user:req.body.from_user_id,
            to_user:req.body.to_user_id,
            content:req.body.content
        });
        return res.status(200).send({
            response:message
        })
    }catch(err){
        return res.status(200).send("error in creating message");
    }
}

module.exports.updateMessage=async function(req,res){
    try{
        let messageId=req.body.messageId;
        let message=await Message.findById(messageId);
        if(message.seen==1){
            return res.status(200).send("message already seen");
        }else{
            message.content=req.body.content;
            message.save();
        }
        return res.status(200).json({
            response:message
        })
    }catch(err){
        return res.status(200).send("error in updating message");
    }
}
module.exports.deleteMessage=async function(req,res){
    try{
        let messageId=req.body.messageId;
        let message=await Message.findByIdAndDelete(messageId);
        return res.status(200).send("message deleted");
    }catch(err){
        return res.status(200).send("error in deleting the messages");
    }
}

module.exports.getMessagebyAdmin=async function(req,res){
    try{
        let messages = await Message.find({ from_user: req.body.from_user_id }).populate({
            path: 'from_user to_user',
            select: 'name category'
        });
        return res.status(200).json({
            response: messages
        })
    }catch(err){
        console.log(err);
        return res.status(200).send("error in getting messages of admin");
    }
}

module.exports.getAnalytics=async function(req,res){
    try{
        let ageratio=await Child.aggregate([
            {
              $group: {
                _id: {
                  $switch: {
                    branches: [
                      { case: { $lte: ['$age', 5] }, then: '0-5' },
                      { case: { $lte: ['$age', 10] }, then: '6-10' },
                      { case: { $lte: ['$age', 15] }, then: '11-15' },
                      { case: { $lte: ['$age', 18] }, then: '16-18' }
                    ],
                    default: 'Age Not Mentioned' 
                  }
                },
                count: { $sum: 1 }   
              }
            },
            {
              $project: {
                _id: 0,
                ageGroup: '$_id',
                count: 1
              }
            }
          ])
          let ageDistribution={
                labels:ageratio.map(entry => entry.ageGroup),
                values:ageratio.map(entry => entry.count)
          }
          let genderratio=await Child.aggregate([
            {
              $group: {
                _id: {$toLower: '$gender'},
                count: { $sum: 1 }   
              }
            },
            {
              $project: {
                _id: 0,
                gender:'$_id',
                count: 1
              }
            }
          ]);
          let genderDistribution={
            labels:genderratio.map(entry => entry.gender),
            values:genderratio.map(entry => entry.count)
          }
          let geographicratioDistrict=await Child.aggregate([
            {
              $group: {
                _id: '$district',  
                count: { $sum: 1 }  
              }
            },
            {
              $project: {
                _id: 0,
                district: '$_id',
                count: 1
              }
            }
          ]);
         let geographicDistributionDistrict={
            labels:geographicratioDistrict.map(entry => entry.district),
            values:geographicratioDistrict.map(entry => entry.count)
          }
          let geographicratioState=await Child.aggregate([
            {
              $group: {
                _id: '$state', 
                count: { $sum: 1 }  
              }
            },
            {
              $project: {
                _id: 0,
                state: '$_id',
                count: 1
              }
            }
          ]);
          let geographicDistributionState={
            labels:geographicratioState.map(entry => entry.state),
            values:geographicratioState.map(entry => entry.count)
          }
          let workerratio=await User.aggregate([
            {
              $group: {
                _id: '$category',
                count: { $sum: 1 } 
              }
            },
            {
              $project: {
                _id: 0,
                category: '$_id',
                count: 1
              }
            }
          ]);
          let workerRatio={
labels:workerratio.map(entry => entry.category),
values:workerratio.map(entry => entry.count)
          }
          let ShelterHomeratio=await Child.aggregate([
            {
              $group: {
                _id: '$shelterHome', 
                count: { $sum: 1 }   
              }
            },
            {
              $project: {
                _id: 0,
                shelterHome: '$_id',
                count: 1
              }
            }
          ]);
          let ShelterHomeRatio={
labels:ShelterHomeratio.map(entry => entry.shelterHome),
values:ShelterHomeratio.map(entry => entry.count)
          }
          let childClassificationratio=await Child.aggregate([
            {
              $group: {
                _id: '$childClassification',
                count: { $sum: 1 }  
              }
            },
            {
              $project: {
                _id: 0,
                childClassification: '$_id',
                count: 1
              }
            }
          ]);
          let childClassificationRatio={
            labels:childClassificationratio.map(entry => entry.childClassification),
            values:childClassificationratio.map(entry => entry.count)
          }
          let Adoptionsuccess=await Child.aggregate([
            {
              $group: {
                _id: null,
                completedCount: {
                  $sum: {
                    $cond: [{ $eq: ['$caseStatus', 'completed'] }, 1, 0]
                  }
                },
                totalCount: { $sum: 1 }
              }
            },
            {
              $project: {
                _id: 0,
                completedCount: 1,
                totalCount: 1
              }
            }
          ]);
          let AdoptionSuccess={
            labels:Adoptionsuccess[0].completedCount,
            values:Adoptionsuccess[0].totalCount
          }
          let ratioCasestatus=await Child.aggregate([
            {
              $group: {
                _id: '$caseStatus',   
                count: { $sum: 1 }   
              }
            },
            {
              $project: {
                _id: 0,
                caseStatus: '$_id',
                count: 1
              }
            }
          ]);
          let ratioCaseStatus={
            labels:ratioCasestatus.map(entry => entry.caseStatus),
            values:ratioCasestatus.map(entry => entry.count)
          }
          let childStatusShelterhome=await Child.aggregate([
            {
              $match: {
                caseStatus: 'completed' 
              }
            },
            {
              $group: {
                _id: '$shelterHome',  
                count: { $sum: 1 }   
              }
            },
            {
              $project: {
                _id: 0,
                shelterHome: '$_id',
                count: 1
              }
            }
          ]);
          let childStatusShelterHome={
            labels:childStatusShelterhome.map(entry => entry.shelterHome),
            values:childStatusShelterhome.map(entry => entry.count)
          }
          return res.status(200).json({
            response:{
                ageDistribution,
                genderDistribution,
                geographicDistributionDistrict,
                geographicDistributionState,
                workerRatio,
                ShelterHomeRatio,
                childClassificationRatio,
                AdoptionSuccess,
                ratioCaseStatus,
                childStatusShelterHome
            }
          })
    }catch(err){
        console.log(err);
        return res.status(200).send("error in getting analytics");
    }
}