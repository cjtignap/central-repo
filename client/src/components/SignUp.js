import {Link} from 'react-router-dom';
import logo300 from '../assets/img/logo300.png';
const SignUp = () => {
    const handleSubmit = (e)=>{
        e.preventDefault();
    }
    return ( 
    <section className="login-clean" onSubmit={handleSubmit}>
        <form onSubmit={e=>{e.preventDefault()}}>
        <h2 className="sr-only">SignUp Form</h2>
        <div className="illustration">
            <i className="icon ion-ios-navigate"><img src={logo300} alt="logo"  style={{maxWidth:'90%'}}/></i>
        </div>
        <div className="form-group"><input className="form-control" type="text"  placeholder="Username" minLength={6} /></div>
        <div className="form-group"><input className="form-control" type="password"  placeholder="Password" minLength={8}/></div>
        <div className="form-group"><input className="form-control" type="password"  placeholder="Repeat Password" minLength={8}/></div>
        <div className="form-group"><button className="btn btn-primary btn-block" type="submit" style={{background: '#2bb673'}}>Sign Up</button></div>
        <Link className="forgot" to="/login">Already have an account? Login here</Link>
        </form>
    </section> 
  );
}
 
export default SignUp;