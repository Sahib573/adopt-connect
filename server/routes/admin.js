const express=require('express');//fetch the already present instance of express
const router=express.Router();
const passport=require('passport');
//adding controller
const adminController=require('../controllers/admin_controller');
router.get('/all_admin',adminController.getAllAdmin);
router.get('/all_admin2',adminController.getAllAdmin2);

router.get('/all_workers',adminController.getAllWorkers);
router.get('/all_child',adminController.getAllChild);
router.get('/all_child2',adminController.getAllChild2);

router.get('/all_workers2',adminController.getAllWorkers2);
// router.get('./all_managers',adminController.getAllCaseManagers);
router.use('/adoption_flow',require('./adoptionflow'));
router.post('/addchildtoworker',adminController.addChildtoWorker);
router.post('/deletechildfromworker',adminController.deleteChildfromWorker);


router.post('/message/create',adminController.createMessage);
router.post('/message/update',adminController.updateMessage);
router.post('/message/delete',adminController.deleteMessage);
router.post('/message/get_message',adminController.getMessagebyAdmin);

router.get('/get_analytics',adminController.getAnalytics);

module.exports=router;
