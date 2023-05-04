import axios from "axios";
import {
  App,
  Badge,
  Block,
  BlockTitle,
  Fab,
  List,
  ListItem,
  Page,
} from "konsta/react";
import { BsJournalBookmarkFill } from "react-icons/bs";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MobileNav from "./MobileNav";
import MenuItemsList from "./MenuItemsList";
import MobileNavigation from "../../components/User-Components/MobileNavigation";
import { useDispatch } from "react-redux";
import { releiveTable } from "../../features/authSlices/userSlice";
import SearchMenuItemLIster from "../../components/User-Components/SearchMenuItemLIster";
import UserLayout from "../../components/User-Components/UserLayout";

function RestaurantDetailPage() {
  const { restaurantId } = useParams();
  const [restaurantDetails, setRestaurantDetails] = useState({});
  const [menu, setMenu] = useState([]);
  const [category, setCategory] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showReviews, setShowReviews] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("useEffect1")
    axios
      .get(`/api/users/get-vendor/${restaurantId}`)
      .then((res) => {
        setRestaurantDetails(res.data.vendorDetails);
        setCategory(res.data.vendorDetails.category);
        setMenu(res.data.menu);
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  // useEffect(() => {
  //   console.log("useEffect2")
  //   setMenu(restaurantDetails.menu);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredMenu = menu?.filter((item) => {
    return (
      item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <App theme="ios">
      {showReviews ? (
        <>
          <UserLayout>
            <div className="grid grid-cols-3">
              <div className="">
                {" "}
                <Block>
                  <img
                    className="w-30 h-16 object-cover rounded-lg"
                    src={restaurantDetails?.image}
                    alt=""
                  />
                </Block>
              </div>

              <div className=" col-span-2">
                <BlockTitle>{restaurantDetails.restaurantName}</BlockTitle>
                <Block>
                  <p>{restaurantDetails.description}</p>
                </Block>
                <Block>
                  <p className="font-bold text-lg">Reviews</p>
                </Block>
              </div>
            </div>

            <div>
              <List strongIos dividersIos>
                {restaurantDetails.reviews &&
                  restaurantDetails.reviews.map((item, index) => (
                    <div key={index}>
                      <ListItem
                        className=""
                        chevronMaterial={true}
                        title={item.username}
                        text={item.feedback}
                        media={
                          <img
                            className="ios:rounded-lg material:rounded-full ios:w-20 material:w-10"
                            src="https://static.vecteezy.com/system/resources/thumbnails/005/545/335/small/user-sign-icon-person-symbol-human-avatar-isolated-on-white-backogrund-vector.jpg"
                            width="80"
                            alt={item.itemName}
                          />
                        }
                      ></ListItem>
                    </div>
                  ))}
              </List>
            </div>
          </UserLayout>
        </>
      ) : (
        <Page>
          <MobileNav />
          <Block>
            <form>
              <div className="flex justify-between overflow-hidden rounded-md bg-white shadow shadow-black/20 ">
                <input
                  type="text"
                  className="block w-full flex-1 py-2 px-3 focus:outline-none"
                  placeholder="Start Typing..."
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                />
                <span className="m-1 inline-flex cursor-pointer items-center rounded-md bg-indigo-600 px-2 py-2 hover:bg-indigo-700">
                  <svg
                    className="text-white"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M21.07 16.83L19 14.71a3.08 3.08 0 0 0-3.4-.57l-.9-.9a7 7 0 1 0-1.41 1.41l.89.89a3 3 0 0 0 .53 3.46l2.12 2.12a3 3 0 0 0 4.24 0a3 3 0 0 0 0-4.29Zm-8.48-4.24a5 5 0 1 1 0-7.08a5 5 0 0 1 0 7.08Zm7.07 7.07a1 1 0 0 1-1.42 0l-2.12-2.12a1 1 0 0 1 0-1.42a1 1 0 0 1 1.42 0l2.12 2.12a1 1 0 0 1 0 1.42Z"
                    />
                  </svg>
                </span>
              </div>
            </form>
          </Block>

          <>
            <BlockTitle>{restaurantDetails.restaurantName}</BlockTitle>
            <Block>
              <p>{restaurantDetails.description}</p>
            </Block>
            <Block>
              <p onClick={() => setShowReviews(true)}>Reviews</p>
            </Block>

            {searchQuery ? (
              <div>
                <SearchMenuItemLIster
                  items={filteredMenu}
                  restaurantId={restaurantDetails.restaurantId}
                />
              </div>
            ) : (
              <div>
                <MenuItemsList
                  category={category}
                  items={menu}
                  restaurantId={restaurantDetails.restaurantId}
                />
              </div>
            )}
          </>
        </Page>
      )}
      <MobileNavigation />
    </App>
  );
}

export default RestaurantDetailPage;
