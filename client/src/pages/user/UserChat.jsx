import React from 'react'
import UserLayout from '../../components/User-Components/UserLayout'
import ChatLayout from '../../components/User-Components/User-Chat/ChatLayout'

function UserChat() {
  return (
   <UserLayout>
        <ChatLayout/>
   </UserLayout>
  )
}

export default UserChat