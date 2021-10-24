import { useState } from "react";

const ImageUpload = () => {
    const id='ABCDE';
    const [fileInputState,setFileInputState] = useState('');
    const [previewSource,setPreviewSource]=useState('');
    const handleFileSubmit = (e)=>{
        e.preventDefault();
        if(!previewSource){
            return;
        }
        uploadImage(previewSource);
    }
    
    const uploadImage = async (base64EncodedImage )=>{
        try{
        
            await fetch('/api/upload',{
                method:'POST',
                body:JSON.stringify({data:base64EncodedImage,id}),
                headers:{
                    'Content-Type':'application/json'
                }
            });  
        }
        catch(error){ 
            console.error('error'+error);
        }
    }

    const handleFileChange = (e)=>{
        const file = e.target.files[0];
        previewFile(file);
    }
    const previewFile = (file)=>{
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend=()=>{
            setPreviewSource(reader.result);
        }
    }
    return (  
        <div>
            <h3>Upload</h3>
            <form onSubmit={handleFileSubmit}>
                <input type="file" name="valid_id" onChange={handleFileChange}/>
                <button type='submit'>Submit</button>
            </form>
            {previewSource&&
            <img 
                src={previewSource} 
                alt="chosen file"  
                style={{height:'300px'}}/>}
        </div>
    );
}
 
export default ImageUpload;