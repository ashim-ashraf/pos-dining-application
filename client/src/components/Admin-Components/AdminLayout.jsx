import React from 'react'
import AdminSidebar from './AdminSidebar'
import AdminNavbar from './AdminNav'

function AdminLayout({children}) {
  return (
    <>
    <AdminSidebar/>
    <div className="relative md:ml-64 bg-blueGray-100 ">
    <AdminNavbar/>
      
      <div className="px-4 pt-24 md:px-10 mx-auto w-full -m-24 ">
      {children}
      </div>
    </div>
  </>
  )
}

export default AdminLayout