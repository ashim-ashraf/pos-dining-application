/*eslint-disable*/
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function VendorSidebar() {
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  const vendorName = useSelector((state) =>  state.vendor.vendor.restaurantName)
  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-green-100 flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
            <i className="fas fa-bars"></i>
          </button>
          {/* Brand */}
          <Link
            className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-2 px-0"
            to="/vendors/dashboard"
          >
            {vendorName}
          </Link>
          {/* User */}
          <ul className="md:hidden items-center flex flex-wrap list-none">
            <li className="inline-block relative">
              
            </li>
            <li className="inline-block relative">
              
            </li>
          </ul>
          {/* Collapse */}
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link
                    className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                    to="/vendors/dashboard"
                  >
                    {vendorName}
                  </Link>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>
            {/* Form */}
            <form className="mt-6 mb-4 md:hidden">
              <div className="mb-3 pt-0">
                <input
                  type="text"
                  placeholder="Search"
                  className="border-0 px-3 py-2 h-12  border-solid  border-blueGray-500 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
                />
              </div>
            </form>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <div className="flex space-x-2 items-center ">
            <i className="fa-solid fa-chart-line"></i>
            <Link to="/vendors/dashboard" className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 no-underline">
              Dashboard
            </Link>
            </div>
            

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <div className="flex space-x-2 items-center ">
            <i className="fa-solid fa-table-columns"></i>
            <Link to="/vendors/table-management" className=" md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1  no-underline">
              Tables
            </Link>
            </div>
          

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <div className="flex space-x-2 items-center ">
            <i className="fa-solid fa-square-caret-down"></i>
            <Link to="/vendors/menu" className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1  no-underline">
              Menu
            </Link>
            </div>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <div className="flex space-x-1 items-center ">
            <i className="fa-solid fa-arrow-up-short-wide"></i>
            <Link to="/vendors/orders" className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1  no-underline">
              Orders
            </Link>
            </div>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <div className="flex space-x-1 items-center ">
            <i className="fa-solid fa-comments"></i>
            <Link to="/vendors/chat" className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1  no-underline">
              Chats
            </Link>
            </div>

             {/* Divider */}
             <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <div className="flex space-x-1 items-center ">
            <i className="fa-solid fa-user"></i>
            <Link to="/vendors/profile" className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1  no-underline">
              Profile
            </Link>
            </div>
            
          </div>
        </div>
      </nav>
    </>
  );
}
