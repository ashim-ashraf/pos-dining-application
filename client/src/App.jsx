import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/user/home";
import RestaurantDetailPage from "./pages/user/RestaurantDetailPage";
import {
  AdminCheckLogin,
  AdminIsLogged,
  VendorCheckLogin,
  VendorIsLogged,
} from "./auth/auth";
import VendorSignupPage from "./pages/vendor/VendorSignupPage";
import VendorLoginPage from "./pages/vendor/VendorLoginPage";
import CategoryManagementPage from "./pages/vendor/CategoryManagementPage";
import VendorRegistrationPage from "./pages/vendor/VendorRegistrationPage";
import VendorLandingPage from "./pages/vendor/VendorLandingPage";
import NotFoundPage from "./pages/user/NotFoundPage";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminTableManagement from "./pages/admin/AdminTableManagement";

import "@fortawesome/fontawesome-free/css/all.min.css";
import AdminVendorManagement from "./pages/admin/AdminVendorManagement";
import VendorTableManagement from "./pages/vendor/VendorTableManagement";
import AdminBannerManagement from "./pages/admin/AdminBannerManagement";
import Cart from "./pages/user/Cart";
import Orders from "./pages/user/Orders";
import OrderManagementPage from "./pages/vendor/OrderManagementPage";
import Billing from "./pages/user/Billing";
import PaymentSuccessPage from "./pages/user/PaymentSuccessPage";
import UserChat from "./pages/user/UserChat";
import VendorChat from "./pages/vendor/VendorChat";
import VendorDashboard from "./pages/vendor/VendorDashboard";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>

        <Route path="/" element={<Homepage />} />
        <Route path="/restaurant/:restaurantId" element={<RestaurantDetailPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/success" element={<PaymentSuccessPage />} />
        <Route path="/chat" element={<UserChat />} />



        <Route element={<VendorIsLogged/>}>
            <Route path="/vendors/signup" element={<VendorSignupPage />} />
            <Route path="/vendors/login" element={<VendorLoginPage />} />
          </Route>

          <Route element={<VendorCheckLogin/>}>
            <Route path="/vendors/dashboard" element={<VendorDashboard />} />
            <Route path="/vendors/menu" element={<CategoryManagementPage />} />
            <Route path="/vendors/registration"element={<VendorRegistrationPage />}/>
            <Route path="/vendors/profile" element={<VendorLandingPage />} />
            <Route path="/vendors/table-management" element={<VendorTableManagement/>} />
            <Route path="/vendors/orders" element={<OrderManagementPage/>} />
            <Route path="/vendors/chat" element={<VendorChat/>} />
          </Route>

          {/* admin routes */}
          <Route element={<AdminIsLogged />}>
            <Route path="/admin/login" element={< AdminLoginPage />} />
        </Route>

          <Route element={<AdminCheckLogin />}>
           <Route path="/admin/dashboard" element={<AdminDashboard />}/>
           <Route path="/admin/table-management" element={<AdminTableManagement />}/>
           <Route path="/admin/vendor-management" element={<AdminVendorManagement />}/>
           <Route path="/admin/banner-management" element={<AdminBannerManagement />}/>
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
