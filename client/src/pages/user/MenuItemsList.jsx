import {
  Block,
  Button,
  List,
  ListItem,
  Sheet,
  Stepper,
  Toast,
  Toolbar,
} from "konsta/react";
import React, { useEffect, useState } from "react";
import useCart from "../../components/User-Components/Cart-Functions";
import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

function MenuItemsList(props) {
  const { items, restaurantId } = props;
  const { getCart, addToCart, increaseCount, decreaseCount } = useCart();
  const [cart, setCart] = useState(null);
  const [toast, setToast] = useState(false);
  const [sheetOpened, setSheetOpened] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  useEffect(() => {
    setCart(getCart().items);
  }, []);

  const isItemInCart = (itemId) => {
    if (!cart) return false;
    return cart.hasOwnProperty(itemId);
  };

  return (
    <List strongIos dividersIos>
      {items?.length > 0 &&
        items.map((item, index) => (
          <div
            key={index}
            
          >
            <ListItem
            onClick={() => {
              setSheetOpened(true);
              setCurrentItem(item);
            }}
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
            ></ListItem>
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
                  <Toaster
                    toastOptions={{ duration: 4000 }}
                    position="top-center"
                  />
                  <Button
                    outline
                    onClick={() => {
                      let status = addToCart(item, restaurantId);
                      if (status) {
                        setCart(getCart().items);
                      } else {
                        setToast(true);
                      }
                    }}
                  >
                    Add
                  </Button>
                  <Toast
                    className="bottom-12 "
                    position="left"
                    opened={toast}
                    button={
                      <Button
                        rounded
                        clear
                        small
                        inline
                        onClick={() => setToast(false)}
                      >
                        Close
                      </Button>
                    }
                  >
                    <div className="shrink ">
                      You have items from another restaurant in the Cart
                    </div>
                  </Toast>
                </div>
              )}
            
          </div>
        ))}
      <Sheet
        className="pb-safe"
        opened={sheetOpened}
        onBackdropClick={() => setSheetOpened(false)}
      >
        <Block>
          <div>
            <div class="max-w-sm rounded overflow-hidden shadow-lg">
              <img
                class="w-full"
                src={currentItem?.image}
                alt="Sunset in the mountains"
              />
              <div class="px-6 py-4">
                <div class="font-bold text-xl mb-2">{currentItem?.itemName}</div>
                <p class="text-gray-700 text-base">
                  {currentItem?.description}
                </p>
              </div>
              <div class="px-6 pt-4 pb-2">
               
              </div>
            </div>
          </div>
          <div className="">
            <>End</>
          </div>
        </Block>
      </Sheet>
    </List>
  );
}

export default MenuItemsList;
