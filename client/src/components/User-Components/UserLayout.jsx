import React from 'react'
import MobileNav from '../../pages/user/MobileNav'
import { App, Page } from 'konsta/react'
import MobileNavigation from './MobileNavigation'


function UserLayout({children}) {
  return (
    <App theme="ios">
      <Page className="bg-white">
      {/* <Toaster toastOptions={{ duration: 4000 }} /> */}
        <MobileNav />
        {children}   
        <MobileNavigation />
      </Page>
    </App>
  )
}

export default UserLayout