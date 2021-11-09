import { useState,useEffect } from "react";
import Select from 'react-select';
const phLocations = require('../assets/barangays.json');
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
    const [region,setRegion]=useState('');
    const [proofImage,setproofImage]=useState('');
    const [vaccine_proof,setVaccineProof]=useState('');
    const [success_id,setSuccessID]=useState('');
    const [idProof,setIdProof]=useState('');
    const [valid_id,setValidId]=useState('');
    const [uploading,setUploading]=useState(false);
    const [count,setCount]=useState(0);
    const [error,setError]=useState('');

    //for selecting adressess
    const [regions,setRegions]=useState([]);
    const [provinces,setProvinces]=useState([]);
    const [cities,setCities]=useState([]);
    const [barangays,setBarangays]=useState([]);
    const insertRecord = (e)=>{
        
        e.preventDefault();
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
                    body:JSON.stringify({first_name,last_name,province,city,vaccine_brand,vaccination_status,barangay,date,_id,vaccine_proof,valid_id,region:region.region_name})
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
        if(region===''){
            setError('Select region first.');
        }
        else if(province===''){
            setError('Invalid province.');
        }
        else if(city===''){
            setError('Invalid city.');
        }
        else if(barangay===''){
            setError('Invalid barangay.');
        }
        else if(vaccine_brand===''){
            setError('Please select vaccine brand.');
        }
        else if(vaccination_status===''){
            setError('Please set your vaccination status.');
        }
        else{
            setError('');
            asyncInsertRecord();
        }
    }

    //initializing regions
    useEffect(()=>{
        var regionsArray = [];
        for (let [key, region] of Object.entries(phLocations)) {
            regionsArray = [...regionsArray,{value:key,label:region.region_name}];
            
        }
        setRegions(regionsArray);
    },[]);

    //setting up provinces
    useEffect(()=>{
        if(region!==''){
            var provincesArray = [];
            setProvinces([]);
            setProvince('');
            setCities([]);
            setCity('');
            setBarangays([]);
            setBarangay('');
            for (let [key, province] of Object.entries(phLocations[region.region_code].province_list)) {
                provincesArray = [...provincesArray,{value:key,label:key}]
            }
            setProvinces(provincesArray);
        }
    },[region]);

    //setting up cities
    useEffect(()=>{
        if(province!==''){
            setCities([]);
            setCity('');
            setBarangays([]);
            setBarangay('');
            var citiesArray = [];
            for (let [key,city] of Object.entries(phLocations[region.region_code].province_list[province].municipality_list)) {
                citiesArray = [...citiesArray,{value:key,label:key}]
            }
            setCities(citiesArray);
        }
    },[province]);

    //setting up barangays
    useEffect(()=>{
        if(city!==''){
            setBarangays([]);
            setBarangay('');
            var barangaysArray = [];
            for (let [key,barangay] of Object.entries(phLocations[region.region_code].province_list[province].municipality_list[city].barangay_list)) {
                barangaysArray = [...barangaysArray,{value:barangay,label:barangay}]
            }
            setBarangays(barangaysArray);
        }
    },[city]);


    //for generating new id
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

    //for generating random id
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
                {uploading&&<div className="alert alert-primary" role="alert">
                    Uploading files...
                </div>}
                {error&&<div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>{error}</strong>
                    
                </div>}
                <h2 className="text-center">Register</h2>
                {success_id&&<div className="alert alert-success alert-dismissible fade show" role="alert">
                    Upload Success! <br />Registered ID : <strong>{success_id}</strong>
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
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
                    
                    <Select 
                        placeholder='Select Region'
                        onChange={e=>{setRegion({region_code:e.value,region_name:e.label})}}
                        options={regions}
                    />

                    <Select 
                        placeholder='Select Province'
                        onChange={e=>{
                            setProvince(e.value)
                        }}
                        
                        options={provinces}
                    />
                    <Select 
                        placeholder='Select Municipality'
                        onChange={e=>{setCity(e.value)}}
                        options={cities}
                    />
                    <Select 
                        placeholder='Select Barangay'
                        onChange={e=>{setBarangay(e.value)}}
                        options={barangays}
                    />
                    
                </div>
                <div className="form-group">
                    <Select 
                        placeholder='Select Vaccine Brand'
                        onChange={e=>{setBrand(e.value)}}
                        options={[
                            {value:'Pfizer',label:'Pfizer'},
                            {value:'Moderna',label:'Moderna'},
                            {value:'Janssen',label:'Janssen'},
                            {value:'AstraZeneca',label:'AstraZeneca'},
                            {value:'Sinopharm',label:'Sinopharm'},
                            {value:'Sinovac',label:'Sinovac'},
                            {value:'Covaxin',label:'Covaxin'},
                            {value:'Sputnik',label:'Sputnik'},
                            {value:'Other vaccine',label:'Other vaccine'}
                        ]}
                    />
                    <Select 
                        placeholder='Select Vaccination Status'
                        onChange={e=>{setVaxStatus(e.value)}}
                        options={[
                            {value:'Fully Vaccinated',label:'Fully Vaccinated'},
                            {value:'Partially Vaccinated',label:'Partially Vaccinated'}
                        ]}
                    />
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
                    <label>Vaccine Proof</label>
                    <input className="form-control-file" type="file" required onChange={handleImageSelect} accept="image/*"/>
                    {proofImage && <img 
                        src={proofImage}
                        alt="Vax card"
                        style={{height:'200px'}}
                    />   }
                    <br />
                    <label>Valid ID</label>
                    <input className="form-control-file" type="file" required onChange={handleImageSelect2} accept="image/*"/>
                    {idProof && <img 
                    src={idProof}
                    alt="Valid ID"
                    style={{height:'200px'}}
                />   }
                </div>
                <div className="form-group">
                    <button className="btn btn-primary" type="submit">send</button>
                </div>
            </form>
        </section>
     );
}
 
export default MakeRecord;