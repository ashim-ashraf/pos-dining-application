import React, { useEffect, useState } from "react";
import VendorLanding from "../../components/vendor/VendorLanding";
import AdminNavbar from "../../components/vendor/AdminNavbar";
import AdminSidebar from "../../components/vendor/AdminSidebar";
import { useSelector } from "react-redux";
import axios from "axios";
import ListRestaurant from "../../components/vendor/ListRestaurant";


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
      <AdminSidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />

        <div className=" md:px-10 mx-auto w-full ">
          {showRegistration ? (<ListRestaurant  Restaurant={Restaurant}  />) : (<VendorLanding />)}
        </div>
      </div>
    </>
  );
}

export default VendorLandingPage;
