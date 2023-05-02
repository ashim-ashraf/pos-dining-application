import {
  Block,
  Button,
  List,
  ListItem,
  Sheet,
  Stepper,
  Toast,
} from "konsta/react";
import React, { useEffect, useRef, useState } from "react";
import useCart from "../../components/User-Components/Cart-Functions";
import { Toaster } from "react-hot-toast";
import { BsJournalBookmarkFill } from "react-icons/bs";
import Star from "../../components/User-Components/Star";

function MenuItemsList(props) {
  const { items, restaurantId, category } = props;
  const { getCart, addToCart, increaseCount, decreaseCount } = useCart();
  const [cart, setCart] = useState(null);
  const [toast, setToast] = useState(false);
  const [sheetOpened, setSheetOpened] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [showListStatus, setShowListStatus] = useState(false);

  const showlist = () => {
    setShowListStatus(!showListStatus);
  };

  const myDivRef = useRef(null);

  const scrollToDiv = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    console.log(category, "gsaddfasdf");
    setCart(getCart().items);
  }, []);

  const isItemInCart = (itemId) => {
    if (!cart) return false;
    return cart.hasOwnProperty(itemId);
  };

  return (
    <List strongIos dividersIos>
      {category?.map((category) => (
        <div key={category}>
          <div className="flex w-full border-2 p-2 ">
            <div className="ml-5" id={category}>
              {category}
            </div>
            <div className="ml-auto mr-5"></div>
          </div>
          {items?.length > 0 &&
            items
              .filter((item) => item.category === category)
              .map((item, index) => (
                <>
                  <div key={index} className="rounded-lg">
                    <ListItem
                      className=""
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
                  {console.log("here", item.averagerating)}
                  <div className="ml-auto ">
                    <Star
                      stars={
                        item.averagerating === null &&
                        item.averagerating === undefined
                          ? 1
                          : item.averagerating
                      } 
                    />
                  </div>
                </>
              ))}
          <div className="mt-4 bg-slate-200 h-3 w-ful"></div>
        </div>
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
      <div className="fixed z-50">
        <div className="fixed bottom-20 right-0">
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
        <div className="fixed  z-50">
          <div className="fixed bottom-8 right-0">
            <ul className="bg-orange-100 border rounded shadow-md absolute right-0 bottom-12 mr-4 w-64 h-72 overflow-y-scroll">
              {category?.map((category) => (
                <li
                  onClick={() => {
                    scrollToDiv(category);
                    showlist();
                  }}
                  className="p-4"
                >
                  {category}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        ""
      )}
    </List>
  );
}

export default MenuItemsList;
