import logo from '../assets/img/logo.png'
import {Link} from 'react-router-dom';  
import {useEffect,useState} from 'react';
import { Image,Transform,CloudinaryContext } from 'cloudinary-react';
const Home = () => {
  const [posts,setPosts]=useState([]);
  useEffect(()=>{
    const fetchPosts = async()=>{
      const res = await fetch('/api/articles/get-three');
      const jsonresult = await res.json();
      setPosts(jsonresult);
      
    }
    fetchPosts();
  },[]);
    return ( 
      <div className="general-container"> 

      
        <div>
          <div className="jumbotron">
            <h1>Centralized Vaccination Database</h1>
            <p>Make CoVID Vaccination Validation faster and hassle free by registering to our database.</p>
            <p><Link className="btn btn-primary" role="button" to="/upload-record">Register Now</Link></p>
          </div>
          <section className="article-list">
            <div className="container">
              <div className="intro">
                <h2 className="text-center">Latest Articles</h2>
                <p className="text-center">Keep updated by reading the latest news, articles and announcements from the administrator. </p>
              </div>

              {posts&&
              
              <div className="row articles">
                {posts.map((post)=>{
                  return(
                    <div className="col-sm-6 col-md-4 item" key={post._id}>
                      <Link to={'/article/'+post._id}>
                      {post.image!==''&&
                        <CloudinaryContext cloudName="SoftDevG2">
                          <Image publicId = {post.image} alt="vax-card"  className="img-fluid rounded" loading="lazy"/>
                        </CloudinaryContext> 
                      }
                      
                      {post.image===''&&<img className="img-fluid" src={logo} style={{heigth:'150px'}}/>}
                        
                        </Link>
                      <h3 className="name">{post.title}</h3>
                      <p className="description">
                        {post.body.length>130?post.body.substring(0,130)+'...':post.body}
                      </p>
                      
                    </div>
                  );
                  
                })}
              </div>} 
            </div>
          </section>
        </div>
        <footer className="footer-dark">
          <div className="container">
            <div className="row" style={{textAlign: 'left'}}>
              <div className="col-md-6 item text">
                <h3>Vaccination Database</h3>
                <p>Centralized Vaccination Database and Information System. A Project on Software Design&nbsp;</p>
              </div>
              <div className="col-md-6 item text">
                <h3>About Us</h3>
                <p>Reynaldo San Pedro&nbsp;<br />Nimrod Manalaysay<br />Emmanuel Dilig<br />Jordan Balbuena<br />Chris John Dela Cruz</p>
              </div>
            </div>
            <div className="col item social">
              <a href="https://www.facebook.com/cjtignap"><i className="icon ion-social-facebook" /></a>
              <a href="https://github.com/cjtignap/central-repo"><i className="icon ion-social-github" /></a>
              <a href="mailto:chrisjohn.delacruz.c@bulsu.edu.ph"><i className="icon ion-email" /></a>
            </div>
            <p className="copyright">Vaccination Database © {new Date().getFullYear()}</p>
          </div>
        </footer>
              
        </div>
     );
}
 
export default Home;