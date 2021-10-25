import FindRecord from "../components/FindRecord";
import MakeRecord from "../components/MakeRecord";
import {Route, Switch,Link} from 'react-router-dom';

const VaccineRecords = () => {
    return ( 
        <div>
            <nav>
                <ul>
                    <li><Link to="/upload-record">Upload Record</Link></li>
                    <li><Link to="/find-record">Find Record</Link></li>
                </ul>
            </nav>
            <div className="content">
                <Switch>
                    <Route exact path="/upload-record">
                        <MakeRecord />
                    </Route>
                    <Route path="/find-record">
                        <FindRecord />
                    </Route>
                    <Route path="/find-record/:id">
                        <FindRecord />
                    </Route>
                </Switch>
            </div>
        </div>
     );
}
 
export default VaccineRecords;