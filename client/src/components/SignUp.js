import {Link} from 'react-router-dom';
import logo300 from '../assets/img/logo300.png';
import Select from 'react-select';
import {useState,useEffect} from 'react';
const SignUp = () => {
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const [password2,setPassword2]=useState('');
    const [type,setType]=useState('local');
    const [error,setError]=useState('');
    const [success,setSuccess]=useState(false);
    useEffect(()=>{
        console.log(type);
    },[]);
    const handleSubmit = async(e)=>{
        e.preventDefault();
        if(!(password===password2)){
            setError('Passwords do not match.');
            setSuccess(false);
        }
        else{
            const request = await fetch('/api/auth/signup',{
                method:'POST',
                body:JSON.stringify({username,password,type}),
                headers:{
                    'Content-Type':'application/json'
                }
            });
            const result = await request.json();
            if(result.error){
                setError(result.error);
                setSuccess(false);
            }
            else{
                setError('');
                setSuccess(true);
            }
        }
    }
    return ( 
    <section className="login-clean" onSubmit={handleSubmit} style={{background: '#25aae1'}}>
        <form onSubmit={e=>{e.preventDefault()}}>
            {error&&<div className="alert alert-danger alert-dismissible fade show" role="alert">
                <strong>{error}</strong>
            </div>}
            {success&&<div className="alert alert-success alert-dismissible fade show" role="alert">
                    SignUp Success, <Link to="/login">Login here</Link>
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>}
            <h2 className="sr-only">SignUp Form</h2>
            <div className="illustration">
                <i className="icon ion-ios-navigate"><img src={logo300} alt="logo"  style={{maxWidth:'90%'}}/></i>
            </div>
            <div className="form-group">
                <input className="form-control" 
                type="text"  
                placeholder="Username" 
                minLength={6} 
                value={username}
                onChange={e=>{
                    setUsername(e.target.value)
                }}
                />
            </div>
            <div className="form-group">
                <input className="form-control" 
                    type="password"  
                    placeholder="Password" 
                    minLength={8}
                    value={password}
                    onChange={e=>{
                        setPassword(e.target.value);
                    }}
                />
                <input className="form-control" 
                    type="password"  
                    placeholder="Repeat Password" 
                    minLength={8}
                    value={password2}
                    onChange={e=>{
                        setPassword2(e.target.value);
                    }}
                />
            </div>
            <Select 
                isSearchable='false'
                placeholder='Select Account Type'
                onChange={e=>{setType(e.value)}}
                options={[
                    {value:'local',label:'Local'},
                    {value:'national',label:'National'}
                ]}
            />
            <div className="form-group"><button className="btn btn-primary btn-block" type="submit" style={{background: '#2bb673'}}>Sign Up</button></div>
            <Link className="forgot" to="/login">Already have an account? Login here</Link>
        </form>
    </section> 
  );
}
 
export default SignUp;