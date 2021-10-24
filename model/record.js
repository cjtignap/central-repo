const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const recordSchema = new Schema(
    
    {
        _id:{
            type:String
        },
        vaccination_status : {
            type:String
        },
        city :{
            type:String
        },
        barangay : {
            type:String
        },
        vaccine_brand : {
            type:String
        },
        vaccine_proof : {
            type:String
        },
        valid_id:{
            type:String
        },
        first_name:{
            type:String,
            required:true
        },
        last_name:{
            type:String,
            required:true
        },
        date:{
            type:String,
            required:true
        }
    }
);

const generateID=()=>{
    let id = ''
    for(let i = 0;i<8;i++)
    {
        const c = String.fromCharCode(65+Math.floor(Math.random()*26));
        id+=c;
    }
    return id;
}


recordSchema.pre('save',function(next){
    this._id = generateID();
    next(); 
});
const Record = model('Record',recordSchema);
module.exports = Record;