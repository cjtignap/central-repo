import {useEffect,useState} from 'react';
import { useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom'
import Select from 'react-select';

import ReactExport from 'react-data-export';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const phLocations = require('../assets/barangays.json');


const SearchRecords = () => {
    //history hook
    const history = useHistory();
    //from redux
    const user = useSelector((state)=>state.user.user);
    //fetched records
    const [records,setRecords] = useState([]);

    //options for searching
    const [first_name,setFirstName]=useState('');
    const [last_name,setLastName]=useState('');
    const [brand,setBrand]=useState('');
    const [vaccination_status,setVaxStatus]=useState('');
    const [status,setStatus]=useState('');

    // for selecting location
    const [region,setRegion]=useState('');
    const [province,setProvince]=useState('');
    const [city,setCity]=useState('');
    const [barangay,setBarangay]=useState('');

    //for setting regions list
    const [regions,setRegions]=useState([]);
    const [provinces,setProvinces]=useState([]);
    const [cities,setCities]=useState([]);
    const [barangays,setBarangays]=useState([]);

    //misc states
    const [showAdvance,setShowAdvance]=useState(false);

    const handleAdvance=()=>{
        if(showAdvance){
            setShowAdvance(false);
        }
        else{
            setShowAdvance(true);
        }
    }

    useEffect(()=>{
        var regionsArray = [];
        for (let [key, region] of Object.entries(phLocations)) {
            regionsArray = [...regionsArray,{value:key,label:region.region_name}];
            
        }
        setRegions(regionsArray);
    },[]);

    //setting up provinces
    useEffect(()=>{
        if(region!==''&&region.region_code!==''){
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
        }else{
            setProvinces([]);
            setProvince('');
            setCities([]);
            setCity('');
            setBarangays([]);
            setBarangay('');
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
        else{
            setCities([]);
            setCity('');
            setBarangays([]);
            setBarangay('');
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
        else{
            setBarangays([]);
            setBarangay('');
        }
    },[city]);

    useEffect(()=>{
        if(user){
            if(user.type!=='local'){
                history.push('/');
            }
        }
        else{
            history.push('/');
        }
    },[user]);

   useState(()=>{
        const randomFunc = async()=>{
            if(!showAdvance){    
                const res = await fetch(`/api/records/search?key=${user._id}`,{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({first_name,last_name})
                    
                });
                const resArray = await res.json();
                setRecords(resArray);
            }
            else{
                const res = await fetch('/api/records/advanceSearch',{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({first_name,last_name,region,province,city,barangay,vaccination_status,vaccine_brand:brand,status})
                    
                });
                const resArray = await res.json();
                setRecords(resArray);
            }
        }
        randomFunc();
    },[records]);
   
    
    const handleSearch=async()=>{

        if(!showAdvance){    
            const res = await fetch(`/api/records/search?key=${user._id}`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({first_name,last_name})
                
            });
            const resArray = await res.json();
            setRecords(resArray);
        }
        else{
            const res = await fetch(`/api/records/advanceSearch?key=${user._id}`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({first_name,last_name,region,province,city,barangay,vaccination_status,vaccine_brand:brand,status})
                
            });
            const resArray = await res.json();
            setRecords(resArray);
        }

    }

    const deleteUser = (_id,first_name,last_name,vaccination_status,vaccine_brand)=>{
            _id = _id.substring(4,8);
            fetch(`/api/records/?key=${user._id}`,{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({_id,first_name,last_name,vaccination_status,vaccine_brand})
        });
    }

    const verifyUser = (_id,first_name,last_name,vaccination_status,vaccine_brand)=>{
        _id = _id.substring(4,8);
        fetch(`/api/records/verify?key=${user._id}`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({_id,first_name,last_name,vaccination_status,vaccine_brand})
        });
    }

    const DataSet = [{
        columns:[
            {title:"First name"},
            {title:"Last name"},
            {title:"Vaccine Brand"},
            {title:"Vaccination Status"}
        ],
        data:records.map((record)=>[
            {value:record.first_name},
            {value:record.last_name},
            {value:record.vaccine_brand},
            {value:record.vaccination_status}
        ])
    }]

    
    return (
        <div>
            <div className="search-container">
                <h2 style={{margin: 'auto'}}>Search Records</h2>
                <div className="search-basic-container">
                    <div className="form-group1">
                    <div>
                        <label>First name</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Juan"
                            value={first_name}
                            onChange={e=>setFirstName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Last name</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Dela Cruz"
                            value={last_name}
                            onChange={e=>setLastName(e.target.value)} 
                        />
                    </div>
                    </div>
                </div>
                <div className="search-advance-container">
                    <div style={{marginTop:'10px',display:'flex',justifyContent:'space-between'}}>
                        <a 
                            className="search-text" 
                            data-toggle="collapse" 
                            href="#showAdvance" 
                            style={{color:'#25aae1'}} 
                            onClick={handleAdvance}
                        >
                            {showAdvance?'Hide Advance':'Show advance'}
                        </a> 
                        <div>
                        <button 
                            className="btn btn-primary" 
                             style={{marginRight:'5px'}}
                            onClick={handleSearch}
                        >
                            Search
                        </button>

                        <ExcelFile 
                         filename="Exported datas" 
                         element={<button type="button"  className="btn btn-info" >Export</button>}>
                             <ExcelSheet dataSet={DataSet} name="Exported datas"/>
                         </ExcelFile>
                        {/* <button 
                            className="btn btn-info" 
                            
                            onClick={handleExport}
                        >
                            Export
                        </button> */}
                        </div>
                        
                    </div>
                    
                    <div className="collapse" id="showAdvance">
                    <div className="form-row">
                        <div className="form-group col-md-6">
                        <label>Region</label>
                        <Select 
                            placeholder='Select Region'
                            onChange={e=>{
                                if(e){
                                    
                                    setRegion({region_code:e.value,region_name:e.label})
                                }
                                else{
                                    setRegion({region_code:'',region_name:''})
                                    
                                }
                        
                                    }}
                            options={regions}
                            isClearable={true}
                        />
                        </div>
                        <div className="form-group col-md-6">
                            <label>Province</label>
                            <Select 
                                placeholder='Select Province'
                                onChange={e=>{
                                    if(e){
                                        setProvince(e.value);
                                    }
                                    else{
                                        setProvince('');
                                    }
                                }}
                                options={provinces}
                                isClearable={true}
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label>City</label>
                            <Select 
                                placeholder='Select Municipality'
                                options={cities}
                                isClearable={true}
                                onChange={e=>{
                                    if(e){

                                        setCity(e.value)
                                    }
                                    else{
                                        setCity('');
                                    }
                                }}
                            />
                        </div>
                        <div className="form-group col-md-6">
                            <label>Barangay</label>
                            <Select 
                                placeholder='Select Barangay'
                                options={barangays}
                                isClearable={true}
                                onChange={e=>{
                                    
                                    if(e){

                                        setBarangay(e.value)
                                    }
                                    else{
                                        setBarangay('');
                                    }
                                }}
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-4">
                        <label>Brand</label>
                        <Select 
                        placeholder='Select Vaccine Brand'
                        onChange={e=>{
                            if(e){
                                setBrand(e.value)
                            }
                            else{
                                setBrand('');
                            }
                        
                        }}
                        isClearable={true}
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
                    </div>
                    <div className="form-group col-md-4">
                        <label>Vaccination Status</label><br />
                        <Select 
                            placeholder='Select Vaccination Status'
                            onChange={e=>{
                                if(e){
                                    setVaxStatus(e.value);
                                }
                                else{
                                    setVaxStatus('');
                                }
                            
                            }}
                            isClearable={true}
                            options={[
                                
                                {value:'Partially Vaccinated',label:'Partially Vaccinated'},
                                {value:'Fully Vaccinated',label:'Fully Vaccinated'},
                                {value:'Fully Vaccinated with Booster',label:'Fully Vaccinated with Booster'}
                            ]}
                        />
                    </div>
                    <div className="form-group col-md-4">
                        <label>Record Status</label><br />
                        <Select 
                            placeholder='Select Record Status'
                            onChange={e=>{
                                if(e){
                                    setStatus(e.value);
                                }
                                else{
                                    setStatus('');
                                }
                            
                            }}
                            isClearable={true}
                            options={[
                                {value:'Verified',label:'Verified'},
                                {value:'Unverified',label:'Unverified'}
                            ]}
                        />
                    </div>
                </div>
                </div>
                </div>
               
                <div className="table-responsive" style={{marginTop:'10px'}}>
                <table className="table table-striped table-hover search-record-table" >
                    <thead className="thead-dark">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Vaccine</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>

                    {records.map(record=>{
                        return(
                            <tr key={record._id}>
                                <td scope="row">{record._id}</td>
                                <td>{record.first_name} {record.last_name}</td>
                                <td>{record.vaccine_brand}</td>
                                <td>{record.vaccination_status}</td>
                                <td>
                                    {record.status!=='Verified'&&
                                        <button 
                                            type="button" 
                                            className="btn btn-success"
                                            onClick={()=>{verifyUser(record._id,record.first_name,record.last_name,record.vaccination_status,record.vaccine_brand)}}
                                        >Verify</button>
                                    
                                    }
                                    <button 
                                        className="btn btn-danger" 
                                        onClick={()=>{deleteUser(record._id,record.first_name,record.last_name,record.vaccination_status,record.vaccine_brand)}}
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
            </div>
           
          
        </div>
        

      );
}
 
export default SearchRecords;