import React from 'react'
import VendorLanding from '../../components/vendor/VendorLanding'
import AdminNavbar from '../../components/vendor/AdminNavbar'
import AdminSidebar from '../../components/vendor/AdminSidebar'



function VendorLandingPage() {
  return (
    <>
      <AdminSidebar/>
      <div className="relative md:ml-64 bg-blueGray-100">
      <AdminNavbar/>
        
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
        <VendorLanding/>
        </div>
      </div>
    </>
  )
}

export default VendorLandingPage