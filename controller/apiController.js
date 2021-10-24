const {cloudinary} = require('../utils/cloudinary/cloudinary');

const api_upload_image =async (req,res)=>{
    try{
        const fileString = req.body.data;
        const public_id = req.body.id;
        await cloudinary.v2.uploader.upload(fileString,
        { upload_preset: 'central-repo',public_id}, 
        function(error, result) {

            if(error){
                res.status(500).json({'error':'something went wrong'});
            }
            res.json(result);
        });
    }
    catch(error){
        console.log(error.message);
    }
}

module.exports = {api_upload_image}
