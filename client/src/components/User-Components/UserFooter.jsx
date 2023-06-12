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