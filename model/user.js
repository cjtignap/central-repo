
const mongoose = require('mongoose');
const {Schema}=mongoose;
const bcrypt = require('bcrypt');
const userSchema = new Schema({
    username:{
        type:String,
        required:[true,'Please enter a username'],
        unique:true,
        lowercase:true,
    },
    password:{
        type:String,
        required:[true,'Please enter a password'],
        minlength:[8,'Minimum password length is 8 characters']
    },
    type:{
        type:String,
        required:true,
        lowercase:true
    },
    status:{
        type:String,
        default:'pending'
    },
    name:{
        type:String,
        required:true
    }


});
userSchema.pre('save',async function(next){
    const salt = await bcrypt.genSalt();
    this.password=await bcrypt.hash(this.password,salt); 
    next();
});

userSchema.statics.login = async function(username,password){
    const user = await this.findOne({username});
    if(user){
        const auth = await bcrypt.compare(password,user.password);
        if(auth){
            return user;
        }
        throw Error('Incorrect password!');
    }
    throw Error('User not found!');
}
const User = mongoose.model('user',userSchema);
module.exports = User;