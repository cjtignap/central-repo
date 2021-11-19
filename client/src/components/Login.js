import logo300 from '../assets/img/logo300.png';
import {Link,useHistory} from 'react-router-dom';
import {useState} from 'react';
import {flipFlag} from '../redux/user/userActions'
import { useDispatch} from 'react-redux';

const Login = () => {
    const dispatch = useDispatch();
    const history =useHistory();
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const [error,setError]=useState('');
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if(username==='' || password === ''){
            setError('Enter username and password');
        }
        else{
            setError('');
            try{
                const request = await fetch('/api/auth/login',{
                    method:'POST',
                    body:JSON.stringify({username,password}),
                    headers:{
                        'Content-Type':'application/json'
                    }
                });
                
                const result = await request.json();
                if(result.error){
                    setError(result.error);
                }
                else{
                    dispatch(flipFlag());
                    history.push('/');
                    setError('');
                }
            }
            catch(Error){
                setError('Network error!');
            }

        }

    }
    return ( 
        <section className="login-clean" style={{background: '#25aae1'}}>
            <form onSubmit={handleSubmit} style={{width:'400px',maxWidth:'95%'}}>
                {error&&<div className="alert alert-info alert-dismissible fade show" role="alert">
                    <strong>{error}</strong>
                </div>}
                <h2 className="sr-only">Login Form</h2>
                <div className="illustration">
                    <i className="icon ion-ios-navigate"><img src={logo300} alt="logo"  style={{maxWidth:'90%'}}/></i>
                    
                </div>
                <div className="form-group">
                    <input className="form-control" 
                        type="text"  
                        placeholder="Username" 
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
                        value={password}
                        onChange={e=>{
                            setPassword(e.target.value);
                        }}    
                    />
                </div>
                <div className="form-group"><button className="btn btn-primary btn-block" type="submit" style={{background: '#2bb673'}}>Log In</button></div>
                <Link className="forgot" to="/signup">No account yet? Sign up here</Link>
            </form>
        </section>
    );
}
 
export default Login;