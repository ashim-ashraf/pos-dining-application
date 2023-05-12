import React from 'react'
import AdminLayout from '../../components/Admin-Components/AdminLayout'
import AdminHeaderStats from '../../components/Admin-Components/Dashboard-Cards/AdminHeaderStats'
import AdminCardLineChart from '../../components/Admin-Components/Dashboard-Cards/AdminCardLineChart'

function AdminDashboard() {

  return (
    <>
   <AdminLayout>
   <div className="relative  ">
      <AdminHeaderStats/>
      <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <AdminCardLineChart/>
        </div>
        {/* <div className="w-full px-4">
          <AdminCardBarChart data={statistics?.revenueData}/>
        </div> */}
      </div>
      {/* <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <AdminCardPageVisits />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <AdminCardSocialTraffic />
        </div>
      </div> */}
    </div>
   </AdminLayout>
   </>
  )
}

export default AdminDashboard