import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserLoginPage from "./pages/user/UserLoginPage";
import UserSignupPage from "./pages/user/UserSignupPage";
import VendorSignupPage from "./pages/vendor/VendorSignupPage";
import LandingPage from "./pages/user/LandingPage";
import HomePage from "./pages/user/HomePage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/signup" element={<UserSignupPage />} />
          <Route path="/login" element={<UserLoginPage />} />
          <Route path='/home' element={<HomePage/>}/>
          <Route path='/vendors/signup' element={<VendorSignupPage/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
