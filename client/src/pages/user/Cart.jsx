import React, { useEffect, useState } from "react";
import UserLayout from "../../components/User-Components/UserLayout";
import useCart from "../../components/User-Components/Cart-Functions";
import { Block, BlockTitle, Button, Stepper } from "konsta/react";

function Cart() {
  const {
    getCart,
    increaseCount,
    decreaseCount,
    calculateTotal,
    removeFromCart,
    clearCart,
  } = useCart();
  const [updatedCart, setUpdatedCart] = useState(getCart().items);

  useEffect(() => {
    setUpdatedCart(getCart().items);
  }, []);

  function handleIncrease(item) {
    increaseCount(item);
    setUpdatedCart(getCart().items);
  }

  function handleDecrease(item) {
    decreaseCount(item);
    setUpdatedCart(getCart().items);
  }

  return (
    <UserLayout>
      {Object.keys(updatedCart).length > 0 ? (
        <>
          <Block>
            <table className="border-collapse w-full">
              <thead>
                <tr>
                  <th className=" px-4 py-2">Item Name</th>
                  <th className=" px-4 py-2">Quantity</th>
                  <th className=" px-4 py-2">Price</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(updatedCart).map((key) => (
                  <tr key={key}>
                    <td className=" px-4 py-2">{updatedCart[key].itemName}</td>
                    <td className=" px-4 py-2">
                      <Stepper
                        value={updatedCart[key].count}
                        raised
                        small
                        outline
                        onPlus={() => handleIncrease(updatedCart[key])}
                        onMinus={() => handleDecrease(updatedCart[key])}
                      />
                    </td>
                    <td className=" px-4 py-2">
                      {"₹" +
                        updatedCart[key].count * updatedCart[key].sellingPrice}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Block>
          <Block className="left-0 bottom-10 fixed">
            <table className="border-collapse w-full">
              <thead>
                <tr>
                  <td className=" px-4 py-2 font-body text-lg">Bill Details</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className=" px-4 py-2">Item Total</td>
                  <td className=" px-4 py-2">
                    {"₹" + calculateTotal(updatedCart)}
                  </td>
                </tr>
                <tr>
                  <td className=" px-4 py-2"><Button>Order Items</Button></td>
                </tr>
              </tbody>
            </table>
          </Block>
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </UserLayout>
  );
}

export default Cart;
