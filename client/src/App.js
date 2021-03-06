
import {BrowserRouter as Router } from "react-router-dom"
import Nav from './components/Nav';
import Home from "./components/Home";
import MakeRecord from "./components/MakeRecord";
import FindRecord from "./components/FindRecord";
import {Route, Switch} from 'react-router-dom';
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import CreatePost from "./components/CreatePost";
import Article from "./components/Article";
import Articles from "./components/Articles";
import VerifyUsers from "./components/VerifyUsers";
import SearchRecords from "./components/SearchRecords";


function App() {
 

  return (
    <div className="App"> 
      <Router>
        
        <Nav />
        
        <Switch>
          <Route exact path="/search-records">
                <SearchRecords />
            </Route>
            <Route exact path="/upload-record">
                <MakeRecord />
            </Route>
            <Route exact path="/find-record">
                <FindRecord />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path="/verify">
              <VerifyUsers />
            </Route>
            <Route path="/find-record/:id">
                <FindRecord />
            </Route>
            <Route exact path="/create-post">
              <CreatePost />
            </Route>
            <Route path="/articles">
              <Articles />
            </Route>
            <Route exact path="/article/:id">
              <Article />
            </Route>
            
            <Route path="/">
              <Home />
            </Route>
            
        </Switch>
        
      </Router>
      
    </div>
  );
}

export default App;
