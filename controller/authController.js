require('dotenv').config();
const User = require('../model/user');
const jwt = require('jsonwebtoken');
const maxAge = 3 * 24 * 60 * 60;
module.exports.login_post= async(req,res)=>{
    const {username,password}=req.body;
    try{
        const user = await User.login(username,password);
        const token = createToken(user._id);
        res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge*1000});
        res.status(200).json({user:user._id});
    }
    catch(error){
        res.status(400).json({error:error.message});
    }
}
const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:maxAge
    });
};

module.exports.signup_post=async(req,res)=>{
    const {username,password}=req.body;
    try{
        const user = await User.create({username,password});
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
        res.status(400).json({error:error.message});
    }
}
module.exports.logout_get=(req,res)=>{
    res.cookie('jwt','',{maxAge:1});
    res.redirect('/');
}

