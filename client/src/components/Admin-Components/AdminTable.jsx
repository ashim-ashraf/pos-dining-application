import React, { useEffect, useState } from "react";
import axios from "axios";
import { validateDropdown } from "../../validation/validation";
import { Toaster, toast } from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import QRCode from "react-qr-code";

function AdminTable() {
  const [seats, setSeats] = useState("");
  const [tables, setTables] = useState([]);
  const [updated, setUpdated] = useState(false);
  const [modal, setShowModal] = useState(false);
  const [deletingTableId, setDeletingTableId] = useState(null);
  const [selectedTable, setSelectedTable] = useState(null);

  useEffect(() => {
    if (!updated) {
      axios
        .get("/api/admin/get-tables")
        .then((res) => {
          setTables(res.data);
        })
        .catch((err) => {
          console.log("error", err);
        });
    }
  }, [updated, selectedTable]);

  useEffect(() => {
    setUpdated(true);
  }, [tables]);

  const handleSubmit = () => {
    if (validateDropdown(seats)) {
      axios.post("/api/admin/add-table", { seats }).then((res) => {
        setUpdated(false);
      });
    } else {
      toast.error("Select a valid option");
    }
  };

  const handleDeleteTable = (id) => {
    setDeletingTableId(id);
    setShowModal(true);
  };

  const handleConfirmDeleteTable = () => {
    axios
      .delete(`/api/admin/delete-table/${deletingTableId}`)
      .then(() => {
        setUpdated(false);
        setShowModal(false);
        setDeletingTableId(null);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const cancelDelete = () => {
    setDeletingTableId(null);
    setShowModal(false); 
  };

  return (
    <div className="flex flex-col ">
      <Toaster toastOptions={{ duration: 4000 }} />
      <div className="flex">
        <div className="w-full md:w-8/12  mb-6 mt-10 md:mb-0  ">
          <div className="w-full">
            <div className="grid grid-cols-4 grid-rows-2 gap-2">
              {tables?.length > 0 &&
                tables.map((item, index) => {
                  return (
                    <div
                      onClick={() => setSelectedTable(item)}
                      className={(item===selectedTable?"flex-col h-30  rounded-lg bg-slate-300 border-2  flex justify-center items-center border-sky-900" :"flex-col h-30  rounded-lg bg-slate-300 border-2  flex justify-center items-center border-gray-400" )}
                    >
                      <div className="w-20 h-20 mt-4 rounded-full bg-white flex justify-center items-center">
                        <div className="flex-col w-16 h-16 rounded-full bg-gray-500 flex justify-center items-center">
                          <span className="text-white text-sm font-bold">
                            {index + 1}
                          </span>
                          <span className="text-white text-xs ">
                            Seats: {item.seats}
                          </span>
                          <div
                            style={{
                              height: "auto",
                              margin: "0 auto",
                              maxWidth: 64,
                              width: "100%",
                            }}
                          ></div>
                        </div>
                      </div>
                      <button
                        className="mb-2 mr-2 ml-auto"
                        onClick={() => handleDeleteTable(item.id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  );
                })}
            </div>

            {modal && (
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
                <div className="bg-white p-4 rounded-lg">
                  <p>Are you sure you want to delete this table?</p>
                  <div className="flex justify-end mt-4">
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-lg mr-2"
                      onClick={handleConfirmDeleteTable}
                    >
                      Delete
                    </button>
                    <button
                      className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                      onClick={cancelDelete}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="w-full md:w-1/4  ml-auto mb-6 mt-10 md:mb-0  ">
          {selectedTable ? (
            <div className="px-3 border-sky-600 border-2 mb-6 ">
              <div className="font-semibold mt-1 mb-1">QR Code for Booking</div>
              <QRCode
                className="justify-center pt-1"
                size={256}
                style={{
                  height: "auto",
                  maxWidth: "100%",
                  width: "100%",
                }}
                value={selectedTable?._id || ""}
                viewBox={`0 0 256 256`}
              />

              <div className="pt-2 font-semibold">
                Seating Capacity : {selectedTable?.seats}
              </div>
              <div className="pt-2 font-semibold mb-2">Engaged Vendor : NA</div>
            </div>
          ) : (
            <div className="px-3 border-sky-600 border-2 mb-6 ">
              <div className="font-semibold  mt-1 mb-1">
                Select a table for Detailed View
              </div>
            </div>
          )}

          <div className="px-3 border-sky-600 border-2 rounded-lg">
            <label
              className="uppercase tracking-wide text-gray-700 text-xs mb-2 mt-2 flex"
              htmlFor="grid-first-name"
            >
              Number of Seats
            </label>
            <select
              className="appearance-none text-xs block w-full bg-gray-200 text-slate-900 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              name="categoryName"
              onChange={(e) => {
                setSeats(e.target.value);
              }}
              value={seats}
            >
              <option value="">Select a value</option>
              <option value="4">4</option>
              <option value="6">6</option>
            </select>
            <div className="mb-5">
              <button
                type="submit"
                className="bg-sky-700 hover:bg-sky-600 text-white font-bold text-xs py-2 rounded w-full"
                onClick={handleSubmit}
              >
                Add Table
              </button>
            </div>
          </div>

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

export default AdminTable;
