import React, { useEffect, useState } from "react";
import UserLayout from "../../components/User-Components/UserLayout";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Block, BlockTitle, Button } from "konsta/react";
import { userOrder } from "../../features/authSlices/userSlice";
import { Link } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import useCart from "../../components/User-Components/Cart-Functions";

function Orders() {
  const { getCart } = useCart();
  const table = useSelector((state) => state.user.table);
  const [order, setOrder] = useState(null);
  const [allDelivered, setAllDelivered] = useState(false);
  const [allCancelled, setAllCancelled] = useState(false);
  const dispatch = useDispatch();
  const [detailedCart, setDetailedCart] = useState(getCart());

  useEffect(() => {
    getOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getOrders = () => {
    axios
      .get(`/api/users/orders/${table}`)
      .then(async (res) => {
        await dispatch(userOrder(res.data));
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
        toast.error("You haven't ordered yet!");
        console.log(err);
      });
  };

  const cancelOrderItem = (item) => {
    const entityId = item.entityId;
    const tableId = table;
    let status = "Cancelled";
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
      <Toaster toastOptions={{ duration: 4000 }} />

      {order && <BlockTitle className="bg-emerald-100 p-4 md:px-64">
        Active Restaurant : {detailedCart.restaurantName}
      </BlockTitle>}

      <Block className="md:px-96">
        {order?.items.length > 0 ? (
          <>
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
                          <td className="py-2 mt-4">
                            <div className="flex justify-center items-center text-center">
                              <div
                                className={`h-3 w-3 rounded-full mt-1.5 ${
                                  item.orderStatus === "Delivered"
                                    ? "bg-green-500"
                                    : item.orderStatus === "Cancelled"
                                    ? "bg-red-500"
                                    : item.orderStatus === "Preparing"
                                    ? "bg-orange-500"
                                    : "bg-slate-500"
                                } text-transparent mr-2`}
                              ></div>
                              <span className="text-center">
                                {item.orderStatus}
                              </span>
                            </div>
                          </td>

                          <td className=" px-8  align-middle text-center">
                            {item.count}
                          </td>
                          <td className="  align-middle">
                            {item.orderStatus === "Pending" ? (
                              <Button
                                outline
                                onClick={() => cancelOrderItem(item)}
                              >
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
          </>
        ) : (
          <>
            {" "}
            <div className="fixed inset-0  flex items-center justify-center flex-col">
              <div>
                <img
                  className="h-[60vh] w-full xs:h-[24vh]"
                  src="https://cdn3.iconfinder.com/data/icons/food-delivery-aesthetics-vol-2/256/No_Online_Orders-512.png"
                  alt=""
                />
              </div>
            </div>
          </>
        )}
      </Block>

      <Block className="left-0 bottom-10 fixed md:px-96">
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
