import {
  Button,
  Dialog,
  DialogButton,
  List,
  ListItem,
  Sheet,
  Stepper,
} from "konsta/react";
import React, { useEffect, useState } from "react";
import useCart from "../../components/User-Components/Cart-Functions";
import { Toaster } from "react-hot-toast";
import Star from "./Star";
import { useSelector } from "react-redux";

function SearchMenuItemLIster(props) {
  const { items, restaurantId } = props;
  const { getCart, addToCart, increaseCount, decreaseCount, clearCart } =
    useCart();
  const [cart, setCart] = useState(null);
  const [toast, setToast] = useState(false);
  const [sheetOpened, setSheetOpened] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const order = useSelector((state) => state.user.order);
  const [alert, setAlert] = useState(false);
  const isMobile = window.matchMedia('(max-width: 767px)').matches;

  useEffect(() => {
    setCart(getCart());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isItemInCart = (itemId) => {
    if (!cart?.items) return false;
    return cart?.items.hasOwnProperty(itemId);
  };

  return (
    <>
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
                link
                chevronMaterial={true}
                title={
                  <div
                    onClick={() => {
                      setSheetOpened(true);
                      setCurrentItem(item);
                    }}
                  >
                    {item.itemName}
                  </div>
                }
                after={
                  <div className="font-bold">&#8377;{item.sellingPrice}</div>
                }
                subtitle={
                  <div>
                    <div>{item.category}</div>
                    <div className="ml-auto ">
                      {item.averagerating ? (
                        <Star
                          stars={item.averagerating}
                          reviews={item?.ratings.length}
                        />
                      ) : (
                        ""
                      )}
                    </div>{" "}
                  </div>
                }
                text={
                  <div className="mt-2">
                    {isItemInCart(item._id) ? (
                      <Stepper
                        raised
                        large
                        outline
                        onPlus={() => {
                          increaseCount(item);
                          setCart(getCart());
                        }}
                        onMinus={() => {
                          decreaseCount(item);
                          setCart(getCart());
                        }}
                        min={1}
                        max={10}
                        value={cart?.items[item._id].count}
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
                              setCart(getCart());
                            } else if (
                              order?._id &&
                              restaurantId &&
                              restaurantId !== order?._id
                            ) {
                              setAlert(true);
                            } else {
                              setToast(true);
                            }
                          }}
                        >
                          Add
                        </Button>
                      </div>
                    )}
                  </div>
                }
                media={
                  <div className="w-20 overflow-hidden rounded-lg">
                    <img
                      onClick={() => {
                        setSheetOpened(true);
                        setCurrentItem(item);
                      }}
                      className=" h-full object-contain"
                      src={item?.image}
                      width="80"
                      alt={item.itemName}
                    />
                  </div>
                }
              ></ListItem>
            </div>

            <div className="hidden md:block px-40">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6">
                {items?.length > 0 &&
                  items.map((item, index) => (
                    <div className="cursor-pointer rounded-xl bg-white p-3 shadow-lg hover:shadow-xl">
                      <div className="relative flex items-end overflow-hidden rounded-xl">
                        <img
                          onClick={() => {
                            setSheetOpened(true);
                            setCurrentItem(item);
                          }}
                          className="h-[25vh] w-full"
                          src={item?.image}
                          alt={item?.itemName}
                        />

                        <div className="absolute bottom-3 left-3 inline-flex items-center rounded-lg bg-white p-2 shadow-md">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-yellow-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>

                          <span className="ml-1 text-sm text-slate-400">4.9</span>
                        </div>
                      </div>

                      <div className="mt-1 p-2">
                        <h2
                          onClick={() => {
                            setSheetOpened(true);
                            setCurrentItem(item);
                          }}
                          className="text-slate-700"
                        >
                          {item?.itemName}
                        </h2>
                        <p className="mt-1 text-sm text-slate-400 line-through">
                          &#x20B9;{item?.retailPrice}
                        </p>

                        <p className="mt-1 text-lg font-bold text-slate-700">
                          &#x20B9;{item?.sellingPrice}
                        </p>

                        <div className="mt-3 flex items-end justify-between">
                          <p>
                            <span className="text-lg font-bold text-orange-500">
                              {isItemInCart(item._id) ? (
                                <Stepper
                                  raised
                                  large
                                  outline
                                  onPlus={() => {
                                    increaseCount(item);
                                    setCart(getCart());
                                  }}
                                  onMinus={() => {
                                    decreaseCount(item);
                                    setCart(getCart());
                                  }}
                                  min={1}
                                  max={10}
                                  value={cart?.items[item._id].count}
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
                                        setCart(getCart());
                                      } else if (
                                        order?._id &&
                                        restaurantId &&
                                        restaurantId !== order?._id
                                      ) {
                                        setAlert(true);
                                      } else {
                                        setToast(true);
                                      }
                                    }}
                                  >
                                    Add
                                  </Button>
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

      <Dialog
        opened={alert}
        onBackdropClick={() => setAlert(false)}
        title="Order Active"
        content={`You have an active order from ${cart?.restaurantName}`}
        buttons={
          <DialogButton onClick={() => setAlert(false)}>Ok</DialogButton>
        }
      />

      <Dialog
        opened={toast}
        onBackdropClick={() => setToast(false)}
        title="Delete Cart"
        content={`You have items from ${cart?.restaurantName} in the Cart`}
        buttons={
          <>
            <DialogButton onClick={() => clearCart()}>Proceed</DialogButton>
            <DialogButton onClick={() => setToast(false)}>Cancel</DialogButton>
          </>
        }
      />
     </List>
      
      

<div>
      {isMobile ? (
        <Sheet
        className="pb-safe block md:hidden"
        opened={sheetOpened}
        onBackdropClick={() => setSheetOpened(false)}
      >
        <div>
          <div className="w-full rounded overflow-hidden shadow-lg">
            <img
              className="w-full"
              src={currentItem?.image}
              alt={currentItem?.itemName}
            />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">
                {currentItem?.itemName}
              </div>
              <p className="text-gray-700 text-base mb-2">
                {currentItem?.description}
              </p>
            </div>
            <div className="px-6 pt-4 pb-2"></div>
          </div>
        </div>
        <div className="block md:hidden"></div>
      </Sheet>

      ) : (
        <Dialog
      className="hidden md:block"
        opened={sheetOpened}
        onBackdropClick={() => setSheetOpened(false)}
        content={
          <div>
            <div className="max-w-sm md:w-70 rounded overflow-hidden shadow-lg">
              <img
                className="w-full"
                src={currentItem?.image}
                alt={currentItem?.itemName}
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
        }
      />
      )}
    </div>
      </>
  );
}

export default SearchMenuItemLIster;
