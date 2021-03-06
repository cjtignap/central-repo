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
                    <li className="nav-item"><Link to="/articles" className="nav-link">Latest News</Link></li>
                </ul>
                
                <span className="navbar-text actions">
                    {!user.username&&<Link className="btn btn-light action-button" role="button" to="/login">Log In</Link>}
                    
                    
                    {user.username&&
                    <div className="dropdown">
                        <button 
                            className="btn btn-secondary dropdown-toggle" 
                            type="button" 
                            id="dropdownMenuButton" 
                            data-toggle="dropdown" 
                            aria-haspopup="true" 
                            aria-expanded="false"
                            style={{backgroundColor:'#56c6c6'}}
                        >
                            {user.name.length>12?user.name.substring(0,12):user.name}
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        {user.type==='national'&&<li className="dropdown-item"><Link to="/create-post" className="nav-link">Create Post</Link></li>}
                        {user.type==='national'&&<li className="dropdown-item"><Link to="/verify" className="nav-link">Verify Users</Link></li>}
                        {user.type==='local'&&<li className="dropdown-item"><Link to="/search-records" className="nav-link">Search Records</Link></li>}
                        {user.username&&<li className="dropdown-item" ><a href="#" className="nav-link" onClick={handleLogout} style={{color:'#56c6c6'}}>Log Out</a></li>}
                        </div>
                    </div>
                      
                    }

                </span>

            </div>
            </div>
        </nav>
      );
}
 
export default Nav;