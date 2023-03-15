import Singupform from "./components/singupform";
import Loginform from "./components/Loginform";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/signup" element={<Singupform />} />
          <Route path="/" element={<Loginform />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
