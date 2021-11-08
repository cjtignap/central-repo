import {useState} from 'react';
import { Image,Transformation,CloudinaryContext } from 'cloudinary-react';
const FindRecord = () => {

    const [id,setId] = useState('');
    const [first_name,setFirstName] = useState('');
    const [last_name,setLastName] = useState('');
    const [province,setProvince]=useState('');
    const [city,setCity]=useState('');
    const [vaccine_brand,setBrand]=useState('');
    const [vaccination_status,setVaxStatus]=useState('');
    const [barangay,setBarangay]=useState('');
    const [date,setDate]=useState('');
    const [error,setError]=useState();
    const [vaccine_proof,setVaccineProof]=useState('');
    const [valid_id,setValidId]=useState('');
    const handleSubmit=(e)=>{
        e.preventDefault();
    }
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
                    setVaccineProof(data.vaccine_proof);
                    setValidId(data.valid_id);
                    setProvince(data.province);
                }
            }catch(err){
                setError('Server error');
            }
        }
        

    }
    return ( 

        <section className="contact-clean">
            <form onSubmit={handleSubmit} >
            {error&&<div className="alert alert-danger" role="alert">
                No record found!
            </div>}
            

                <h2 className="text-center">Search Record</h2>
                <div className="form-group">
                    <input className="form-control" type="text" name="name" placeholder="Record ID" value={id}  onChange={(e)=>{setId(e.target.value)}}/>
                    <button className="btn btn-primary" onClick={handleSearch}>Search </button>
                </div>
                <div className="form-group">
                    <p><strong>Name</strong> : {first_name} {last_name} </p>
                    <p><strong>Vaccination Status</strong> : {vaccination_status}</p>   
                    <p><strong>Vaccine Brand</strong> : {vaccine_brand}</p>
                    <p><strong>Vaccination Date</strong> : {date}</p>
                    <p><strong>Address</strong> : {barangay}, {city}, {province}</p>
                    

                    <CloudinaryContext cloudName="SoftDevG2">
                        {vaccine_proof && <p><strong>Vax card</strong>
                            <br />
                            <Image publicId = {vaccine_proof} alt="vax-card" height="200px">
                                <Transformation  width="300" height="300" />
                            </Image>
                        </p>}
                        {valid_id&&
                        <p><strong>Valid ID</strong>
                            <br />
                            <Image publicId = {valid_id} alt="valid-id" height="200px">
                            <Transformation  width="500" height="500" />
                        </Image>
                        </p>
                        }
                        
                    </CloudinaryContext>

                </div>
            </form>
        </section>


        
     ); 
}
 
export default FindRecord;