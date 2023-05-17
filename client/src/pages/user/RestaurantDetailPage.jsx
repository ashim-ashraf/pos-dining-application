import axios from "axios";
import { App, Block, BlockTitle, List, ListItem, Page } from "konsta/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MobileNav from "./MobileNav";
import MenuItemsList from "./MenuItemsList";
import MobileNavigation from "../../components/User-Components/MobileNavigation";
import SearchMenuItemLIster from "../../components/User-Components/SearchMenuItemLIster";
import UserLayout from "../../components/User-Components/UserLayout";

function RestaurantDetailPage() {
  const { restaurantId } = useParams();
  const [restaurantDetails, setRestaurantDetails] = useState({});
  const [menu, setMenu] = useState([]);
  const [category, setCategory] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showReviews, setShowReviews] = useState(false);

  useEffect(() => {
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
      <Page className="">
      {showReviews ? (
          <UserLayout>
        <div className="md:px-96 ">
        <div className="grid grid-cols-3 md:mt-5">
              <div>
                <Block>
                  <img
                    className="w-36 h-24 object-cover rounded-lg md:ml-auto"
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
                <Block className="-mt-4 cursor-pointer text-cyan-600">
                  <p onClick={() => setShowReviews(false)}>Menu</p>
                </Block>
              </div>
            </div>

            {/* review mapped */}
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
        </div>
          </UserLayout>
      ) : (
        <>
          <MobileNav>
            {/* search for web passed as children */}
            <div className="w-full max-w-xs xl:max-w-lg 2xl:max-w-2xl bg-gray-100 rounded-md hidden xl:flex items-center">
              <input
                className="border-l rounded-lg p-4 border-gray-300 bg-transparent font-semibold text-sm pl-4"
                type="text"
                placeholder="Search Dishes"
                value={searchQuery}
                onChange={handleSearchInputChange}
              />
              <svg
                className="ml-auto h-5 px-4 text-gray-500"
                aria-hidden="true"
                focusable="false"
                data-prefix="far"
                data-icon="search"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M508.5 468.9L387.1 347.5c-2.3-2.3-5.3-3.5-8.5-3.5h-13.2c31.5-36.5 50.6-84 50.6-136C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c52 0 99.5-19.1 136-50.6v13.2c0 3.2 1.3 6.2 3.5 8.5l121.4 121.4c4.7 4.7 12.3 4.7 17 0l22.6-22.6c4.7-4.7 4.7-12.3 0-17zM208 368c-88.4 0-160-71.6-160-160S119.6 48 208 48s160 71.6 160 160-71.6 160-160 160z"
                />
              </svg>
            </div>
          </MobileNav>

          {/* search bar for mobile view */}
          <div className="block md:hidden">
            <Block>
              <form>
                <div className="flex justify-between overflow-hidden rounded-md bg-white shadow shadow-black/20 ">
                  <input
                    type="text"
                    className="block w-full flex-1 py-2 px-3 focus:outline-none"
                    placeholder="Search Dishes"
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
          </div>

          
          {/* restaurant details */}
            <div className="grid grid-cols-3 md:mt-9  md:bg-pink-800 md:p-20">
              <div className="mx-4">
                  <img
                    className="w-36 h-24 object-cover rounded-lg md:ml-auto"
                    src={restaurantDetails?.image}
                    alt=""
                  />
              </div>

              <div className=" col-span-2">
                <div className="mx-5 font-bold md:text-white">{restaurantDetails.restaurantName}</div>
                  <p className="mx-5 mt-2 text-sm md:text-white">{restaurantDetails.description}</p>
                  <p className="mx-5 pt-1 cursor-pointer md:text-cyan-200" onClick={() => setShowReviews(true)}>Reviews</p>
              </div>
            </div>

            {searchQuery ? (
              <div className="mx-4">
                <SearchMenuItemLIster
                  items={filteredMenu}
                  restaurantId={restaurantDetails.restaurantId}
                  restaurantName={restaurantDetails.restaurantName}
                />
              </div>
            ) : (
              <div className="mx-4">
                <MenuItemsList
                  category={category}
                  items={menu}
                  restaurantId={restaurantDetails.restaurantId}
                  restaurantName={restaurantDetails.restaurantName}
                />
              </div>
            )}
          </>
        
      )}
      <MobileNavigation />
      </Page>
    </App>
  );
}

export default RestaurantDetailPage;
