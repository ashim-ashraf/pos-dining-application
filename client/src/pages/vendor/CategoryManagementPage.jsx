import React from 'react'
import AdminSidebar from '../../components/vendor/AdminSidebar'
import AdminNavbar from '../../components/vendor/AdminNavbar'
import Category from '../../components/vendor/Category'


function CategoryManagementPage() {
  return (
    <>
    <AdminSidebar/>
    <div className="relative md:ml-64 bg-blueGray-100">
    <AdminNavbar/>
      
      <div className="px-4 pt-24 md:px-10 mx-auto w-full -m-24 ">
      <Category/>
      </div>
    </div>
  </>
  )
}

export default CategoryManagementPage