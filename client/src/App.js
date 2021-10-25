
import VaccineRecords from "./components/VaccineRecords";
import {BrowserRouter as Router } from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <h1>Welcome</h1>
          <VaccineRecords />

        </header>
      </Router>
      
    </div>
  );
}

export default App;
