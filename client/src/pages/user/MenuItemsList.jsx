import { Button, List, ListItem, Stepper } from "konsta/react";
import React, { useEffect, useState } from "react";
import useCart from "../../components/User-Components/Cart-Functions";

function MenuItemsList(props) {
  const { items, restaurantId } = props;
  const { getCart, addToCart, removeFromCart, increaseCount, decreaseCount } =
    useCart();
  const [value, setValue] = useState(false);
  const [cart, setCart] = useState(null);

  useEffect(() => {
    setCart(getCart().items);
  }, []);

  const isItemInCart = (itemId) => {
    if (!cart) return false;
    return cart.hasOwnProperty(itemId);
  };

  return (
    <List strongIos  dividersIos>
      {items?.length > 0 &&
        items.map((item, index) => (
          <div key={index}>
            <ListItem
              link
              chevronMaterial={true}
              title={item.itemName}
              text={item.sellingPrice}
              subtitle={item.category}
              media={
                <img
                  className="ios:rounded-lg material:rounded-full ios:w-20 material:w-10"
                  src={item?.image}
                  width="80"
                  alt={item.itemName}
                />
              }
            >
              {isItemInCart(item._id) ? (
                <Stepper
                  raised
                  large
                  outline
                  onPlus={() => {
                    increaseCount(item);
                    setCart(getCart().items);
                  }}
                  onMinus={() => {
                    decreaseCount(item);
                    setCart(getCart().items);
                  }}
                  min={1}
                  max={10}
                  value={cart[item._id].count}
                />
              ) : (
                <div className="grid grid-cols-3 gap-x-4">
                  <Button outline onClick={() =>{ addToCart(item, restaurantId)
                  setCart(getCart().items)}}>
                    Add
                  </Button>
                </div>
              )}
            </ListItem>
          </div>
        ))}
    </List>
  );
}

export default MenuItemsList;
