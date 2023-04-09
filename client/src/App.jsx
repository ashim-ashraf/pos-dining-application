import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserLoginPage from "./pages/user/UserLoginPage";
import UserSignupPage from "./pages/user/UserSignupPage";
import LandingPage from "./pages/user/LandingPage";
import HomePage from "./pages/user/HomePage";
import {
  AdminCheckLogin,
  AdminIsLogged,
  CheckLogin,
  IsLogged,
} from "./auth/auth";
import VendorPage from "./pages/user/VendorPage";
import VendorRegistrationPage from "./pages/vendor/VendorRegistrationPage";
import VendorLandingPage from "./pages/vendor/VendorLandingPage";
import VendorSignupPage from "./pages/vendor/VendorSignupPage";
import VendorLoginPage from "./pages/vendor/VendorLoginPage";
import Category from "./components/Categoryresource";
import CategoryManagementPage from "./pages/vendor/CategoryManagementPage";
import MyApp from "./mobileDesign/MobilePages/home";
import RestaurantDetailPage from "./mobileDesign/MobilePages/RestaurantDetailPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<IsLogged />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<UserSignupPage />} />
            <Route path="/login" element={<UserLoginPage />} />
          </Route>

          <Route element={<CheckLogin />}>
            <Route path="/vendors" element={<VendorPage />} />
            <Route path="/home" element={<HomePage />} />
           
          </Route>

          <Route path="/mobile/home" element={<MyApp />} />
            <Route path="/restaurant/:restaurantId" element={<RestaurantDetailPage />} />

          <Route element={<AdminIsLogged />}>
            <Route path="/vendors/signup" element={<VendorSignupPage />} />
            <Route path="/vendors/login" element={<VendorLoginPage />} />
          </Route>

          <Route element={<AdminCheckLogin />}>
            <Route path="/vendors/menu" element={<CategoryManagementPage />} />
            <Route path="/vendors/registration"element={<VendorRegistrationPage />}/>
            <Route path="/vendors/home" element={<VendorLandingPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
