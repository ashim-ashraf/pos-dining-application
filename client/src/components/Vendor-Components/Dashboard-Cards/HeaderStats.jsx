import React, { useEffect, useState } from "react";
import CardStats from "./CardStats";
import { useSelector } from "react-redux";
import axios from "axios";

// components


export default function HeaderStats() {
  const restaurantId = useSelector((state) => state.vendor.vendor._id)
  const [currentDay, setCurrentDay] = useState({})
  const [currentMonth, setCurrentMonth] = useState({})

  useEffect(() => {
    axios.get(`/api/vendors/card-stats/${restaurantId}`).then((res) => {
      setCurrentDay(res.data.currentDayData)
      setCurrentMonth(res.data.currentMonthData)
    }).catch((error) => {
      console.log(error)
    })
  }, [])
  
  return (
    <>
      {/* Header */}
      <div className="relative bg-lightBlue-600 md:pb-12 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Sales Today"
                  statTitle={currentDay.noOfOrders}
                  statArrow="up"
                  statPercent="3.48"
                  statPercentColor="text-emerald-500"
                  statDescripiron="Since last day"
                  statIconName="far fa-chart-bar"
                  statIconColor="bg-red-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Revenue Today"
                  statTitle={currentDay.totalAmount}
                  statArrow="down"
                  statPercent="3.48"
                  statPercentColor="text-red-500"
                  statDescripiron="Since last day"
                  statIconName="fas fa-chart-pie"
                  statIconColor="bg-orange-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Monthly Sale"
                  statTitle={currentMonth.noOfOrders}
                  statArrow="down"
                  statPercent="1.10"
                  statPercentColor="text-orange-500"
                  statDescripiron="Since yesterday"
                  statIconName="fas fa-users"
                  statIconColor="bg-pink-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Monthly Revenue"
                  statTitle={currentMonth.totalAmount}
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
