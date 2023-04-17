import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";


import VendorLanding from "../../components/Vendor-Components/VendorLanding";
import ListRestaurant from "../../components/Vendor-Components/ListRestaurant";
import VendorLayout from "../../components/Vendor-Components/VendorLayout";



function VendorLandingPage() {
  const [showRegistration, setShowRegistration] = useState(false);
  const [Restaurant, setRestaurant] = useState('')
  const vendorId = useSelector((state) => state.vendor.vendor.id);

  useEffect(() => {
    console.log(vendorId);
    axios.get(`/api/vendors/listed-restaurant/${vendorId}`).then((res) => {
      console.log(res.data)
      setRestaurant(res.data)
      setShowRegistration(true);
    }).catch(() => {
      console.log("restaurant not listed")
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
