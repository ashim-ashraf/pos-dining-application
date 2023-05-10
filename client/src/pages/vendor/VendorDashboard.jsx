import React, { useEffect, useState } from 'react'
import VendorLayout from '../../components/Vendor-Components/VendorLayout'
import CardLineChart from '../../components/Vendor-Components/Dashboard-Cards/CardLineChart'
import CardSocialTraffic from '../../components/Vendor-Components/Dashboard-Cards/CardSocialTraffic'
import CardBarChart from '../../components/Vendor-Components/Dashboard-Cards/CardBarChart'
import CardPageVisits from '../../components/Vendor-Components/Dashboard-Cards/CardPageVisits'
import HeaderStats from '../../components/Vendor-Components/Dashboard-Cards/HeaderStats'

import { useSelector } from "react-redux";
import axios from "axios";

function VendorDashboard() {

  const restaurantId = useSelector((state) => state.vendor.vendor._id);
  const [yeardata, setYearData] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/vendors/linechart-stats/${restaurantId}`)
      .then((res) => {
        setYearData(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <VendorLayout>
     <div className="relative bg-emerald-200 ">
      <HeaderStats/>
      <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardLineChart data={yeardata?.orderData}/>
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardBarChart data={yeardata?.revenueData}/>
        </div>
      </div>
      {/* <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardPageVisits />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardSocialTraffic />
        </div>
      </div> */}
    </div>
    </VendorLayout>
  )
}

export default VendorDashboard