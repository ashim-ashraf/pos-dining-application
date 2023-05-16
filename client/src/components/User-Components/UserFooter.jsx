import { Preloader } from 'konsta/react';
import React, { useEffect, useState } from 'react'

function UserFooter() {
    const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const delay = 1000; // Delay in milliseconds (2 seconds)
    const timer = setTimeout(() => {
      setShowFooter(true);
    }, delay);

    return () => clearTimeout(timer);
  }, []);

  if (!showFooter) {
    return (<>
    <div className="flex justify-center items-center h-screen">
              <div className="text-center">
                <Preloader size="w-16 h-16" />
              </div>
            </div>
    </>)
  }
  return (
    <div>
    <div className=" bg-slate-100">
        <div className="max-w-2xl mx-auto text-white mb-8">
            {/* <div className="text-center">
                <h3 className="text-3xl mb-3"> Download our app </h3>
                <p> Stay fit. All day, every day. </p>
                <div className="flex justify-center my-10">
                    <div className="flex items-center border w-auto rounded-lg px-4 py-2  mx-2">
                        <img src="https://cdn-icons-png.flaticon.com/512/888/888857.png" alt='' className="w-7 md:w-8"/>
                        <div className="text-left ml-3">
                            <p className='text-xs text-gray-200'>Download on </p>
                            <p className="text-sm md:text-base"> Google Play Store </p>
                        </div>
                    </div>
                    <div className="flex items-center border w-auto rounded-lg px-4 py-2 mx-2">
                        <img alt='' src="https://cdn-icons-png.flaticon.com/512/888/888841.png" className="w-7 md:w-8"/>
                        <div className="text-left ml-3">
                            <p className='text-xs text-gray-200'>Download on </p>
                            <p className="text-sm md:text-base"> Apple Store </p>
                        </div>
                    </div>
                </div>
            </div> */}
            <div className="mt-6 flex flex-col md:flex-row md:justify-between items-center text-sm text-gray-400">
                <p className="order-2 md:order-1 mt-4 mb-4 md:mt-0"> &copy; Yummers, 2021. </p>
                <div className="order-1 md:order-2">
                    <span className="px-2">About us</span>
                    <span className="px-2 border-l">Contact us</span>
                    <span className="px-2 border-l">Privacy Policy</span>
                </div>
            </div>
        </div>
    </div></div>
  )
}

export default UserFooter