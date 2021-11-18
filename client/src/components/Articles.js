import {useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
import logo from '../assets/img/logo.png'
const Articles = () => {
    const [articles,setArticles]=useState([]);
    
    const [currentPage,setCurrentPage]= useState(1);
    const [hasNextPage,setHasNextPage]=useState(false);
    const [hasPreviousPage,setHasPreviousPage]=useState(false);

    useEffect(()=>{
        const fetchArticles = async()=>{
            const nextPage = currentPage+1;
            if(currentPage>1){
                setHasPreviousPage(true);
            }
            else{
                setHasPreviousPage(false);
            }

            const res = await fetch('/api/articles/page/'+currentPage);
            const resArray =await res.json();
            setArticles(resArray);
            window.scrollTo(0, 0);
            if(resArray.length>0){
                const res2 = await fetch('/api/articles/page/'+nextPage);
                const res2Array = await res2.json();
                if(res2Array.length>0){
                    setHasNextPage(true);
                }
                else{
                    setHasNextPage(false);
                }
            }
        }
       fetchArticles();
    },[currentPage]);
    
    
    return ( 
        <div className="li-article-list" style={{marginTop:'50px',marginBottom:'50px'}}>
            <h2>Articles</h2>
            {articles.map(article=>{return(
                <div className="li-article" key={article._id}>
                    <div className="li-article-image-container">

                    {article.image.trim().length===0&&<img src={logo} className="li-article-image" />}
                    {article.image.trim().length>0&&<img src={'https://res.cloudinary.com/SoftDevG2/image/upload/v1/'+article.image} className="li-article-image" />
                    
                    }
                    </div>
                    <div className="li-article-text">
                    <h5 style={{textIndent:"1em"}}>{article.title}</h5>
                    <p className="text-secondary" style={{textIndent:"2em"}}>
                        {article.body.length>150?article.body.substring(0,145)+'...':article.body}
                    </p>
                    <Link to={"/article/"+article._id}><i>Read more...</i></Link>
                </div>  
            </div>
            );  
            })}
            <div style={{display:'flex',justifyContent:'space-around',width:'90%'}}>
                {hasPreviousPage &&<button className='btn btn-info' onClick={e=>{setCurrentPage(currentPage-1)}}>previous</button>}
                {hasNextPage && <button className='btn btn-info' onClick={e=>{setCurrentPage(currentPage+1)}}>next</button>}
            </div>

            {!articles.length&&<h2 className="text-info">No articles found</h2>}
        </div>

     );
}
 
export default Articles;