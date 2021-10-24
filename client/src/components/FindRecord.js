import {useState,useEffect} from 'react';

const FindRecord = () => {

    const [id,setId] = useState('');
    const [first_name,setFirstName] = useState('');
    const [last_name,setLastName] = useState('');
    const [city,setCity]=useState('');
    const [vaccine_brand,setBrand]=useState('');
    const [vaccination_status,setVaxStatus]=useState('');
    const [barangay,setBarangay]=useState('');
    const [date,setDate]=useState('');
    const [error,setError]=useState();
    
    const handleSearch = async()=>{
        if(!id){
            setError('Enter a valid id');
        }
        else{
            try{
                const res = await fetch('/api/records/'+id);
                const data = await res.json();
                console.log(data.error);
                if(data.error){
                    setError(data.error);
                }
                else{
                    setError('');
                    setId(data._id);
                    setFirstName(data.first_name);
                    setCity(data.city);
                    setVaxStatus(data.vaccination_status);
                    setLastName(data.last_name);
                    setBrand(data.vaccine_brand);
                    setBarangay(data.barangay);
                    setDate(data.date);
                }
            }catch(err){
                setError('Server error');
            }
        }
        

    }
    return ( 
        <div>
            Search Record
            <input type="text" value={id}
            onChange={(e)=>{setId(e.target.value)}} placeholder='Record ID'/>
            <button onClick={handleSearch}>Search</button>

            <div>
                {error&&<b>{error}</b>}
                {!error&&<div>
                    <p><strong>Name: </strong>{first_name} {last_name}</p>
                    <p><strong>id: </strong> {id}</p>
                    <p><strong>address: </strong> {barangay}, {city}</p>
                    <p><strong>status </strong> {vaccination_status}</p>
                    <p><strong>vaccine brand: </strong> {vaccine_brand}</p>
                    <p><strong>date of vaccination : </strong>{date}</p>
                </div> }
            </div>
        </div>
     ); 
}
 
export default FindRecord;