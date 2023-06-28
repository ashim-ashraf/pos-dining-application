import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminCardStats from "./AdminCardStats";

// components


export default function AdminHeaderStats() {

  const [statistics, setStatistics] = useState({})

  useEffect(() => {
    axios.get("/api/admin/card-stats").then((res) => {
      setStatistics(res.data)
    }).catch((error) => {
      console.log(error)
    })
  }, [])
  
  return (
    <>
      {/* Header */}
      <div className="relative md:pb-12 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap ">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4 ">
                <AdminCardStats
                  statSubtitle="Top Seller"
                  statTitle={statistics?.topSeller?.restaurantName}
                  statArrow="up"
                  statPercent={statistics?.topSeller?.totalOrders}
                  statPercentColor="text-emerald-500"
                  statDescripiron="orders for the month"
                  statIconName="far fa-chart-bar"
                  statIconColor="bg-red-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <AdminCardStats
                  statSubtitle={"Sale -" + statistics?.topSeller?.restaurantName}
                  statTitle={statistics?.topSeller?.totalOrders}
                  statArrow="down"
                  statPercent="3.48"
                  statPercentColor="text-red-500"
                  statDescripiron="Since last day"
                  statIconName="fas fa-chart-pie"
                  statIconColor="bg-orange-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <AdminCardStats
                  statSubtitle="Visitors Today"
                  statTitle={statistics?.dailyCount}
                  statArrow="down"
                  statPercent="1.10"
                  statPercentColor="text-orange-500"
                  statDescripiron="Since yesterday"
                  statIconName="fas fa-users"
                  statIconColor="bg-pink-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <AdminCardStats
                  statSubtitle="Monthly Visitors"
                  statTitle={statistics?.monthlyCount}
                  statArrow="up"
                  statPercent="12"
                  statPercentColor="text-emerald-500"
                  statDescripiron="Since last month"
                  statIconName="fas fa-percent"
                  statIconColor="bg-lightBlue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
