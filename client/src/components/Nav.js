import logo from '../assets/img/logo.png'
import {Link,useHistory} from 'react-router-dom'
import {useEffect} from 'react';
import { useSelector,useDispatch} from 'react-redux';
import {login,logout,flipFlag} from '../redux/user/userActions'
const Nav = () => {
    const history =useHistory();
    const user = useSelector((state)=>state.user.user);
    const flag = useSelector((state)=>state.user.flag);
    const dispatch = useDispatch();
    useEffect(()=>{
        const  getUser=async()=>{
            try{
                const req = await fetch('/api/auth/isLoggedIn')
                const fetchedUser =  await req.json();
                if(fetchedUser){
                    dispatch(login(fetchedUser));
                }
                else{
                    dispatch(logout());
                }
            }catch(error){
                console.log(error);
            }
        };
        getUser();
    },[flag]);
    const handleLogout = (e)=>{
        const somefunc = async()=>{
            try{
                await fetch('/api/auth/logout');
                dispatch(flipFlag());
                history.push('/');
            }
            catch(error){
                console.log(error);
            }
        }
        somefunc();
    }
    return (
        <nav className="navbar navbar-light navbar-expand-md navigation-clean-button">
            <div className="container"><Link className="navbar-brand" to="/">
            <img style={{width: 'auto', height: '2em'}} src={logo} alt="logo"/>Vaccination Database</Link>
            <button data-toggle="collapse" className="navbar-toggler" data-target="#navcol-1">
                <span className="sr-only">Toggle navigation</span><span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navcol-1">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item"><Link to="/upload-record" className="nav-link">Upload Record</Link></li>
                    <li className="nav-item"><Link to="/find-record" className="nav-link">Find Record</Link></li>
                    <li className="nav-item"><a className="nav-link">{user.username}</a></li>
                </ul>
                
                <span className="navbar-text actions">
                    {!user.username&&<Link className="btn btn-light action-button" role="button" to="/login">Log In</Link>}
                    {user.username&&<a className="btn btn-light action-button" role="button" onClick={handleLogout} href="#">Log Out</a>}
                </span>

            </div>
            </div>
        </nav>
      );
}
 
export default Nav;