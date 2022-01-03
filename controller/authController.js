require('dotenv').config();
const User = require('../model/user');
const jwt = require('jsonwebtoken');
const maxAge = 3 * 24 * 60 * 60;
module.exports.login_post= async(req,res)=>{
    const {username,password}=req.body;
    try{
        const user = await User.login(username,password);
        if(user.status==='pending'){
            throw Error("Account yet to be verified.")
        }
        else{
            const token = createToken(user._id);
            res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge*1000});
            res.status(200).json({user:user._id});
        }
    }
    catch(error){
        res.json({error:error.message});
    }
}
const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:maxAge
    });
};

module.exports.signup_post=async(req,res)=>{
    const {username,password,type,name}=req.body;
    try{
        const user = await User.create({username,password,type,name});
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ user: user._id });
    }
    catch(error){
        if(error.code==11000){
            res.status(400).json({error:'Username already taken'});
        }
        if(error.errors.password.kind==='minlength'){
            res.status(400).json({error:"Password is too short."});
        }
        res.json({error:error.message});
    }
}
module.exports.logout_get=(req,res)=>{
    res.cookie('jwt','',{maxAge:1});
    res.redirect('/');
}

module.exports.is_loggedin=(req,res)=>{
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token,process.env.JWT_SECRET,async(err,decodedToken)=>{
            if(err){
                res.cookie('jwt','',{maxAge:1});
                res.json({username:'',type:''});
            }
            else{
                let user = await User.findById(decodedToken.id);
                res.json({_id:user._id,username:user.username,type:user.type,name:user.name});  
            }
        });
    }
    else{
        res.json({username:''});
    }
    
}
module.exports.get_pending=(req,res)=>{
    User.find({status:'pending'},'username name type').limit(30).exec((err,users)=>{
        if(err){
            res.json([]);
        }
        else{
            res.json(users);
        }
    })
}

module.exports.approve_user=async(req,res)=>{
    const {id}=req.body;

    const userID = req.query.key
     
    User.findOne({_id:userID,type:'national'}, async function(err,user){
        if(err||user===null){
           res.status(404).json({error:"Invalid API KEY"})
        }
        else{
            try{
                await User.updateOne({_id:id},{status:'verified'});
                res.json({response:'success'});
            }
            catch(error){
                res.json({response:'failed'});
            }

        }
    });
    
}

// const userID = req.query.key
     
// User.findOne({_id:userID,type:'local'}, function(err,user){
//     if(err||user===null){
//        res.status(404).json({error:"Invalid API KEY"})
//     }
//     else{
       

//     }
// });