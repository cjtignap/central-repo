import { useState,useEffect } from "react";

const MakeRecord = () => {
    const [_id,setId] = useState('');
    const [first_name,setFirstName] = useState('');
    const [last_name,setLastName] = useState('');
    const [city,setCity]=useState('');
    const [vaccine_brand,setBrand]=useState('');
    const [vaccination_status,setVaxStatus]=useState('');
    const [barangay,setBarangay]=useState('');
    const [date,setDate]=useState('');

    const [proofImage,setproofImage]=useState('');
    const [vaccine_proof,setVaccineProof]=useState('');

    const [idProof,setIdProof]=useState('');
    const [valid_id,setValidId]=useState('');
    const [uploading,setUploading]=useState(false);
    const [count,setCount]=useState(0);
    const insertRecord = (e)=>{
        const asyncInsertRecord = async()=>{
            try{
                setUploading(true);
                await fetch('/api/upload',{
                    method:'POST',
                    body:JSON.stringify({data:proofImage,id:vaccine_proof}),
                    headers:{
                        'Content-Type':'application/json'
                    }
                });

                 await fetch('/api/upload',{
                    method:'POST',
                    body:JSON.stringify({data:idProof,id:valid_id}),
                    headers:{
                        'Content-Type':'application/json'
                    }
                });

                await fetch('/api/records',{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({first_name,last_name,city,vaccine_brand,vaccination_status,barangay,date,_id,vaccine_proof,valid_id})
                });
                setUploading(false);
                setCount(count+1);
            }
            catch(error){
                console.log(error);
            }
        }

        asyncInsertRecord();
        e.preventDefault();
    }
    useEffect(()=>{
        const func = async()=>{
            const generatedID = await generateID();
            setId(generatedID);
            setVaccineProof(generatedID+"_proof");
            setValidId(generatedID+"_id");
        }
        func();
    },[count]);

    
    const handleImageSelect = (e)=>{
        const file = e.target.files[0];
        previewFile(file);
    }
    const handleImageSelect2 = (e)=>{
        const file = e.target.files[0];
        previewFile2(file);
    }
    const previewFile2 = (file)=>{
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend=()=>{
            setIdProof(reader.result);
        }
    }
    const previewFile = (file)=>{
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend=()=>{
            setproofImage(reader.result);
        }
    }
    
    const generateID=()=>{
        let id = ''
        for(let i = 0;i<8;i++)
        {
            const c = String.fromCharCode(65+Math.floor(Math.random()*26));
            id+=c;
        }
        return id;
    }

    return ( 
        <div>
            <h3>Insert a record</h3>
            {_id&&<h1>Gerated id : {_id}</h1>}
            {uploading&&<h3 style={{color:'red'}}>Uploading files...</h3>}
            <form onSubmit={insertRecord}>
                <p>First name</p>
                <input type="text" value={first_name} 
                    onChange={(e)=>{
                        setFirstName(e.target.value);
                    }}
                />
                <p>Last name</p>
                <input type="text" value={last_name}
                 onChange={(e)=>{
                    setLastName(e.target.value);
                }}/>
                <p>City</p>
                <input type="text" value={city}
                 onChange={(e)=>{
                    setCity(e.target.value);
                }}/>
                <p>Barngay</p>
                <input type="text" value={barangay}
                 onChange={(e)=>{
                    setBarangay(e.target.value);
                }}/>
                <p>Vaccination Status</p>
                <input type="text" value={vaccination_status}
                 onChange={(e)=>{
                    setVaxStatus(e.target.value);
                }}/>
                <p>Brand </p>
                <input type="text" value={vaccine_brand} 
                 onChange={(e)=>{
                    setBrand(e.target.value);
                }}/>
                <p>Date </p>
                <input type="text" value={date} 
                 onChange={(e)=>{
                    setDate(e.target.value);
                }}/>

                <p>Vaccination Card</p>
                <input type='file' onChange={handleImageSelect}/>
                {proofImage && <img 
                    src={proofImage}
                    alt="Vax card"
                    style={{height:'200px'}}
                />   }
                <p>Valid ID</p>
                <input type='file' onChange={handleImageSelect2}/>
                {idProof && <img 
                    src={idProof}
                    alt="Valid ID"
                    style={{height:'200px'}}
                />   }
                <br />
                <button type='submit'>Submit</button>
            </form>
            
        </div>
     );
}
 
export default MakeRecord;