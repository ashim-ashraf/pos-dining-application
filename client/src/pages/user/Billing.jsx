import React, { useEffect, useState } from "react";
import UserLayout from "../../components/User-Components/UserLayout";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Block, Button, Card } from "konsta/react";
import {
  clearOrder,
  ratingData,
  releiveTable,
} from "../../features/authSlices/userSlice";
import { useNavigate } from "react-router-dom";
import useCart from "../../components/User-Components/Cart-Functions";
import { saveAs } from 'file-saver';


function Billing() {
  const table = useSelector((state) => state.user.table);
  const [order, setOrder] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  

  useEffect(() => {
    getOrders();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getOrders = () => {
    axios
      .get(`/api/users/orders/${table}`)
      .then(async (res) => {
        let order = res.data;
        const filteredItems = order.items
        .filter(item => item.orderStatus !== 'Cancelled')
        .reduce((acc, curr) => {
          const existingItem = acc.find(item => item._id === curr._id);
          if (existingItem) {
            existingItem.count += curr.count;
          } else {
            acc.push(curr);
          }
          return acc;
        }, []);
        order.items = filteredItems;
        setOrder(order);
        dispatch(ratingData(order))
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const TotalPayable = (order) => {
    let total = 0;
    order?.items.forEach((item) => {
      total += item.sellingPrice * item.count;
    });
    return total;
  };

  const handlePayment = () => {
    const tableId = table;
    const amountPayable = TotalPayable(order);
    
    axios
      .post("api/users/payment", { order, tableId, amountPayable })
      .then(() => {
        clearCart();
        dispatch(releiveTable());
        dispatch(clearOrder());
        navigate("/success");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const generateBill = () => {
    axios
      .get(`/api/vendors/generate-bill/${table}/${order.restaurantId}`, {
        responseType: 'blob'
      })
      .then((response) => {
        const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
        saveAs(pdfBlob, 'test.pdf');
      })
      .catch((error) => {
        console.log(error);
      });
  };
  

  return (
    <UserLayout>
      <div className="md:px-96">
      <Card outline header="Bill Details" footer="" headerDivider footerDivider>
        <table className="border-collapse w-full">
          <thead>
            <tr>
              <th className=" px-4 py-2">Item </th>
              <th className=" px-4 py-2"> Price</th>
              <th className=" px-4 py-2">Quantity</th>
              <th className=" px-4 py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {order?.items &&
              order?.items.map((item, index) => {
                return (
                  <>
                    <tr key={index}>
                      <td className=" py-2 mt-4 ">{item.itemName}</td>
                      <td className="px-4  py-2 mt-4">{item.sellingPrice}</td>
                      <td className="px-8 py-2 mt-4 ">{item.count}</td>
                      <td className="px-4 py-2 mt-4">
                        {item.sellingPrice * item.count}
                      </td>
                    </tr>
                  </>
                );
              })}
          </tbody>
        </table>
        <hr />

        <tbody>
          <tr>
            <td className=" py-2 mt-4 font-bold">Amount Payable</td>

            <td className="px-8 py-2 mt-4 "></td>
            <td className="px-8 py-2 mt-4 "></td>
            <td className="px-7 py-2 mt-4 font-bold ">
              {"₹" + TotalPayable(order)}
            </td>
          </tr>
        </tbody>
      </Card>
      </div>

      <Block className="md:px-160">
        <table className="border-collapse w-full">
          <thead>
            <tr></tr>
          </thead>
          <tbody>
            <tr></tr>
            <tr>
              <td className=" px-4 py-2">
                {order?.items.length > 0 ? (
                  <>                  <Button
                    onClick={() => handlePayment()}
                    className="bg-orange-700 text-white px-4 py-2 mt-1 rounded"
                    to={"/billing"}
                  >
                    Pay
                  </Button>
                  <Button
                  onClick={() => generateBill()}
                  className="bg-orange-700 text-white px-4 py-2 mt-2 rounded"
                >
                  Generate Bill
                </Button>
                </>
                ) : (
                  ""
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </Block>
      <div className="bottom-0"></div>
    </UserLayout>
  );
}

export default Billing;
