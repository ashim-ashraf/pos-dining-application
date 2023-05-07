import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import moment from "moment";
import { BsInfoCircle } from "react-icons/bs";

function ManageOrders() {
  const [orders, setOrders] = useState(null);
  const vendorId = useSelector((state) => state.vendor.vendor.id);
  const [showDropdown, setShowDropdown] = useState(false);
  const [detailedOrder, setDetailedOrder] = useState(null)

  const getAllOrders = () => {
    axios
      .get(`/api/vendors/get-orders/${vendorId}`)
      .then((res) => {
        console.log(res.data);
        setOrders(res.data[0].orders);
      })
      .catch((error) => {
        toast.error("Could Not fetch any orders");
      });
  };

  useEffect(() => {
    getAllOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showDetils = (items) => {
    setDetailedOrder(null)
    setDetailedOrder(items)
    setShowDropdown(true);
  };

  return (
    <div className="flex flex-col">
      <div className="flex gap-5">
        <div className="w-full md:w-8/12  mb-6 mt-10 md:mb-0  ">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                  }
                >
                  Order Id
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700"
                  }
                >
                  Email
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700"
                  }
                >
                  Date
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700"
                  }
                >
                  No of items
                </th>
              </tr>
            </thead>
            <tbody className="overflow-y-scroll">
              {orders?.map((order, index) => {
                return (
                  <>
                    {" "}
                    <tr>
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                        <span>{order._id}</span>
                      </th>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {order.totalAmount}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {moment(order.createdAt).format("DD/MM/YYYY")}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <span className="flex ">
                          {order.items.length} &nbsp;{" "}
                          <BsInfoCircle onClick={() => showDetils(order.items)} />
                        </span>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="w-full md:w-7/12  mb-6 mt-10 md:mb-0 border-2 rounded-lg border-emerald-500 ">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr className="bg-emerald-200  ">
                <th
                  className={
                    " px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                  }
                >
                  Image
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700"
                  }
                >
                  Item Name
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700"
                  }
                >
                  Category
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700"
                  }
                >
                  Selling Price
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700"
                  }
                >
                  Count
                </th>
              </tr>
            </thead>
            <tbody>
            {showDropdown &&
                      detailedOrder?.map((item, index) => {
                        return (
                          <tr key={detailedOrder._id}>
                            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                              <span>
                                <img
                                  className="w-20 h-16 object-cover rounded-lg"
                                  alt="foodimage"
                                  src={item.image}
                                />
                              </span>
                            </th>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              {item.itemName}
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              {item.category}
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              {item.sellingPrice}
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              {item.count}
                            </td>
                          </tr>
                        );
                      })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ManageOrders;
