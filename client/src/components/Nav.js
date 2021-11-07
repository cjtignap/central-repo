import logo from '../assets/img/logo.png'
import {Link} from 'react-router-dom'
const Nav = () => {
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
                </ul><span className="navbar-text actions"> <Link className="btn btn-light action-button" role="button" to="/login">Log In</Link></span>
            </div>
            </div>
        </nav>
      );
}
 
export default Nav;