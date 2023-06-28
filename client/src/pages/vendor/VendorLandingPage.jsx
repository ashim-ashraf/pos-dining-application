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
    axios.get(`/api/vendors/listed-restaurant/${vendorId}`).then(async(res) => {
      setRestaurant(res.data)
      await setShowRegistration(true);
    }).catch(() => {
      console.log("restaurant not listed")
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  

  return (
    <>
     <VendorLayout>
     <div className="px-4 pt-24 md:px-10 mx-auto w-full -m-24 ">
     {showRegistration ? (<ListRestaurant  Restaurant={Restaurant}  />) : (<VendorLanding />)}
      </div>
     </VendorLayout>
    </>
  );
}

export default VendorLandingPage;
