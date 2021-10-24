import { useState } from "react";

const MakeRecord = () => {
    const [first_name,setFirstName] = useState('');
    const [last_name,setLastName] = useState('');
    const [city,setCity]=useState('');
    const [vaccine_brand,setBrand]=useState('');
    const [vaccination_status,setVaxStatus]=useState('');
    const [barangay,setBarangay]=useState('');
    const [date,setDate]=useState('');

    const insertRecord = (e)=>{
        const insertRecordCall = async()=>{
            try{
                const res = await fetch('/api/records',{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({first_name,last_name,city,vaccine_brand,vaccination_status,barangay,date})
                });
                const data = await res.json();
            }
            catch(error){
                console.log(error.message)
            }
        }
        insertRecordCall();
        e.preventDefault();
    }

    return ( 
        <div>
            <h3>Insert a record</h3>
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
                
                <button>Submit</button>
            </form>
        </div>
     );
}
 
export default MakeRecord;