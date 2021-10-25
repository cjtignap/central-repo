import {useState,useEffect} from 'react';
import  {Image,CloudinaryContext,Transformation} from 'cloudinary-react';
const SampleImage = () => {
    const [image,setImage] =useState();

    return (  
        <CloudinaryContext cloudName="SoftDevG2">
            <Image publicId = "central-repo/FOWSSZCU_proof" alt="some imeage" height="200px">
                <Transformation  width="300" height="300" />
            </Image>
        </CloudinaryContext>
    );
}
 
export default SampleImage;