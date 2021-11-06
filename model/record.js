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
        province:{
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



const Record = model('Record',recordSchema);
module.exports = Record;