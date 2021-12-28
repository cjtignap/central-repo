import {useEffect,useState} from 'react';
import { useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom'

const VerifyUsers = () => {
    const user = useSelector((state)=>state.user.user);
    const history = useHistory();
    const [accounts,setAccounts]=useState([]);
    
    useEffect(()=>{
        if(user){
            if(user.type!=='national'){
                history.push('/');
            }
        }
        else{
            history.push('/');
        }
    },[user]);
    useEffect(()=>{
        const fetchAccounts = async()=>{
            const res = await fetch('/api/auth/getPending');
            const resArray = await res.json();
            setAccounts(resArray);
        }
        fetchAccounts();
    },[accounts]);

    const approveAccount = async(id)=>{
        try{
            const res = await fetch('/api/auth/approveUser',{
                method:'POST',
                headers:{
                'Content-Type':'application/json'},
                body:JSON.stringify({id})
            });
        }
        catch(error){
            console.log(error.message);
        }
    }

    return ( 
        <div className="table-container table-responsive">
            <div className="user-approve-description">
                <h2>Verify User Registration</h2>
                <h5>Finish pending users registrations.</h5>
                <p>Approve or reject users registration.<br />Double check <i>Username</i> before accepting. <br /> 
                    <strong>Only approve users that submitted request.</strong><br />
                    <strong>Only reject user's that is certainly not authorized.</strong>
                </p>
            </div>
            <table className="table table-striped table-hover user-approve-table" >
            <thead className="thead-dark">
                <tr>
                <th scope="col">Username</th>
                <th scope="col">Name</th>
                <th scope="col">User Type</th>
                <th scope="col" colSpan={2} className="text-center">Action</th>
                </tr>
            </thead>
            <tbody>
                {accounts.map((account)=>{
                    return (<tr key={account.username}>
                        <td scope="row">{account.username}</td>
                        <td>{account.name}</td>
                        <td>{account.type}</td>
                        <td><button className="btn btn-success" onClick={()=>{approveAccount(account._id)}}>Approve</button></td>
                        <td><button className="btn btn-danger">Reject</button></td>
                    </tr>);
                })}
            </tbody>
            </table>
        </div>
  
     );
}
 
export default VerifyUsers;