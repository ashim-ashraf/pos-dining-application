import {
  Block,
  Button,
  Dialog,
  DialogButton,
  List,
  ListItem,
  Sheet,
  Stepper,
  Toast,
} from "konsta/react";
import React, { useEffect, useState } from "react";
import useCart from "../../components/User-Components/Cart-Functions";
import { Toaster } from "react-hot-toast";
import { BsJournalBookmarkFill } from "react-icons/bs";
import Star from "../../components/User-Components/Star";
import { useSelector } from "react-redux";

function MenuItemsList(props) {
  const { items, restaurantId, category, restaurantName } = props;
  console.log(restaurantId);
  const { getCart, addToCart, increaseCount, decreaseCount, clearCart } =
    useCart();
  const [cart, setCart] = useState(null);
  const [toast, setToast] = useState(false);
  const [sheetOpened, setSheetOpened] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [showListStatus, setShowListStatus] = useState(false);
  const order = useSelector((state) => state.user.order);
  const [alert, setAlert] = useState(false);

  const showlist = () => {
    setShowListStatus(!showListStatus);
  };

  const scrollToDiv = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

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
      <List>
        {/* menu card - mobile */}
        {category?.map((category) => (
          <div key={category}>
            <div className="flex w-full border-2 p-2 ">
              <div
                className="ml-5 uppercase font-bold text-sm md:px-40"
                id={category}
              >
                {category}
              </div>
              <div className="ml-auto mr-5"></div>
            </div>

            {items?.length > 0 &&
              items
                .filter((item) => item.category === category)
                .map((item, index) => (
                  <>
                    {/* menu card - mobile */}
                    <div className="block md:hidden">
                      <div key={index} className="rounded-lg">
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
                            <div className="font-bold">
                              &#8377;{item.sellingPrice}
                            </div>
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
                                  value={cart.items[item._id].count}
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
                                      let status = addToCart(
                                        item,
                                        restaurantId,
                                        restaurantName
                                      );
                                      if (status) {
                                        setCart(getCart());
                                      } else if (
                                        order?._id &&
                                        restaurantId &&
                                        restaurantId !== order?.restaurantId
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
                    </div>
                  </>
                ))}

            {/* menu card - web */}
            <div className="hidden md:block px-40">
              <div class="grid grid-cols-1 md:grid-cols-4 gap-6 p-6">
                {items?.length > 0 &&
                  items
                    .filter((item) => item.category === category)
                    .map((item, index) => (
                      <div class=" rounded-xl bg-white p-3 shadow-lg hover:shadow-xl">
                        <div
                          onClick={() => {
                            setSheetOpened(true);
                            setCurrentItem(item);
                          }}
                          class="relative flex items-end overflow-hidden rounded-xl"
                        >
                          <img
                            className="h-[25vh] w-full  cursor-pointer"
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
                          <h2
                            onClick={() => {
                              setSheetOpened(true);
                              setCurrentItem(item);
                            }}
                            class="text-slate-700 cursor-pointer"
                          >
                            {item?.itemName}
                          </h2>
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
                                      setCart(getCart());
                                    }}
                                    onMinus={() => {
                                      decreaseCount(item);
                                      setCart(getCart());
                                    }}
                                    min={1}
                                    max={10}
                                    value={cart.items[item._id].count}
                                  />
                                ) : (
                                  <div className="grid grid-cols-3 gap-x-4">
                                    <Toaster
                                      toastOptions={{ duration: 4000 }}
                                      position="top-center"
                                    />
                                    <Button
                                      className="px-15 py-5"
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

            <div className="mt-4 bg-slate-200 h-3 w-ful"></div>
          </div>
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
              <DialogButton
                onClick={() => {
                  localStorage.removeItem("cart");
                  setToast(false);
                }}
              >
                Proceed
              </DialogButton>
              <DialogButton onClick={() => setToast(false)}>
                Cancel
              </DialogButton>
            </>
          }
        />

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

        {/* floating action button for scroll to category */}
        <div className="fixed z-50">
          <div className="fixed bottom-32 right-0 md:right-12 md:bottom-10">
            <button
              onClick={() => showlist()}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-6 px-6 mr-5 rounded-full"
            >
              <span>
                <BsJournalBookmarkFill />
              </span>
            </button>
          </div>
        </div>
        {showListStatus ? (
          <div className="fixed z-50">
            <div className="fixed bottom-28 right-5 md:bottom-6 md:right-32">
              <div className="bg-emerald-100 border rounded-lg shadow-md md:bg-fabblue">
                <div className="flex justify-between p-4 items-center">
                  <h2 className="text-xl font-semibold">Categories</h2>
                  <button
                    onClick={showlist}
                    className="text-gray-500 focus:outline-none ml-2 mt-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <ul className="overflow-y-scroll max-h-60 ">
                  {category?.map((category) => (
                    <li
                      key={category}
                      onClick={() => {
                        scrollToDiv(category);
                        showlist();
                      }}
                      className="p-4 w-24"
                    >
                      {category}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </List>
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
    </>
  );
}

export default MenuItemsList;
