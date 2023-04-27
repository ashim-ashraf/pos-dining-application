import React, { useEffect, useState } from "react";
import {
  App,
  Page,
  ListItem,
  BlockTitle,
  List,
} from "konsta/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MobileNav from "./MobileNav";
import MobileNavigation from "../../components/User-Components/MobileNavigation";
import Banner from "./Banner";


export default function Homepage() {
  const [restaurants, setRestaurants] = useState([]);
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

  return (
    <App theme="ios">
      <Page className="bg-white">
        <MobileNav />

        <Banner/>

        <BlockTitle>Restaurants</BlockTitle>

        {restaurants.map((restaurants , index) => (
          <div key={index} >
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
        <MobileNavigation />
      </Page>
    </App>
  );
}
