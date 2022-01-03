import {useState,useEffect} from 'react';
import { useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom'
const CreatePost = () => {
    
    const user = useSelector((state)=>state.user.user);
    const history = useHistory();
    const [title,setTitle]=useState('');
    const [body,setBody]=useState('');
    const [image,setImage]=useState('');
    const [actualImage,setActualImage]=useState('');
    const [error,setError]=useState('');
    const [success,setSuccess]=useState(false);
    const [status,setStatus]=useState('');
    const [toggle,setToggle]=useState(1);
    const [articles,setArticles]=useState([]);


    useEffect(()=>{
        setImage(generateID());
    },[toggle]);

    useEffect(()=>{
        const fetchArticles=async()=>{
            //user.username
            const res = await fetch(`/api/articles/author/${user.username}`);
            const result = await res.json();
            setArticles(result);
        }

        fetchArticles();
    },[articles]);
    
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

    const generateID=()=>{
        let id = ''
        for(let i = 0;i<8;i++)
        {
            const c = String.fromCharCode(65+Math.floor(Math.random()*26));
            id+=c;
        }
        return id;
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        const asyncUpload = async()=>{
            console.log(user.username);
            try{
                let today = new Date().toISOString();
                setError('');
                setSuccess(false);
                if(actualImage){
                    setStatus('Uploading Image...');
                    await fetch('/api/uploadArticleImage',{
                    method:'POST',
                    body:JSON.stringify({data:actualImage,id:image}),
                    headers:{
                        'Content-Type':'application/json'
                    }
                    });

                    setStatus('Uploading article...');
                    await fetch(`/api/articles?key=${user._id}`,{
                        
                        method:'POST',
                        headers:{
                            'Content-Type':'application/json'
                        },
                        body:JSON.stringify({title,body,image:'article/'+image,author:user.username,date:today})
                    });
                    setToggle(toggle*-1);
                    setStatus('');
                    setSuccess(true);
                }
                else{
                    setStatus('Uploading article...');
                    await fetch(`/api/articles?key=${user._id}`,{
                        
                        method:'POST',
                        headers:{
                            'Content-Type':'application/json'
                        },
                        body:JSON.stringify({title,body,image:'',author:user.username,date:today})
                    });
                    setToggle(toggle*-1);
                    setStatus('');
                    setSuccess(true);
                }
            }
            catch(error){
                setSuccess(false);
                setStatus('');
                setError('Something went wrong');
            }
        }
        if(title.length<15){
            setError('Title is too short.');
        }
        else if(body.length<60){
            setError('Article body is too short.');
        }
        else{
            setError('');
            asyncUpload();
        }
    }

    const handleImageSelect =(e)=>{
        const file = e.target.files[0]
        previewImage(file);
    }

    const previewImage = (file)=>{
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend=()=>{
            setActualImage(reader.result);
        }
    }

    const handleViewArticle=(id)=>{
        const win = window.open(`/article/${id}`, "_blank");
        win.focus();
    }

    const handleDeleteArticle=(id)=>{
        try{
            fetch(`/api/articles/${id}?key=${user._id}`,{method:'DELETE'})
        }
        catch(error){
            console.error("failed to delete");
        }
        
    }


    return (
        <div>
            
            <section className="contact-clean" style={{background: '#25aae1'}}>
                <form method="post" 
                    style={{width: '800px', marginRight: 'auto', maxWidth: '90%', height: '630px', maxHeight: '700px', marginLeft: 'auto'}}
                    onSubmit={handleSubmit} 
                >
                    {status&&<div className="alert alert-primary" role="alert">
                        {status}
                        </div>
                    }
                    {success&&<div className="alert alert-success alert-dismissible fade show" role="alert">
                        Article succesfully posted.
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>}
                    {error&&<div className="alert alert-info alert-dismissible fade show" role="alert">
                        <strong>{error}</strong>
                    </div>}
                    <h2 className="text-center">Create Article</h2>
                    <div className="form-group">
                        <input 
                            className="form-control" 
                            type="text" name="name" 
                            placeholder="Title" 
                            style={{fontSize: '16px', textAlign: 'left'}} 
                            value={title}
                            onChange={e=>{setTitle(e.target.value)}}
                        />
                    
                    </div>
                    <div className="form-group">
                        <textarea className="form-control" 
                            minLength="55"
                            name="message" 
                            placeholder="Body" 
                            rows={14} 
                            style={{height: '240px', maxHeight: '300px', maxWidth: '100%', textAlign: 'justify',resize:'none'}}
                            value={body}
                            onChange={e=>{setBody(e.target.value)}}
                            />
                    </div>
                    <div className="form-group">
                        <label>Select Image</label>
                        <input className="form-control-file" type="file" onChange={handleImageSelect} accept="image/*"/>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary float-right" type="submit">Post Article </button>
                    
                    </div>
                </form>
            </section>
            {articles.length>0&&<div className="table-container">
                <h2 style={{margin:'0 auto 0 auto'}}>Your articles</h2>
                <div className="table-responsive">
                <table className="table table-striped table-hover user-approve-table" >
                    <thead className="thead-dark">
                        <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Body</th>
                        <th scope="col"  className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>

                            {articles.map(article=>{
                            return(<tr key={article.id}>
                                <td scope="row">{article.title}</td>
                                <td scope="row">{article.body.length>100?article.body.substring(0,100):article.body}</td>
                                <td scope="row" style={{textAlign:'center',display:'flex'}}>
                                    <button className="btn btn-success" style={{margin:'0 5 auto 0'}} onClick={()=>{handleViewArticle(article._id)}}>View</button>
                                    <button className="btn btn-danger"style={{margin:'0 0 auto 5'}} onClick={()=>{handleDeleteArticle(article._id)}}>Delete</button>
                                </td>
                                
                            </tr>)}
                            
                            )
                            
                            }

                    </tbody>
                </table>
                </div>
                
            </div>}
            </div>

      );
}
 
export default CreatePost;