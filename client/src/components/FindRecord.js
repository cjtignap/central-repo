import {useState,useEffect} from 'react';
import { Image,CloudinaryContext } from 'cloudinary-react';
import QrReader from 'react-qr-reader';
import QRCode from 'qrcode'
import html2canvas from 'html2canvas';
import {useRef} from 'react';
const FindRecord = () => {
    const printableArea = useRef(0);
    const [id,setId] = useState('');
    const [status,setStatus]=useState('');
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
    const [statColor,setStatColor]=useState('black');
    const [scan,setScan]=useState(false);
    const [qrcode,setQrcode]=useState('');

    useEffect(()=>{
        if(status==='Verified'){
            setStatColor('#2bb673');
        }
        else{
            setStatColor('#4B0082');
        }
    },[status]);
    useEffect(()=>{
        if(id){
            generateQrCode();
        }
    },[first_name]);

    const generateQrCode = async () => {
        try {
              const response = await QRCode.toDataURL(id,{width:'500'});
              setQrcode(response);
        }catch (error) {
          console.log(error);
        }
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
    }
    const handleDownload = (e)=>{
        html2canvas.allowTaint=true;
        html2canvas(printableArea.current,{allowTaint : true,useCORS:true}).then(function(canvas) {
            const a = document.createElement("a");
            document.body.appendChild(a);
            a.href= canvas.toDataURL();
            a.download=`${id}.png`;
            a.click();
            document.body.removeChild(a);
        });

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
                    setStatus(data.status);
                }
            }catch(err){
                setError('Server error');
            }
        }
        

    }
    const handleErrorWebCam = (error)=>{
        setScan(false);
    }
    const handleScanWebCam  = async (result)=>{
        if(result!==null){
            setId(result);
            await handleSearch();
            setScan(false);
        }
    }
    const handleQR = (e) =>{
        if(scan){
            setScan(false);
        }
        else{
            setScan(true);
        }
    }
    return ( 

        <section className="contact-clean" >
            <form onSubmit={handleSubmit} ref={printableArea}>
            {error&&<div className="alert alert-danger" role="alert">
                No record found!
            </div>}
            

                <h2 className="text-center">Search Record</h2>
                <div className="form-group">
                    <input className="form-control" type="text" name="name" placeholder="Record ID" value={id}  onChange={(e)=>{setId(e.target.value)}}/>
                    <div style = {{'display':'flex','justifyContent':'space-between'}}>

                    <button className="btn btn-primary" onClick={handleSearch}>Search </button>
                    <button className="btn btn-primary" onClick={handleQR} >QR </button>
                    </div>
                </div>
                {scan &&
                <div className='form-group'>
                
                    <h5>Qr Code Scan by Web Cam</h5>
                            <QrReader
                            delay={500}
                            style={{width: '100%'}}
                            onError={handleErrorWebCam}
                            onScan={handleScanWebCam}
                            />
                    </div>}
                <div className="form-group">
                    <p><strong>Name</strong> : {first_name} {last_name} </p>
                    <p>
                        <strong>
                            Record Status: 
                            <a style={{color:'white',backgroundColor:statColor,padding:'5px 15px 5px 15px',borderRadius:'25px'}}>
                                {status==='Verified'?'Verified':'Unverified'}
                            </a>
                        </strong>
                    </p>
                    <p><strong>Vaccination Status</strong> : {vaccination_status}</p>   
                    <p><strong>Vaccine Brand</strong> : {vaccine_brand}</p>
                    <p><strong>Vaccination Date</strong> : {date}</p>
                    <p><strong>Address</strong> : {barangay}, {city}, {province}</p>

                    <CloudinaryContext cloudName="SoftDevG2">
                        {vaccine_proof && <p><strong>Vax card</strong>
                            <br />
                            <Image publicId = {vaccine_proof} alt="vax-card" width="100%" crossorigin="anonymous">
                                
                            </Image>
                        </p>}
                        {valid_id&&
                        <p><strong>Valid ID</strong>
                            <br />
                            <Image publicId = {valid_id} alt="valid-id"  width="100%" >
                            
                        </Image>
                        </p>
                        }
                        
                    </CloudinaryContext>
                    <a href={qrcode} download >
                            <img src={qrcode} style={{'width':'100%'}}/>
                        </a>
                </div>
                
            {first_name&&!error&&<button onClick={handleDownload} className="btn btn-primary">Save</button>}
            </form>
        </section>


        
     ); 
}
 
export default FindRecord;