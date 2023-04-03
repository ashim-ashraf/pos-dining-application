import React from 'react'
import RegistrationForm from '../../components/vendor/RegistrationForm'
import AdminSidebar from '../../components/vendor/AdminSidebar'
import AdminNavbar from '../../components/vendor/AdminNavbar'


function VendorRegistrationPage() {
  return (
    <>
    <AdminSidebar/>
    <div className="relative md:ml-64 bg-blueGray-100">
    <AdminNavbar/>
      
      <div className="px-4 pt-24 md:px-10 mx-auto w-full -m-24 ">
      <RegistrationForm/>
      </div>
    </div>
  </>
  )
}

export default VendorRegistrationPage