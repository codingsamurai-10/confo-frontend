import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import FormPage from "./components/FormPage/FormPage";
import Routing from "./Routing";

function App() {
  return (
    <Router>
    <div className="App">
      <Routing/>
    </div>
    </Router>
  );
}

export default App;
