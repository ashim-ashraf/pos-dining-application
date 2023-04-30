import React, { useEffect, useState } from "react";
import { App, Page, ListItem, BlockTitle, List, Block } from "konsta/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MobileNav from "./MobileNav";
import MobileNavigation from "../../components/User-Components/MobileNavigation";
import Banner from "./Banner";

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
    <App theme="ios">
      <Page className="bg-white">
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
        {searchQuery ? (
          
            <Block>
              {filteredRestaurants.map((restaurants, index) => (
                <div key={index}>
                  <List strongIos outlineIos className="-mt-2">
                    <ListItem
                      link
                      chevronMaterial={false}
                      title={restaurants.restaurantName}
                      // after="$22"
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
                      onClick={() => handleclick(restaurants.id)}
                    />
                  </List>
                </div>
              ))}
            </Block>
         
        ) : (
          <div>
            <Block>
              <Banner />
            </Block>

            <BlockTitle>Restaurants</BlockTitle>
            <Block>
              {restaurants.map((restaurants, index) => (
                <div key={index}>
                  <List strongIos outlineIos className="-mt-2">
                    <ListItem
                      link
                      chevronMaterial={false}
                      title={restaurants.restaurantName}
                      // after="$22"
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
                      onClick={() => handleclick(restaurants.id)}
                    />
                  </List>
                </div>
              ))}
            </Block>
          </div>
        )}

        <MobileNavigation />
      </Page>
    </App>
  );
}
