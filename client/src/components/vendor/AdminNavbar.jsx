/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

function AdminNavbar() {

    const [showDropdown, setShowDropdown] = useState(false)
    const admin = useSelector((state) =>  state.admin.admin.name)
    
    const dropdown = () => {
        if(showDropdown){
            setShowDropdown(false);
        } else {
            setShowDropdown(true)
        }
    }

    return (
    <nav className="bg-emerald-800 py-4">
  <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
    <div className="text-white font-bold text-lg">Dashboard</div>
    <div className="flex items-center">
      <div className="relative ">
      <button className="text-white font-medium mr-4" onClick={dropdown}>{admin}</button>
      {showDropdown?(<div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-lg z-10">
          <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Link 1</a>
          <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Link 2</a>
          <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Link 3</a>
        </div>):(<></>)}
        </div>
    </div>
  </div>
</nav>
  )
}

export default AdminNavbar