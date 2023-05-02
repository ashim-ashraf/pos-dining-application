import React, { useEffect, useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { CgSpinner } from "react-icons/cg";

function VendorTable() {
  const [tables, setTables] = useState([]);
  const [currentTable, setCurrentTable] = useState(null);
  const [manageTable, setManageTable] = useState(false);
  const [tableNo, setTableNo] = useState("");
  const [loading, setLoading] = useState(false);
  const vendor = useSelector((state) => state.vendor.vendor);

  useEffect(() => {
    getTables();
  }, []);

  const getTables = () => {
    axios
      .get("/api/vendors/get-tables")
      .then((res) => {
        setTables(res.data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  const handleTable = async(table, tableNo) => {
    try {
      await getTables();
    setCurrentTable(table);
    setTableNo(tableNo);
    setManageTable(true);
    } catch (error) {
      toast.error("Couldn't Load Table data")
    }
    
  };

  const handleStatusChange = (entityId, status) => {
    setLoading(true);
    const tableId = currentTable._id;
    axios
      .post("/api/vendors/manage-order-status", { tableId, entityId, status })
      .then((res) => {
        console.log(res.data);
        setCurrentTable(res.data);
        getTables();
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {manageTable ? (
        <>
          <div>
            <div className="flex flex-col justify-between items-center border-b-2 pb-2 mb-4">
              <div className="ml-auto w-20">
                <button
                  onClick={(e) => {
                    setManageTable(false);
                  }}
                  className="bg-emerald-700 hover:bg-green-600 text-white font-bold py-2 mx-4 mt-2 rounded w-full"
                >
                  Go Back
                </button>
              </div>
            </div>
            <Toaster toastOptions={{ duration: 4000 }} />
            <div className="text-lg font-bold  text-center mb-4">
              Manage Table
            </div>
            <div className="flex flex-col">
              <div className="flex">
                <div className="w-full md:w-8/12  ml-auto mb-6 mt-10 md:mb-0 border-emerald-700 border-2 rounded-sm">
                  <div className="text-sm font-bold mt-1 text-center mb-4">
                    <span className="flex items-center justify-center w-full">
                      Active Order
                      {loading && (
                        <CgSpinner size={20} className="animate-spin ml-2" />
                      )}
                    </span>
                  </div>

                  <div className="">
                    <div className="relative shadow-md sm:rounded-lg">
                      <table className="  w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                          <tr>
                            <th scope="col" className="px-6 py-3">
                              Item name
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Category
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentTable?.currentOrder?.items &&
                            currentTable.currentOrder.items.map(
                              (item, index) => {
                                return (
                                  <>
                                    <tr className="bg-white ">
                                      <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                      >
                                        {item.itemName}
                                      </th>
                                      <td className="px-6 py-4">
                                        <span
                                          className={`inline-block h-3 w-3 rounded-full ${
                                            item.orderStatus === "Delivered"
                                              ? "bg-green-500"
                                              : item.orderStatus === "Cancelled"
                                              ? "bg-red-500"
                                              : item.orderStatus === "Preparing"
                                              ? "bg-orange-500"
                                              : "bg-slate-500"
                                          } text-transparent mr-2`}
                                        ></span>
                                        {item.orderStatus}
                                      </td>
                                      <td className="px-6 py-4 ">
                                        {item.count}
                                      </td>
                                      <td className="px-6 py-4">
                                        {item?.orderStatus === "Cancelled" ? (
                                          <div></div>
                                        ) : (
                                          <div>
                                            <select
                                              id="dropdown"
                                              className="focus:outline-none"
                                              value="Change Status"
                                              onChange={(e) =>
                                                handleStatusChange(
                                                  item.entityId,
                                                  e.target.value
                                                )
                                              }
                                            >
                                              <option value="">
                                                Change Status
                                              </option>
                                              <option value="Preparing">
                                                Preparing
                                              </option>
                                              <option value="Ready for Delivery">
                                                Ready for Delivery
                                              </option>
                                              <option value="Delivered">
                                                Delivered
                                              </option>
                                              <option value="Cancelled">
                                                Cancelled
                                              </option>
                                            </select>
                                          </div>
                                        )}
                                      </td>
                                    </tr>
                                  </>
                                );
                              }
                            )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/4  ml-auto mb-6 mt-10 md:mb-0 items-end ">
                  <div className="font-bold">Table No : {tableNo}</div>
                  <div className="font-bold">
                    Status : {currentTable?.status}
                  </div>
                  <div className="font-bold">Seats : {currentTable?.seats}</div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col">
            <Toaster toastOptions={{ duration: 4000 }} />
            <div className="flex">
              <div className="w-full md:w-8/12  mb-6 mt-10 md:mb-0  ">
                <div className="w-full">
                  <div className="grid grid-cols-4 grid-rows-2 gap-2">
                    {tables?.length > 0 &&
                      tables.map((item, index) => {
                        return (
                          <div
                            onClick={() => {
                              if (
                                item?.currentOrder?.restaurantId === vendor.id
                              ) {
                                handleTable(item, index + 1);
                              } else {
                                toast.error("Not Available");
                              }
                            }}
                            className={`flex-col h-28 ${
                              item?.currentOrder?.restaurantId === vendor.id
                                ? item.status === "booked" &&
                                  item.currentOrder.items
                                  ? "bg-green-300"
                                  : item.status === "open"
                                  ? "bg-gray-300"
                                  : item.status === "cleaning"
                                  ? "bg-orange-500"
                                  : item.status === "booked"
                                  ? "bg-blue-500"
                                  : "bg-slate-500"
                                : ""
                            } rounded-lg cursor-pointer border-2 border-gray-500 flex justify-center items-center`}
                          >
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
                      <span className="text-gray-700 text-sm">
                        Pending Cleaning
                      </span>
                    </li>
                    <li className="flex items-center mb-2">
                      <div className="w-10 h-4  bg-blue-500 mr-2"></div>
                      <span className="text-gray-700 text-sm">
                        Waiting for Order
                      </span>
                    </li>
                    <li className="flex items-center mb-2">
                      <div className="w-10 h-4  bg-green-500 mr-2"></div>
                      <span className="text-gray-700 text-sm">
                        Food delivered
                      </span>
                    </li>
                    <li className="flex items-center mb-2">
                      <div className="w-10 h-4  bg-yellow-500 mr-2"></div>
                      <span className="text-gray-700 text-sm">
                        Order Being Prepared
                      </span>
                    </li>
                    <li className="flex items-center mb-2">
                      <div className="w-10 h-4  bg-white mr-2"></div>
                      <span className="text-gray-700 text-sm">
                        Tabel Unoccupied
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default VendorTable;
