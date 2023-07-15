const User=require('../models/user');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
// const env=require('../../../config/environment');
module.exports.createSession=async function(req,res){
    try{
        let user =await User.findOne({user_id:req.body.user_id});
        const passwordsMatch = await bcrypt.compare(req.body.password, user.password);
        if (!passwordsMatch) {
            return res.json.status(422).json({
                message:"invalid username or password"
            });
        }
        if(!user){
            return res.json.status(422).json({
                message:"invalid username or password"
            });
        }
        return res.status(200).json({
            message:"sign in successful here is your token please keep it safe",
            data:{
                token:jwt.sign(user.toJSON(),'adoptconnect',{expiresIn:100000})
            }
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            message:"internal server error"
        })
    }
}