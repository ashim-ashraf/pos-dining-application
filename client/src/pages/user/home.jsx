import React, { useEffect, useState } from "react";
import { App, Page, ListItem, List, Block, KonstaProvider } from "konsta/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MobileNav from "./MobileNav";
import MobileNavigation from "../../components/User-Components/MobileNavigation";
import Banner from "./Banner";
import UserFooter from "../../components/User-Components/UserFooter";


export default function Homepage() {
  const [restaurants, setRestaurants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/users/get-vendors")
      .then((res) => {
        setRestaurants(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    console.log(restaurants);
  }, [restaurants]);

  const handleclick = (restaurantId) => {
    navigate(`/restaurant/${restaurantId}`);
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredRestaurants = restaurants.filter((restaurant) => {
    return (
      restaurant.restaurantName
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      restaurant.restaurantType
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  });

  return (
    
    <App theme="ios"  >
      <Page className="">
        <MobileNav>
          {/* search for web passed as children */}
          <div className="w-full max-w-xs xl:max-w-lg 2xl:max-w-2xl bg-gray-100 rounded-md hidden xl:flex items-center">
            <input
              className="border-l rounded-lg p-4 border-gray-300 bg-transparent font-semibold text-sm pl-4"
              type="text"
              placeholder="Search Restaurants"
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
                  className="block w-full flex-1 py-2 px-3 focus:outline-none dark:text-black"
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
        </div>

        {searchQuery ? (
          <>
            <Block className="block md:hidden">
              {filteredRestaurants.map((restaurants, index) => (
                <div key={index}>
                  <List strongIos outlineIos className="-mt-2">
                    <ListItem
                      link
                      chevronMaterial={false}
                      title={restaurants.restaurantName}
                      subtitle={restaurants.restaurantType}
                      text={restaurants.description}
                      media={
                        <img
                          className="ios:rounded-lg material:rounded-full ios:w-20 material:w-10"
                          src={restaurants?.image}
                          width="80"
                          alt="demo"
                        />
                      }
                      onClick={() => handleclick(restaurants.restaurantId)}
                    />
                  </List>
                </div>
              ))}
            </Block>

            <div className="hidden md:block">
              <div className="px-40 py-10 grid grid-cols-4 gap-4 ">
                {filteredRestaurants.map((restaurants, index) => (
                  <div
                    key={index}
                    className="cursor-pointer"
                    onClick={() => handleclick(restaurants.restaurantId)}
                  >
                    <div className="flex items-center justify-center hover:border-2 px-2 mt-1">
                      <div className="w-full max-w-md  mx-auto bg-white overflow-hidden">
                        <div className="max-w-md mx-auto">
                          <div
                            className="h-[25vh] w-full"
                            style={{
                              backgroundImage: `url(${restaurants?.image})`,
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                            }}
                          ></div>
                          <div className="p-4 sm:p-6">
                            <p className="font-bold text-gray-700 mb-1">
                              {restaurants.restaurantName}
                            </p>
                            <div>
                              <p className="text-[#3C3C4399] text-[17px] mr-2 ">
                                {restaurants.restaurantType}
                              </p>
                              <p className="text-[#0FB478] text-xs">
                                {restaurants.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div>
            <Block>
              <Banner />
            </Block>

            <div className="mx-5 font-bold text-lg md:mx-48 ">Restaurants</div>

            <Block className="block md:hidden">
              {restaurants.map((restaurants, index) => (
                <div key={index}>
                  <List strongIos outlineIos className="-mt-2">
                    <ListItem
                      link
                      chevronMaterial={false}
                      title={restaurants.restaurantName}
                      subtitle={restaurants.restaurantType}
                      text={restaurants.description}
                      media={
                        <img
                          className="ios:rounded-lg material:rounded-full ios:w-20 material:w-10"
                          src={restaurants?.image}
                          width="80"
                          alt="demo"
                        />
                      }
                      onClick={() => handleclick(restaurants.restaurantId)}
                    />
                  </List>
                </div>
              ))}
            </Block>

            <div className="hidden md:block">
              <div className="px-40 py-10 grid grid-cols-4 gap-4 ">
                {restaurants.map((restaurants, index) => (
                  <div
                    key={index}
                    className="cursor-pointer"
                    onClick={() => handleclick(restaurants.restaurantId)}
                  >
                    <div className="flex items-center justify-center hover:border-2 px-2 mt-1">
                      <div className="w-full max-w-md  mx-auto bg-white overflow-hidden">
                        <div className="max-w-md mx-auto">
                          <div
                            className="h-[25vh] w-full"
                            style={{
                              backgroundImage: `url(${restaurants?.image})`,
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                            }}
                          ></div>
                          <div className="p-4 sm:p-6">
                            <p className="font-bold text-gray-700 mb-1">
                              {restaurants.restaurantName}
                            </p>
                            <div>
                              <p className="text-[#3C3C4399] text-[17px] mr-2 ">
                                {restaurants.restaurantType}
                              </p>
                              <p className="text-[#0FB478] text-xs">
                                {restaurants.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        <UserFooter/>
        <MobileNavigation />
      </Page>
    </App>
  
  );
}
