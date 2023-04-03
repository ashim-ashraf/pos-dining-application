import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserLoginPage from "./pages/user/UserLoginPage";
import UserSignupPage from "./pages/user/UserSignupPage";
import VendorSignupPage from "./pages/vendor/VendorRegistrationPage";
import LandingPage from "./pages/user/LandingPage";
import HomePage from "./pages/user/HomePage";
import { CheckLogin, IsLogged } from "./auth/auth";
import VendorPage from "./pages/user/VendorPage";
import VendorRegistrationPage from "./pages/vendor/VendorRegistrationPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>

            <Route element={<IsLogged/>}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<UserSignupPage />} />
            <Route path="/login" element={<UserLoginPage />} />
            </Route>
            
            <Route element={<CheckLogin/>}>
            <Route path="/vendors" element={<VendorPage />} />
            <Route path="/home" element={<HomePage />} />
            </Route>

            <Route path="/vendors/signup" element={<VendorSignupPage />} />
            <Route path="/vendors/registration" element={<VendorRegistrationPage />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;