
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

module.exports = {record_insert,record_get};

