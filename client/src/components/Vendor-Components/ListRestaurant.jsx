import axios from "axios";
import { Toggle } from "konsta/react";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function ListRestaurant({ Restaurant }) {
  const [openStatus, setOpenStatus] = useState(false);
  const [showPublishButton, setShowPublishButton] = useState(false);
  const vendorId = useSelector((state) => state.vendor.vendor.id);

  useEffect(() => {
    checkApproval();
    setOpenStatus(Restaurant.openStatus);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleShopStatus = (restaurantId, status) => {
    axios
      .put(`/api/vendors/shop-status/${restaurantId}`, { status })
      .then((res) => {
        setOpenStatus(!openStatus);
      })
      .catch((error) => {
        console.error("Error updating vendor approval status:", error);
      });
  };


  const checkApproval = () => {
    axios
      .get(`/api/vendors/vendor-approval/${vendorId}`)
      .then((res) => {
        setShowPublishButton(res.data);
      })
      .catch((err) => {
        toast.error("Waiting for Approval");
      });
  };

  return (
    <div className="flex gap-10">
      <div className="relative flex flex-col min-w-0 break-words bg-white w-1/2 mb-6 shadow-xl rounded-lg mt-16">
        <div className="px-6">
          <div className="flex flex-wrap justify-center">
            <div className="w-full px-4 flex justify-center">
              <div className="relative">
                <img
                  alt="..."
                  src={Restaurant.image}
                  className="w-32 rounded-full"
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
            {showPublishButton?(<div className="mt-5">
              {openStatus ? (
                <>
                  <div className="font-bold mb-2">Shop Status : Open</div>
                  <Toggle
                    component="div"
                    className="-my-1 k-color-brand-green "
                    checked={true}
                    onClick={() => {
                      handleShopStatus(Restaurant._id, false);
                    }}
                  />
                </>
              ) : (
                <>
                  <div className="font-bold mb-2">Shop Status : Close</div>
                  <Toggle
                    component="div"
                    className="-my-1 k-color-brand-green "
                    checked={false}
                    onClick={() => {
                      handleShopStatus(Restaurant._id, true);
                    }}
                  />
                </>
              )}
            </div>):(<div className="mt-5">Not Approved</div>)}
            
          </div>
          <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
            <div className="flex flex-wrap justify-center">
              <div className="w-full lg:w-9/12 px-4">
                <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                  {Restaurant.description}
                </p>
                
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" flex flex-col min-w-0 break-words bg-white w-1/3 mb-6 shadow-xl rounded-lg mt-16">
        <div className="px-6">
          <div className="text-center mt-12">
            <h3 className="text-xl font-semibold leading-normal  text-blueGray-700 mb-2">
              Managed By :
            </h3>
            <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold ">
              <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>{" "}
              {Restaurant.name}
            </div>
            <div className="mb-2 text-blueGray-600 mt-2">
              <i className="fas  mr-2 text-lg text-blueGray-400"></i>
              {`${Restaurant.phone}`}
            </div>
          </div>
          <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
            <div className="flex flex-wrap justify-center">
              <div className="w-full lg:w-9/12 px-4">
                <Link
                  to={"/vendors/registration"}
                  className="px-8 py-3 bg-gradient-to-r from-green-400 to-blue-500 hover:from-emerald-500 hover:to-cyan-500  text-white rounded-full mr-4"
                >
                  Edit
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListRestaurant;
