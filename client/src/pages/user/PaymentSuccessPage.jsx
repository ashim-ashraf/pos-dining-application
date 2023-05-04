import React from 'react'
import UserLayout from '../../components/User-Components/UserLayout'
import Notification from '../../components/User-Components/Notification'
import UserFooter from '../../components/User-Components/UserFooter'

function PaymentSuccessPage() {
  return (
    <UserLayout>
        <Notification/>  
        <UserFooter/>   
    </UserLayout>
  )
}

export default PaymentSuccessPage