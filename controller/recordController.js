
const Record = require('../model/record');


const record_insert = (req,res)=>{
    const record = new Record(req.body);
    record.save()
        .then((result)=>{
            res.json(result);
        })
        .catch(err=>{
            console.log(err.message);
            res.send("ERRO")}
        );
}
const record_get = async(req,res)=>{
    const id = req.params.id;
    try{
        const record = await Record.findById(id);
        if(record){
            res.json(record);
        }
        else{
            res.json({error:'no such record'});
        }
    }
    catch(error){
        console.log(error.message);
    }
    
}

const record_search=async(req,res)=>{
    
    const {first_name,last_name} = req.body;
    Record.find({first_name:{$regex:new RegExp(".*" + first_name+".*", "i") },last_name:{$regex:new RegExp(".*" + last_name+".*", "i") }},
        "first_name last_name vaccination_status vaccine_brand").sort({'date':-1}).limit(20).exec((err,records)=>{
        if(err){
            res.json([]);
        }
        else{
            const recordsMod = [];
            records.map((record)=>{
                recordsMod.push({first_name:record.first_name,
                    last_name:record.last_name,
                    vaccination_status:record.vaccination_status,
                    vaccine_brand:record.vaccine_brand,
                    _id:'****'+record._id.substring(4,8)})
            });
            res.json(recordsMod);
        }
    })
   
}

const record_delete = async(req,res)=>{
    var {_id,first_name,last_name,vaccine_brand,vaccination_status} =req.body;
    Record.deleteOne({_id:{$regex:'.*'+_id},
                        first_name,
                        last_name,
                        vaccine_brand,
                        vaccination_status},err=>{
        if(err){
            res.json({code:-1})
        }
        res.json({code:1})
    });
}
module.exports = {record_insert,record_get,record_search,record_delete};

