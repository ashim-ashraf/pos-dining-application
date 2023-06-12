import { Navbar } from "konsta/react";
import React from "react";
import { useNavigate } from "react-router-dom";

function MobileNav({ children }) {
  const navigate = useNavigate()

  return (
    <div>
      {/* Mobile Nav */}
      <div className="block md:hidden">
        <Navbar title="Yummers" className="bg-emerald-500" />
      </div>

      {/* Web Nav */}
      <div className="hidden md:block">
        <header className="bg-white">
          <div className="container px-40 flex items-center p-2">
            {/* logo */}
            <div className="cursor-pointer mr-auto md:w-48 flex items-center gap-4 md:h-14 ">
              <img
              onClick={() => navigate("/")}
                className="h-full"
                src="https://yummersbucket.s3.ap-south-1.amazonaws.com/1684399184027-Black_Brown_Retro_Rustic_Restaurant_Bar_Logo_-removebg-preview.png"
                alt="logo"
              />
              {/* <div  className="font-bold font-sans font-lg ">Yummers</div> */}
            </div>
            {/* search */}
            <div>{children}</div>

            {/* buttons */}
            <nav className="contents">
              <ul className="ml-4 xl:w-48 flex items-center justify-end">
              {/* cart */}
              <li className="ml-2 lg:ml-4 relative inline-block">
                  <div className="cursor-pointer" onClick={() => {navigate("/cart")}}>
                    {/* <div className="absolute -top-1 right-0 z-10 bg-yellow-400 text-xs font-bold px-1 py-0.5 rounded-sm">
                      12
                    </div> */}
                    <svg
                      className="h-6  text-gray-500"
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="far"
                      data-icon="shopping-cart"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                    >
                      <path
                        fill="currentColor"
                        d="M551.991 64H144.28l-8.726-44.608C133.35 8.128 123.478 0 112 0H12C5.373 0 0 5.373 0 12v24c0 6.627 5.373 12 12 12h80.24l69.594 355.701C150.796 415.201 144 430.802 144 448c0 35.346 28.654 64 64 64s64-28.654 64-64a63.681 63.681 0 0 0-8.583-32h145.167a63.681 63.681 0 0 0-8.583 32c0 35.346 28.654 64 64 64 35.346 0 64-28.654 64-64 0-18.136-7.556-34.496-19.676-46.142l1.035-4.757c3.254-14.96-8.142-29.101-23.452-29.101H203.76l-9.39-48h312.405c11.29 0 21.054-7.869 23.452-18.902l45.216-208C578.695 78.139 567.299 64 551.991 64zM208 472c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm256 0c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm23.438-200H184.98l-31.31-160h368.548l-34.78 160z"
                      />
                    </svg>
                  </div>
                </li>
                {/* Orders */}
                <li className="ml-2 lg:ml-4 relative inline-block">
                  <div className="cursor-pointer" onClick={() => {navigate("/orders")}}>
                    {/* <div className="absolute -top-1 right-0 z-10 bg-yellow-400 text-xs font-bold px-1 py-0.5 rounded-sm">
                      3
                    </div> */}
                    <svg
                      className="h-6  text-gray-500"
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="shopping-bag"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path
                        fill="currentColor"
                        d="M128 160c0-17.67 14.33-32 32-32h128c17.67 0 32 14.33 32 32v32h64v-32c0-53.019-42.981-96-96-96H160c-53.019 0-96 42.981-96 96v32h64v-32zM408 192H40c-22.091 0-40 17.909-40 40v240c0 22.091 17.909 40 40 40h368c22.091 0 40-17.909 40-40V232c0-22.091-17.909-40-40-40zM176 360c0 13.255-10.745 24-24 24s-24-10.745-24-24 10.745-24 24-24 24 10.745 24 24zm96 0c0 13.255-10.745 24-24 24s-24-10.745-24-24 10.745-24 24-24 24 10.745 24 24zm56-96H120c-6.627 0-12-5.373-12-12s5.373-12 12-12h208c6.627 0 12 5.373 12 12s-5.373 12-12 12z"
                      ></path>
                    </svg>
                  </div>
                </li>
                
              </ul>
            </nav>
          </div>
          <hr />
        </header>
      </div>
    </div>
  );
}

export default MobileNav;
