import { useState,useEffect } from "react";
const MakeRecord = () => {
    const [_id,setId] = useState('');
    const [first_name,setFirstName] = useState('');
    const [last_name,setLastName] = useState('');
    const [city,setCity]=useState('');
    const [vaccine_brand,setBrand]=useState('');
    const [vaccination_status,setVaxStatus]=useState('Partial Vaccinatted');
    const [barangay,setBarangay]=useState('');
    const [date,setDate]=useState('');
    const [province,setProvince]=useState('');
    const [proofImage,setproofImage]=useState('');
    const [vaccine_proof,setVaccineProof]=useState('');
    const [success_id,setSuccessID]=useState('');
    const [idProof,setIdProof]=useState('');
    const [valid_id,setValidId]=useState('');
    const [uploading,setUploading]=useState(false);
    const [count,setCount]=useState(0);
    const [error,setError]=useState('');
    const insertRecord = (e)=>{
        const asyncInsertRecord = async()=>{
            try{
                setUploading(true);
                await fetch('/api/upload',{
                    method:'POST',
                    body:JSON.stringify({data:proofImage,id:_id+"_proof"}),
                    headers:{
                        'Content-Type':'application/json'
                    }
                });

                 await fetch('/api/upload',{
                    method:'POST',
                    body:JSON.stringify({data:idProof,id:_id+"_id"}),
                    headers:{
                        'Content-Type':'application/json'
                    }
                });
                await fetch('/api/records',{
                    
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({first_name,last_name,province,city,vaccine_brand,vaccination_status,barangay,date,_id,vaccine_proof,valid_id})
                });
                setUploading(false);
                setSuccessID(_id);
                setCount(count+1);
                setError('');
            }
            catch(error){
                setUploading(false);
                setError('Oops upload failed, something gone wrong.')
            }
        }

        asyncInsertRecord();
        e.preventDefault();
    }
    useEffect(()=>{
        const func = async()=>{
            let today = new Date().toISOString().slice(0, 10);
            setDate(today);
            const generatedID = await generateID();
            setId(generatedID);
            setVaccineProof("central-repo/"+generatedID+"_proof");
            setValidId("central-repo/"+generatedID+"_id");
                            
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
        <section className="contact-clean">
            <form onSubmit={insertRecord}>
                {uploading&&<div class="alert alert-primary" role="alert">
                    Uploading files...
                </div>}
                {error&&<div class="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>{error}</strong>
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>}
                <h2 className="text-center">Register</h2>
                {success_id&&<div class="alert alert-success alert-dismissible fade show" role="alert">
                    Upload Success! <br />Registered ID : <strong>{success_id}</strong>
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>}

                <div className="form-group">
                    <input className="form-control" 
                        type="text" 
                        placeholder="Firstname"  
                        value={first_name} 
                        onChange={(e)=>{
                            setFirstName(e.target.value);
                        }}
                        required
                    />
                    <input className="form-control" 
                        type="text" 
                        placeholder="Lastname" 
                        value={last_name}
                        onChange={(e)=>{
                         setLastName(e.target.value);
                        }}
                        required
                    />
                </div>
                <div className="form-group">
                    <input className="form-control" 
                        type="text" 
                        placeholder="Province" 
                        value={province}
                        onChange={(e)=>{
                           setProvince(e.target.value);
                       }}
                        required
                    />
                    <input className="form-control"
                        type="text" 
                        placeholder="City"   
                        value={city}
                        onChange={(e)=>{
                           setCity(e.target.value);}}
                        required
                    />
                    <input className="form-control" 
                    type="text" 
                    placeholder="Barangay" 
                    value={barangay}
                    onChange={(e)=>{
                       setBarangay(e.target.value);
                   }}
                    required/>
                </div>
                <div className="form-group">
                    <div className="form-check">
                        <input className="form-check-input" 
                        type="radio" 
                        id="formCheck-1" 
                        value="Fully Vaccinated"
                        name="vax_status" 
                        onChange={(e)=>{
                            setVaxStatus(e.target.value);
                        }}
                        />
                        <label className="form-check-label" htmlFor="formCheck-1">Fully Vacinated</label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" 
                            type="radio" 
                            id="formCheck-2" 
                            name="vax_status" 
                            value="Partial Vaccinated"
                            onChange={(e)=>{
                                setVaxStatus(e.target.value);
                            }}
                        />
                        <label className="form-check-label" htmlFor="formCheck-1">Partial Vaccinated</label>
                    </div>
                    <br />
                    <label>Vaccination Date</label>
                    <input className="form-control" 
                        type="date" 
                        value={date}
                        onChange={(e)=>{
                            setDate(e.target.value);
                        }}
                    />
                </div>
                <div className="form-group">
                    <input className="form-control" 
                        type="text" 
                        placeholder="Vaccine Brand"
                        value={vaccine_brand}
                        onChange={(e)=>{
                            setBrand(e.target.value);
                        }} 
                        required/>
                </div>
                <div className="form-group">
                    <label>Vaccine Proof</label>
                    <input className="form-control-file" type="file" required onChange={handleImageSelect}/>
                    {proofImage && <img 
                        src={proofImage}
                        alt="Vax card"
                        style={{height:'200px'}}
                    />   }
                    <br />
                    <label>Valid ID</label>
                    <input className="form-control-file" type="file" required onChange={handleImageSelect2}/>
                    {idProof && <img 
                    src={idProof}
                    alt="Valid ID"
                    style={{height:'200px'}}
                />   }
                </div>
                <div className="form-group">
                    <button className="btn btn-primary" type="submit">send </button>
                </div>
            </form>
        </section>

        
     );
}
 
export default MakeRecord;