const User = require('../model/user');
const Record = require('../model/record');


const record_insert = (req,res)=>{
    const record = new Record(req.body);
    record.status='Unverified';
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
        res.status(500).json({error});
    }
    
}

const record_search=async(req,res)=>{
    
    const {first_name,last_name} = req.body;
    Record.find({first_name:{$regex:new RegExp(".*" + first_name+".*", "i") },last_name:{$regex:new RegExp(".*" + last_name+".*", "i") }},
        "first_name last_name vaccination_status vaccine_brand status").sort({'date':-1}).limit(20).exec((err,records)=>{
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
                    _id:'****'+record._id.substring(4,8),
                    status:record.status
                })
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
const record_verify = async(req,res)=>{
    var {_id,first_name,last_name,vaccine_brand,vaccination_status} =req.body;
    try{
        await Record.updateOne({_id:{$regex:'.*'+_id},
                            first_name,
                            last_name,
                            vaccine_brand,
                            vaccination_status}
        ,{status:'Verified'});
        res.json({response:'success'});
    }
    catch(error){
        res.json({response:'failed'});
    }
}
const record_advance_search = async(req,res)=>{

    const {first_name,last_name,region,province,city,barangay,vaccination_status,status,vaccine_brand} = req.body;
    var searchParams ;
    if(region.region_name!==''){
        if(province!==''&&province){
            if(city!==''&&city){
                if(barangay!==''&&barangay){
                    searchParams = {first_name:{$regex:new RegExp(".*" + first_name+".*", "i") },
                    region:region.region_name,
                    province:province,
                    city:city,
                    barangay:barangay,
                    last_name:{$regex:new RegExp(".*" + last_name+".*", "i")},
                    vaccine_brand:{$regex:new RegExp(".*" + vaccine_brand+".*", "i")},
                    // status:{$regex:new RegExp(".*" + status+".*", "i")},
                    vaccination_status:{$regex:new RegExp(".*" + vaccination_status+".*", "i")}};
                }
                else{
                    searchParams = {first_name:{$regex:new RegExp(".*" + first_name+".*", "i") },
                        region:region.region_name,
                        province:province,
                        city:city,
                        last_name:{$regex:new RegExp(".*" + last_name+".*", "i")},
                        vaccine_brand:{$regex:new RegExp(".*" + vaccine_brand+".*", "i")},
                        // status:{$regex:new RegExp(".*" + status+".*", "i")},
                        vaccination_status:{$regex:new RegExp(".*" + vaccination_status+".*", "i")}};
                }
            }
            else{
                searchParams = {first_name:{$regex:new RegExp(".*" + first_name+".*", "i") },
                        region:region.region_name,
                        province:province,
                        last_name:{$regex:new RegExp(".*" + last_name+".*", "i")},
                        vaccine_brand:{$regex:new RegExp(".*" + vaccine_brand+".*", "i")},
                        // status:{$regex:new RegExp(".*" + status+".*", "i")},
                        vaccination_status:{$regex:new RegExp(".*" + vaccination_status+".*", "i")}};
            }
        }
        else{
            searchParams = {first_name:{$regex:new RegExp(".*" + first_name+".*", "i") },
                        region:region.region_name,
                        last_name:{$regex:new RegExp(".*" + last_name+".*", "i")},
                        vaccine_brand:{$regex:new RegExp(".*" + vaccine_brand+".*", "i")},
                        // status:{$regex:new RegExp(".*" + status+".*", "i")},
                        vaccination_status:{$regex:new RegExp(".*" + vaccination_status+".*", "i")}};
        }
    }
    else{
        searchParams = {first_name:{$regex:new RegExp(".*" + first_name+".*", "i") },
                        last_name:{$regex:new RegExp(".*" + last_name+".*", "i")},
                        vaccine_brand:{$regex:new RegExp(".*" + vaccine_brand+".*", "i")},
                        // status:{$regex:new RegExp(".*" + status+".*", "i")},
                        vaccination_status:{$regex:new RegExp(".*" + vaccination_status+".*", "i")}
                    };
    }
    

    Record.find(searchParams,
        "first_name last_name vaccination_status vaccine_brand status").sort({'date':-1}).limit(20).exec((err,records)=>{
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
                    _id:'****'+record._id.substring(4,8),
                    status:record.status
                })
            });
            res.json(recordsMod);
        }
    })
}  

// const userID = req.query.key
     


//     User.findOne({_id:userID,type:'local'},async function(err,user){
//         if(err||user===null){
//            res.status(404).json({error:"Invalid API KEY"})
//         }
//         else{
           
    
//         }
//     });

module.exports = {record_insert,record_get,record_search,record_delete,record_verify,record_advance_search};

