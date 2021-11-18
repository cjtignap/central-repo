import {useParams,useHistory} from "react-router-dom";
import { Image,CloudinaryContext } from 'cloudinary-react';
import {useEffect,useState} from 'react';
const Article = () => {
    const history=useHistory();
    const {id}=useParams();
    const [article,setArticle]=useState({});
    useEffect(()=>{
        const fetchPost=async()=>{
            const res = await fetch('/api/articles/'+id);
            const jsonRes = await res.json();
            if(jsonRes.title){
                setArticle(jsonRes);
            }
            else{
                history.push('/');
            }
            
        }
        fetchPost();
    },[id]);
    return ( 
        <div>
            {article.title&&<section className="article-clean">
                <div className="container">
                    <div className="row">
                    <div className="col-lg-10 col-xl-8 offset-lg-1 offset-xl-2">
                        <div className="intro">
                        <h1 className="text-center">{article.title}</h1>
                        <p className="text-center"><span className="by">by</span> <a >{article.author}</a>
                            <span className="date">{new Date(article.date).toDateString()}</span></p>
                            {article.image!==''&&<
                                CloudinaryContext cloudName="SoftDevG2">
                                    <Image publicId = {article.image} alt="vax-card"  className="img-fluid" height="100%" />
                                </CloudinaryContext>}
                             
                            {/* <img className="img-fluid" src="assets/img/desk.jpg" /> */}
                        </div>
                        <div className="text">
                            <p style={{fontSize:'1.3em ',textIndent:'3em'}}>
                                {article.body}
                            </p>
                        </div>
                    </div>
                    </div>
                </div>
                </section>}
        </div>
        
              
    );
}
 
export default Article;