import logo from '../assets/img/logo.png'
import {Link} from 'react-router-dom';
const Home = () => {
    
    return ( 
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
                <p className="text-center">Nunc luctus in metus eget fringilla. Aliquam sed justo ligula. Vestibulum nibh erat, pellentesque ut laoreet vitae. </p>
              </div>
              <div className="row articles">
                <div className="col-sm-6 col-md-4 item"><a href="#"><img className="img-fluid" src={logo} /></a>
                  <h3 className="name">Article Title</h3>
                  <p className="description">Aenean tortor est, vulputate quis leo in, veraesent aliquam in tellus eu gravida. Aliquam varius finibus est, interdum justo suscipit id.</p>
                  <a className="action" href="#"><i className="fa fa-arrow-circle-right" /></a>
                </div>
                <div className="col-sm-6 col-md-4 item"><a href="#"><img className="img-fluid" src={logo} /></a>
                  <h3 className="name">Article Title</h3>
                  <p className="description">Aenean tortor est, vulputate quis leo icus. Praesent aliquam in tellus eu gravida. Aliquam varius finibus est, interdum justo suscipit id.</p>
                  <a className="action" href="#"><i className="fa fa-arrow-circle-right" /></a>
                </div>
                <div className="col-sm-6 col-md-4 item"><a href="#"><img className="img-fluid" src={logo} /></a>
                  <h3 className="name">Article Title</h3>
                  <p className="description">Aenean tortor est, vulputat rhoncus lacus. Praesent aliquam in tellus eu gravida. Aliquam varius finibus est, interdum justo suscipit id.</p>
                  <a className="action" href="#"><i className="fa fa-arrow-circle-right" /></a>
                </div>
              </div>
            </div>
          </section>
        </div>
     );
}
 
export default Home;