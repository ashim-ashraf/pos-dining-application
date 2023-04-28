import React, { useEffect, useState } from "react";
import UserLayout from "../../components/User-Components/UserLayout";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Block, Button } from "konsta/react";
import { userOrder } from "../../features/authSlices/userSlice";
import { Link } from "react-router-dom";

function Orders() {
  const table = useSelector((state) => state.user.table);
  const [order, setOrder] = useState(null);
  const [allDelivered, setAllDelivered] = useState(false);
  const [allCancelled, setAllCancelled] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = () => {
    axios
      .get(`/api/users/orders/${table}`)
      .then(async (res) => {
        dispatch(userOrder(res.data._id));
        await setOrder(res.data);
        const allCompleted = res.data.items.every((item) => {
          return (
            item.orderStatus === "Delivered" || item.orderStatus === "Cancelled"
          );
        });
        setAllDelivered(allCompleted);

        const Cancelled = res.data.items.every((item) => {
          return item.orderStatus === "Cancelled";
        });
        setAllCancelled(Cancelled);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const cancelOrderItem = (item) => {
    const entityId = item.entityId;
    const tableId = table;
    let status = "Cancelled";
    console.log(entityId, tableId, status);
    axios
      .post("/api/users/cancel-orderitem", { entityId, tableId, status })
      .then(() => {
        getOrders();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <UserLayout>
      <Block>
        <table className="border-collapse w-full">
          <thead>
            <tr>
              <th className=" px-4 py-2">Item Name</th>
              <th className=" px-4 py-2">Status</th>
              <th className=" px-4 py-2">Quantity</th>
              <th className="  "></th>
            </tr>
          </thead>
          <tbody>
            {order?.items &&
              order?.items.map((item, index) => {
                return (
                  <>
                    <tr key={index}>
                      <td className=" px-4 py-2 mt-4 ">{item.itemName}</td>
                      <td className=" py-2  mt-4 items-center ">
                        <div className="flex">
                          <div
                            className={` h-3 w-3 rounded-full mt-1.5 ${
                              item.orderStatus === "Delivered"
                                ? "bg-green-500"
                                : item.orderStatus === "Cancelled"
                                ? "bg-red-500"
                                : item.orderStatus === "Preparing"
                                ? "bg-orange-500"
                                : "bg-slate-500"
                            } text-transparent mr-2`}
                          ></div>
                          {item.orderStatus}
                        </div>
                      </td>
                      <td className=" px-8  align-middle ">{item.count}</td>
                      <td className="  align-middle">
                        {item.orderStatus === "Pending" ? (
                          <Button outline onClick={() => cancelOrderItem(item)}>
                            Cancel
                          </Button>
                        ) : (
                          <></>
                        )}
                      </td>
                    </tr>
                  </>
                );
              })}
          </tbody>
        </table>
      </Block>

      <Block className="left-0 bottom-10 fixed">
        <table className="border-collapse w-full">
          <thead>
            <tr></tr>
          </thead>
          <tbody>
            <tr></tr>
            <tr>
              <td className=" px-4 py-2">
                {allCancelled ? (
                  <></>
                ) : (
                  <>
                    {allDelivered ? (
                      <div>
                        <Link
                          className="bg-blue-500 text-white px-4 py-2 mt-1 rounded"
                          to={"/billing"}
                        >
                          Proceed To Billing
                        </Link>
                      </div>
                    ) : (
                      ""
                    )}
                  </>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </Block>
    </UserLayout>
  );
}

export default Orders;
