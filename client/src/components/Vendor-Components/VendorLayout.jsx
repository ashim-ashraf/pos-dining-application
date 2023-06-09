import React from 'react'
import VendorNavbar from './VendorNavbar'
import VendorSidebar from './VendorSidebar'

function VendorLayout({children}) {
  return (
    <>
    <VendorSidebar/>
    <div className="relative md:ml-64 bg-blueGray-100 ">
    <VendorNavbar/>
      {children}
    </div>
  </>
  )
}

export default VendorLayout


// <div className="px-4 pt-24 md:px-10 mx-auto w-full -m-24 ">
//       </div>