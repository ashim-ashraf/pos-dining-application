import React from 'react'
import { Link } from 'react-router-dom'

function ListRestaurant({Restaurant}) {

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-1/2 mb-6 shadow-xl rounded-lg mt-16">
        <div className="px-6">
          <div className="flex flex-wrap justify-center">
            <div className="w-full px-4 flex justify-center">
              <div className="relative">
                <img
                  alt="..."
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwreUEliCMhKyCOLz9oQxjUjFK_NWU55CFFw&usqp=CAU"
                  className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                />
              </div>
            </div>
          </div>
          <div className="text-center mt-12">
            <h3 className="text-xl font-semibold leading-normal  text-blueGray-700 mb-2">
              {Restaurant.restaurantName}
            </h3>
            <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold ">
              <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>{" "}
              {Restaurant.email}
            </div>
            <div className="mb-2 text-blueGray-600 mt-2">
              <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
              {`${Restaurant.restaurantType}`}
            </div>
            <div className="mb-2 text-blueGray-600">
              <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
              Liscence Number : {`${Restaurant.liscenceNo}`}
            </div>
          </div>
          <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
            <div className="flex flex-wrap justify-center">
              <div className="w-full lg:w-9/12 px-4">
                <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                  {Restaurant.description}
                </p>
                <Link to={'/vendors/registration'} class="px-8 py-3 bg-gradient-to-r from-green-400 to-blue-500 hover:from-emerald-500 hover:to-cyan-500  text-white rounded-full mr-4">Manage</Link>
              </div>
            </div>
          </div>
        </div>
      </div>


    </>
  )
}

export default ListRestaurant