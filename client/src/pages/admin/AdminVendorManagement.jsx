import React from 'react'
import AdminLayout from '../../components/Admin-Components/AdminLayout'
import VendorsList from '../../components/Admin-Components/VendorsList'

function AdminVendorManagement() {
  return (
    <AdminLayout>
    <div><VendorsList/></div>
   </AdminLayout>
  )
}

export default AdminVendorManagement