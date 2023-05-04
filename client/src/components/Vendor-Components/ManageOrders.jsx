import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useSelector } from 'react-redux';

function ManageOrders() {
  const [orders, setOrders] = useState(null)
  const vendorId = useSelector((state) => state.vendor.vendor.id);

  const getAllOrders = () => {
    axios.get(`/api/vendors/get-orders/${vendorId}`).then((res) => {
      setOrders(res.data)
    }).catch((error) => {
      toast.error("Could Not fetch any orders")
    })
  }

  
  useEffect(() => {
    getAllOrders()
  }, [])
  
  return (
    <div>{orders}</div>
  )
}

export default ManageOrders