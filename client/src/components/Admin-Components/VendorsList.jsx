import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Toggle } from "konsta/react";
import { Toaster, toast } from "react-hot-toast";

export default function VendorsList({ color }) {
  const [vendors, setVendors] = useState([]);
  const [updated, setUpdated] = useState(false)

  const getVendors = () => {
    axios
      .get("/api/admin/get-vendors")
      .then((res) => {
        setVendors(res.data);
        setUpdated(true)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleApproval = (id,status) => {
    let currentStatus= status
    axios
    .put(`/api/admin/vendor-approval/${id}`,{currentStatus})
    .then(response => {
      console.log("Vendor approval status updated successfully!");
      setUpdated(false)
      // Do any other actions you need after the approval status is updated
    })
    .catch(error => {
      console.error("Error updating vendor approval status:", error);
    });
  }

  useEffect(() => {
    if(!updated){
      getVendors();
    }
  }, [updated]);

  return (
    <>
    <Toaster toastOptions={{ duration: 4000 }} />
      <div
        className={
          "mt-8 relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
        }
      >
        <div className="rounded-t mb-0  py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                className={
                  "font-semibold text-lg " +
                  (color === "light" ? "text-blueGray-700" : "text-white")
                }
              >
                Vendor List
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Restaurant
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Email
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Phone
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Liscense No
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Approval
                </th>
                
              
             
              </tr>
            </thead>
            <tbody>
              {vendors?.length > 0 &&
                vendors.map((item, index) => {
                  if (!item.restaurantName) {
                    return null;
                  }
                  return (
                    <tr>
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                        <span>{item.restaurantName}</span>
                      </th>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {item.email}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {item.phone}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {item.liscenceNo}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {item.vendorStatus ? (
                           <Toggle
                           component="div"
                           className="-my-1 k-color-brand-green "
                           checked={true}
                           onClick={() => {handleApproval(item._id,false)}}
                         />
                        ) : (
                          <Toggle
                          component="div"
                          className="-my-1 k-color-brand-green "
                          checked={false}
                          onClick={() => {handleApproval(item._id,true)}}
                        />
                        )}
                      </td>
                      
                      
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

VendorsList.defaultProps = {
  color: "light",
};

VendorsList.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
