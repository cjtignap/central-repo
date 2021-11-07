import logo300 from '../assets/img/logo300.png';
import {Link} from 'react-router-dom';
const Login = () => {
    const handleSubmit = (e)=>{
        e.preventDefault();
    }
    return ( 
        <section className="login-clean" style={{background: '#25aae1'}}>
            <form onSubmit={handleSubmit}>
                <h2 className="sr-only">Login Form</h2>
                <div className="illustration">
                    <i className="icon ion-ios-navigate"><img src={logo300} alt="logo"  style={{maxWidth:'90%'}}/></i>
                    
                </div>
                <div className="form-group"><input className="form-control" type="text"  placeholder="Username" minLength={8}/></div>
                <div className="form-group"><input className="form-control" type="password" placeholder="Password" /></div>
                <div className="form-group"><button className="btn btn-primary btn-block" type="submit" style={{background: '#2bb673'}}>Log In</button></div>
                <Link className="forgot" to="/signup">No account yet? Sign up here</Link>
            </form>
        </section>
    );
}
 
export default Login;