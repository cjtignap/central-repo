import {useEffect,useState} from 'react';
import { useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom'

const SearchRecords = () => {
    const user = useSelector((state)=>state.user.user);
    const [first_name,setFirstName]=useState('');
    const [last_name,setLastName]=useState('');
    const history = useHistory();
    const [records,setRecords] = useState([]);

    useEffect(()=>{
        if(user){
            if(user.type!=='local'){
                history.push('/');
            }
        }
        else{
            history.push('/');
        }
    },[user]);

    useEffect(()=>{
        const fetchRecords = async()=>{
            const res = await fetch('/api/records/search',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({first_name,last_name})
                
            });
            const resArray = await res.json();
            setRecords(resArray);
        }
        fetchRecords();
    },[records]);
    const deleteUser = (_id,first_name,last_name,vaccination_status,vaccine_brand)=>{
            _id = _id.substring(4,8);
            fetch('/api/records/',{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({_id,first_name,last_name,vaccination_status,vaccine_brand})
        });
    }
    return (
        <div className="audit-container">
            <div className="audit-subcontainer">
                <h1>Search Records</h1>
            </div>
            <div className="audit-container-search1">
                <input type="text" 
                    className="form-control" 
                    placeholder="Firstname" 
                    style={{width: '250px'}} 
                    value={first_name}
                    onChange={e=>{setFirstName(e.target.value)}}
                />
                <input type="text" 
                    className="form-control" 
                    placeholder="Lastname" 
                    style={{width: '250px'}} 
                    value={last_name}
                    onChange={e=>{setLastName(e.target.value)}}
                />
                <button className="btn btn-info">Search</button>
            </div>
            <table className="table table-striped table-hover user-approve-table" >
                <thead className="thead-dark">
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Vaccine</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                </tr>
                </thead>
                <tbody>

                {records.map(record=>{
                    return(
                        <tr key={record._id}>
                            <td scope="row">{record._id}</td>
                            <td>{record.first_name} {record.last_name}</td>
                            <td>{record.vaccine_brand}</td>
                            <td>{record.vaccination_status}</td>
                            <td><button className="btn btn-danger" onClick={()=>{deleteUser(record._id,record.first_name,record.last_name,record.vaccination_status,record.vaccine_brand)}}>Remove</button></td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
            </div>

      );
}
 
export default SearchRecords;