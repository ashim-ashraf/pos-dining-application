import React, { useEffect, useState } from "react";
import UserLayout from "../../components/User-Components/UserLayout";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Block, Button } from "konsta/react";
import { userOrder } from "../../features/authSlices/userSlice";

function Orders() {
  const table = useSelector((state) => state.user.table);
  const [order, setOrder] = useState(null);
  const [updated, setUpdated] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    getOrders() 
  }, []);

  const getOrders = () => {
    axios
      .get(`/api/users/orders/${table}`)
      .then((res) => {
        dispatch(userOrder(res.data._id))
        setOrder(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
    };

  const TotalPayable = (order) => {
    let total = 0;
    order?.items.forEach((item) => {
      total += item.sellingPrice * item.count;
    });
    return total;
  };

  const cancelOrderItem = (item) => {
    const itemId = item._id;
    const tableId = table;
    let status = "Cancelled";  
    console.log(item._id, table, status);
    axios.post("/api/users/cancel-orderitem", { tableId, itemId, status }).then(() => {
      getOrders()
    }).catch((err) => {
      console.log(err)
    })
  }

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
                            item.orderStatus === "delivered"
                              ? "bg-green-500"
                              : item.orderStatus === "cancelled"
                              ? "bg-red-500"
                              : item.orderStatus === "preparing"
                              ? "bg-orange-500"
                              : "bg-slate-500"
                          } text-transparent mr-2`}
                        ></div>
                        {item.orderStatus}
                        </div>
                      </td>
                      <td className=" px-8  align-middle ">{item.count}</td>
                      <td className="  align-middle">
                        {item.orderStatus === 'Pending'?(<Button outline onClick={() => cancelOrderItem(item)}>Cancel</Button>):(<></>)}
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
            <tr>
              <td className=" px-4 py-2 font-body text-lg">Total Payable</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className=" px-4 py-2">Item Total</td>
              <td className=" px-4 py-2">{"₹" + TotalPayable(order)}</td>
            </tr>
            <tr>
              <td className=" px-4 py-2">
                <Button>Proceed To Billing</Button>
              </td>
            </tr>
          </tbody>
        </table>
      </Block>
    </UserLayout>
  );
}

export default Orders;
