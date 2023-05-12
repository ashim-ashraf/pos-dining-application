import {
  Block,
  Button,
  List,
  ListItem,
  Sheet,
  Stepper,
  Toast,
} from "konsta/react";
import React, { useEffect, useState } from "react";
import useCart from "../../components/User-Components/Cart-Functions";
import { Toaster } from "react-hot-toast";

function SearchMenuItemLIster(props) {
  const { items, restaurantId } = props;
  const { getCart, addToCart, increaseCount, decreaseCount } = useCart();
  const [cart, setCart] = useState(null);
  const [toast, setToast] = useState(false);
  const [sheetOpened, setSheetOpened] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  useEffect(() => {
    setCart(getCart().items);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isItemInCart = (itemId) => {
    if (!cart) return false;
    return cart.hasOwnProperty(itemId);
  };

  return (
    <List strongIos dividersIos>
      <div className="flex w-full border-2 p-2 ">
                  <div className="ml-5 uppercase font-bold text-sm md:px-40">
                    Search Results
                  </div>
                  <div className="ml-auto mr-5"></div>
                </div>
      {items?.length > 0 &&
        items.map((item, index) => (
          <>
            <div key={index} className="block md:hidden">
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

            <div className="hidden md:block px-40">
              <div class="grid grid-cols-1 md:grid-cols-4 gap-6 p-6">
                
                {items?.length > 0 &&
                  items.map((item, index) => (
                    <div
                      onClick={() => {
                        setSheetOpened(true);
                        setCurrentItem(item);
                      }}
                      class="cursor-pointer rounded-xl bg-white p-3 shadow-lg hover:shadow-xl"
                    >
                      <div class="relative flex items-end overflow-hidden rounded-xl">
                        <img
                          className="h-[25vh] w-full"
                          src={item?.image}
                          alt={item?.itemName}
                        />

                        <div class="absolute bottom-3 left-3 inline-flex items-center rounded-lg bg-white p-2 shadow-md">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5 text-yellow-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>

                          <span class="ml-1 text-sm text-slate-400">4.9</span>
                        </div>
                      </div>

                      <div class="mt-1 p-2">
                        <h2 class="text-slate-700">{item?.itemName}</h2>
                        <p class="mt-1 text-sm text-slate-400 line-through">
                          &#x20B9;{item?.retailPrice}
                        </p>

                        <p class="mt-1 text-lg font-bold text-slate-700">
                          &#x20B9;{item?.sellingPrice}
                        </p>

                        <div class="mt-3 flex items-end justify-between">
                          <p>
                            <span class="text-lg font-bold text-orange-500">
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
                                    className="px-16 py-5"
                                    outline
                                    onClick={() => {
                                      let status = addToCart(
                                        item,
                                        restaurantId
                                      );
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
                                      You have items from another restaurant in
                                      the Cart
                                    </div>
                                  </Toast>
                                </div>
                              )}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </>
        ))}
      <Sheet
        className="pb-safe"
        opened={sheetOpened}
        onBackdropClick={() => setSheetOpened(false)}
      >
        <Block>
          <div>
            <div className="max-w-sm rounded overflow-hidden shadow-lg">
              <img
                className="w-full"
                src={currentItem?.image}
                alt="Sunset in the mountains"
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">
                  {currentItem?.itemName}
                </div>
                <p className="text-gray-700 text-base">
                  {currentItem?.description}
                </p>
              </div>
              <div className="px-6 pt-4 pb-2"></div>
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

export default SearchMenuItemLIster;
