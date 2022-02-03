import logo from '../assets/img/logo.png'
import syringe from '../assets/img/syringe.jpg';
import corona from '../assets/img/corona.jpg';
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


          <div className="temp-container" >
            <img src={corona} alt="corona" className="corona-pic" />
            
            <h3 style={{'textAlign':'center','paddingTop':'5px'}}>ABOUT COVID-19</h3>
            <p style={{'textIndent':'2em','paddingTop':'5px'}}>Coronaviruses are a group of related RNA viruses that cause diseases in mammals and birds. In humans and birds, they cause respiratory tract infections that can range from mild to lethal. Mild illnesses in humans include some cases of the common cold (which is also caused by other viruses, predominantly rhinoviruses), while more lethal varieties can cause <a href="https://en.wikipedia.org/wiki/SARS">SARS</a>, <a href="https://en.wikipedia.org/wiki/MERS">MERS</a> and COVID-19, which is causing an ongoing pandemic. In cows and pigs they cause diarrhea, while in mice they cause hepatitis and encephalomyelitis.</p>
            <p style={{'textIndent':'2em'}}> Coronaviruses constitute the subfamily Orthocoronavirinae, in the family Coronaviridae, order Nidovirales and realm Riboviria. They are enveloped viruses with a positive-sense single-stranded RNA genome and a nucleocapsid of helical symmetry. The genome size of coronaviruses ranges from approximately 26 to 32 kilobases, one of the largest among RNA viruses. They have characteristic club-shaped spikes that project from their surface, which in electron micrographs create an image reminiscent of the solar corona, from which their name derives. </p>
            <br />  
            <div className="covid-vax-container">
              <img src={syringe} alt="syringe" className="syringe" />
              <div style={{paddingLeft: '10px'}}>
                <p style={{'textIndent':'2em'}}>
                  A COVID‑19 vaccine is a vaccine intended to provide acquired immunity against severe acute respiratory syndrome coronavirus 2 (SARS‑CoV‑2), the virus that causes coronavirus disease 2019 (COVID‑19).
                </p>
                <p style={{'textIndent':'2em'}}>
                  Prior to the COVID‑19 pandemic, an established body of knowledge existed about the structure and function of coronaviruses causing diseases like severe acute respiratory syndrome (SARS) and Middle East respiratory syndrome (MERS). This knowledge accelerated the development of various vaccine platforms during early 2020.The initial focus of SARS-CoV-2 vaccines was on preventing symptomatic, often severe illness. On 10 January 2020, the SARS-CoV-2 genetic sequence data was shared through GISAID, and by 19 March, the global pharmaceutical industry announced a major commitment to address COVID‑19.
                </p>
              </div>
            </div>
            <p style={{'textIndent':'2em'}}>
              The COVID‑19 vaccines are widely credited for their role in reducing the severity and death caused by COVID‑19. Many countries have implemented phased distribution plans that prioritize those at highest risk of complications, such as the elderly, and those at high risk of exposure and transmission, such as healthcare workers.
            </p>
            <p style={{'textIndent':'2em'}}>
              As of 1 February 2022, 10.1 billion doses of COVID‑19 vaccines have been administered worldwide based on official reports from national public health agencies. By December 2020, more than 10 billion vaccine doses had been preordered by countries, with about half of the doses purchased by high-income countries comprising 14% of the world's population.
            </p>
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
                <h3>Developers </h3>
                <p>Reynaldo San Pedro&nbsp;<br />Nimrod Manalaysay<br />Emmanuel Dilig<br />Jordan Balbuena<br />Chris John Dela Cruz</p>
                <br />
                <h3>Special Thanks to </h3>
                <p>Engr. Shiela May Liwag&nbsp;<br /><a href="https://www.facebook.com/justinsandique" target="_blank" style={{color:'rgba(255,255,255,1)'}}>Justin Sandique</a></p>
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