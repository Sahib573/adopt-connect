const AdoptionFlow = require('../models/adoption_flow');
const ChildCategory = require('../models/child_category');

//for major tasks
module.exports.createMajorTask = async function (req, res) {
    try {
        const childclass = await ChildCategory.findOne({ childClassification: req.body.childClassification });
        if (!childclass) return res.status(200).send("first, create the new child category ");

        let majorTaskPosition = parseInt(req.body.majorTaskPosition);
        let major_task_statement = req.body.majorTaskStatement;
        let major_task_note=req.body.majorTaskNote;
        let iteration_method=req.body.iterationMethod;

        let adoption_flow = await AdoptionFlow.findOne({ childClassification: req.body.childClassification });
        let insertstatement = {
            majorTaskStatement: major_task_statement,
            majorTaskNote: major_task_note,
            iterationMethod:iteration_method
        }
        if (adoption_flow.majorTask.length) {
            adoption_flow.majorTask.splice(majorTaskPosition, 0, insertstatement);
        } else {
            adoption_flow.majorTask.push(insertstatement);
        }
        adoption_flow.save();
        return res.status(200).json({
            response: adoption_flow
        })
    } catch (err) {
        return res.status(200).send("error in creating the new major task");
    }
}


module.exports.deleteMajorTask = async function (req, res) {
    try {
        const childclass = await ChildCategory.findOne({ childClassification: req.body.childClassification });
        if (!childclass) return res.status(200).send("first, create the new child category ");

        let delete_position = parseInt(req.body.deletePosition);
        let adoption_flow = await AdoptionFlow.findOne({ childClassification: req.body.childClassification });
        adoption_flow.majorTask.splice(delete_position,1);
        adoption_flow.save();
        return res.status(200).send("major task deleted");
    } catch (err) {
        return res.status.send("error in deleting the major task");
    }
}


module.exports.updateMajorTask=async function(req,res){
    try{
        const childclass = await ChildCategory.findOne({ childClassification: req.body.childClassification });
        if (!childclass) return res.status(200).send("first, create the new child category ");

        let update_position=parseInt(req.body.majorTaskPosition);
        let update_statement=req.body.majorTaskStatement;
        let update_note=req.body.majorTaskNote;
        let update_iteration_method=req.body.iterationMethod;

        let adoption_flow = await AdoptionFlow.findOne({ childClassification: req.body.childClassification });
        adoption_flow.majorTask[update_position].majorTaskStatement=update_statement;
        adoption_flow.majorTask[update_position].majorTaskNote=update_note;
        adoption_flow.majorTask[update_position].iterationMethod=update_iteration_method;
        adoption_flow.save();
        return res.status(200).json({
            response:adoption_flow
        })
    }catch(err){
        return res.status(200).send("error in updating major task");
    }
}

//for minor tasks
module.exports.createMinorTask=async function(req,res){
    try{
        const childclass = await ChildCategory.findOne({ childClassification: req.body.childClassification });
        if (!childclass) return res.status(200).send("first, create the new child category ");
        let majorTaskPosition = parseInt(req.body.majorTaskPosition);
        let minorTaskPosition = parseInt(req.body.minorTaskPosition);
        let minor_task_statement = req.body.minorTaskStatement;
        let minor_task_note=req.body.minorTaskNote;

        let adoption_flow = await AdoptionFlow.findOne({ childClassification: req.body.childClassification });
        // console.log(adoption_flow);
        // console.log("major task",adoption_flow.majorTask);
        let major_flow=adoption_flow.majorTask[majorTaskPosition];
        // console.log("position")
        // console.log(major_flow);
        let insertstatement={
            minorTaskStatement:minor_task_statement,
            minorTaskNote:minor_task_note
        }
        let minor_flow=major_flow.minorTask;
        // console.log(minor_flow);
        if (minor_flow.length) {
            minor_flow.splice(minorTaskPosition, 0, insertstatement);
        } else {
            minor_flow.push(insertstatement);
        }
        // minor_flow.save();
        // major_flow.save();
        adoption_flow.save();
        return res.status(200).json({
            response:adoption_flow
        })
    }catch(err){
        console.log(err);
        return res.status(200).send("error in creating minor task");
    }
}


module.exports.updateMinorTask=async function(req,res){
    try{
        const childclass = await ChildCategory.findOne({ childClassification: req.body.childClassification });
        if (!childclass) return res.status(200).send("first, create the new child category ");
        let majorTaskPosition = parseInt(req.body.majorTaskPosition);
        let minorTaskPosition = parseInt(req.body.minorTaskPosition);
        let update_statement=req.body.minorTaskStatement;
        let update_note=req.body.minorTaskNote;

        let adoption_flow = await AdoptionFlow.findOne({ childClassification: req.body.childClassification });

        adoption_flow.majorTask[majorTaskPosition].minorTask[minorTaskPosition].minorTaskStatement=update_statement;
        adoption_flow.majorTask[majorTaskPosition].minorTask[minorTaskPosition].minorTaskNote=update_note;
        adoption_flow.save();
        
        return res.status(200).json({
            response:adoption_flow
        })
    }catch(err){
        return res.status(200).send("error in updating minor task");
    }
}
module.exports.deleteMinorTask=async function(req,res){
    try{
        const childclass = await ChildCategory.findOne({ childClassification: req.body.childClassification });
        if (!childclass) return res.status(200).send("first, create the new child category ");
        let majorTaskPosition = parseInt(req.body.majorTaskPosition);
        let minorTaskPosition = parseInt(req.body.minorTaskPosition);
        
        let adoption_flow = await AdoptionFlow.findOne({ childClassification: req.body.childClassification });
        adoption_flow.majorTask[majorTaskPosition].minorTask.splice(minorTaskPosition,1);
        adoption_flow.save();

        return res.status(200).send("minor task deleted successfully");
        // return res.status(200).json({
        //     response:adoption_flow
        // })
    }catch(err){
        return res.status(200).send("error in deleting minor task");
    }
}
module.exports.getCurrFlow=async function(req,res){
    try{
        const childclass = await ChildCategory.findOne({ childClassification: req.body.childClassification });
        if (!childclass) return res.status(200).send("first, create the new child category ");
        let currflow=await AdoptionFlow.findOne({ childClassification: req.body.childClassification });
        return res.status(200).json({
            reponse:currflow
        })
    }catch(err){
        return res.status(200).send("error in getting curr flow");
    }
}