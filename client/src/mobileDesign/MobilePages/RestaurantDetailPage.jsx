import axios from "axios";
import { App, Block, BlockTitle, List, ListItem, Page } from "konsta/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MobileNav from "./MobileNav";
import MenuItemsList from "./MenuItemsList";

function RestaurantDetailPage() {
    const { restaurantId } = useParams();
    const [restaurantDetails, setRestaurantDetails] = useState({})
    const [menu, setMenu] = useState([])
  
    useEffect(() => {
    axios
      .get(`/api/vendors/get-vendor/${restaurantId}`)
      .then((res) => {
        console.log(res.data);
        setRestaurantDetails(res.data.vendorDetails)
        setMenu(res.data.menu)
        console.log("inuse")


      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    
    setMenu(restaurantDetails.menu)
  }, [restaurantDetails])

  useEffect(() => {
   console.log(menu)
  }, [menu])
  
  

  return (
    <App theme="ios">
      <Page>
      <MobileNav/>
      {/* <div class="mx-auto w-4/5">
          <img
            class="mt-8 h-32 w-full rounded-lg  mx-auto object-cover shadow-2xl"
            src={restaurantDetails.image[0].location}
            alt="food"
          ></img>
        </div> */}
      <BlockTitle>{restaurantDetails.restaurantName}</BlockTitle>
      <Block>
        <p>
          {restaurantDetails.description}
        </p>
      </Block>

        

       
      

        {/* <MenuItemsList items={menu}/> */}
     
      {/* <List strongIos outlineIos>
          {
           restaurantDetails.menu.map((menu,index) => (
            <div key={index}>
            <ListItem
              link
              chevronMaterial={false}
              title={menu.itemName}
              // after="$22"
              subtitle={menu.category}
              text={menu.description}
              media={
                <img
                  className="ios:rounded-lg material:rounded-full ios:w-20 material:w-10"
                  src={menu.image[1].location}
                  width="80"
                  alt={menu.itemName}
                />
              }
            //   onClick={() => handleclick(restaurants.id)}
            />
            </div>
          ))}
        </List> */}
        
      </Page>
    </App>
  );
}

export default RestaurantDetailPage;
