import React, { useEffect, useState } from "react";
import VendorLanding from "../../components/vendor/VendorLanding";
import AdminNavbar from "../../components/vendor/AdminNavbar";
import AdminSidebar from "../../components/vendor/AdminSidebar";
import { useSelector } from "react-redux";
import axios from "axios";
import ListRestaurant from "../../components/vendor/ListRestaurant";
import VendorLayout from "../../components/vendor/VendorLayout";


function VendorLandingPage() {
  const [showRegistration, setShowRegistration] = useState("false");
  const [Restaurant, setRestaurant] = useState('')
  const vendorId = useSelector((state) => state.admin.admin.id);

  useEffect(() => {
    console.log(vendorId);
    axios.get("/api/vendors/listed-restaurant", vendorId).then((res) => {
      console.log(res.data)
      setRestaurant(res.data)
      setShowRegistration(true);
    });
  }, [])
  

  return (
    <>
     <VendorLayout>
     {showRegistration ? (<ListRestaurant  Restaurant={Restaurant}  />) : (<VendorLanding />)}
     </VendorLayout>
    </>
  );
}

export default VendorLandingPage;
