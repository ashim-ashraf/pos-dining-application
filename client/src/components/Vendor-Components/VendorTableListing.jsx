import React, { useEffect, useState } from "react";
import axios from "axios";
import { Toaster } from "react-hot-toast";


function VendorTable() {
  const [tables, setTables] = useState([]);
  const [updated, setUpdated] = useState(false);


  useEffect(() => {
    if (!updated) {
      axios
        .get("/api/vendors/get-tables")
        .then((res) => {
          setTables(res.data);
        })
        .catch((err) => {
          console.log("error", err);
        });
    }
  }, [updated]);

  useEffect(() => {
    setUpdated(true);
  }, [tables]);

 
 

  return (
    <div className="flex flex-col">
      <Toaster toastOptions={{ duration: 4000 }} />
      <div className="flex">
        <div className="w-full md:w-8/12  mb-6 mt-10 md:mb-0  ">
          <div className="w-full">
            <div className="grid grid-cols-4 grid-rows-2 gap-2">
              {tables?.length > 0 &&
                tables.map((item, index) => {
                  return (
                    <div className="flex-col h-28  rounded-lg bg-slate-300 border-2 border-gray-500 flex justify-center items-center">
                      <div className="w-20 h-20  rounded-full bg-white flex justify-center items-center">
                        <div className="flex-col w-16 h-16 rounded-full bg-gray-500 flex justify-center items-center">
                          <span className="text-white text-sm font-bold">
                            {index + 1}
                          </span>
                          <span className="text-white text-xs ">
                            Seats: {item.seats}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/4  ml-auto mb-6 mt-10 md:mb-0  ">
        

          <div className="px-3 border-sky-600 border-2 rounded-lg mt-10 ">
            <label
              className="uppercase tracking-wide text-gray-700 text-xs mb-2 mt-2 flex"
              htmlFor="grid-first-name"
            >
              Colour Code
            </label>
            <ul className="list-disc ">
              <li className="flex items-center mb-2">
                <div className="w-10 h-4 bg-red-500 mr-2"></div>
                <span className="text-gray-700 text-sm">Pending Cleaning</span>
              </li>
              <li className="flex items-center mb-2">
                <div className="w-10 h-4  bg-blue-500 mr-2"></div>
                <span className="text-gray-700 text-sm">Waiting for Order</span>
              </li>
              <li className="flex items-center mb-2">
                <div className="w-10 h-4  bg-green-500 mr-2"></div>
                <span className="text-gray-700 text-sm">Food delivered</span>
              </li>
              <li className="flex items-center mb-2">
                <div className="w-10 h-4  bg-yellow-500 mr-2"></div>
                <span className="text-gray-700 text-sm">
                  Order Being Prepared
                </span>
              </li>
              <li className="flex items-center mb-2">
                <div className="w-10 h-4  bg-gray-400 mr-2"></div>
                <span className="text-gray-700 text-sm">Tabel Unoccupied</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VendorTable;
