import React, { useEffect, useState } from "react";
import {
  App,
  Page,
  ListItem,
  BlockTitle,
  List,
  TabbarLink,
  Icon,
  Tabbar,
} from "konsta/react";
import {  useNavigate } from "react-router-dom";
import axios from "axios";
import MobileNav from "./MobileNav";
import MobileNavigation from "./MobileNavigation";
export default function MyApp() {


  const [restaurants, setRestaurants] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    axios.get("/api/vendors/get-vendors").then((res) => {
      setRestaurants(res.data);
    }).catch((err) => {
      console.log(err)
    });
  }, []);

  useEffect(() => {
    console.log(restaurants);
  }, [restaurants]);


  const handleclick = (restaurantId) => {
    navigate(`/restaurant/${restaurantId}`)
  };

  return (
    <App theme="ios">
      <Page className="bg-slate-200">
      <MobileNav/>

        <div class="mx-auto w-4/5">
          <img
            class="mt-8 h-32 w-full rounded-lg  mx-auto object-cover shadow-2xl"
            src="https://images.unsplash.com/photo-1550461716-dbf266b2a8a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=525&q=80"
            alt="food"
          ></img>
        </div>

        <BlockTitle>Restaurants</BlockTitle>

        
          {restaurants.map((restaurants) => (
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
                  src={restaurants.image[1].location}
                  width="80"
                  alt="demo"
                />
              }
              onClick={() => handleclick(restaurants.id)}
            />
            </List>
          ))}
       <MobileNavigation/>
      </Page>
    </App>
  );
}
