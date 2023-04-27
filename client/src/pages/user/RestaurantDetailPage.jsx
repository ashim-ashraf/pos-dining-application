import axios from "axios";
import { App, Block, BlockTitle, Page } from "konsta/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MobileNav from "./MobileNav";
import MenuItemsList from "./MenuItemsList";
import MobileNavigation from "../../components/User-Components/MobileNavigation";
import { useDispatch } from "react-redux";
import { releiveTable } from "../../features/authSlices/userSlice";

function RestaurantDetailPage() {
  const { restaurantId } = useParams();
  const [restaurantDetails, setRestaurantDetails] = useState({});
  const [menu, setMenu] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`/api/users/get-vendor/${restaurantId}`)
      .then((res) => {
        setRestaurantDetails(res.data.vendorDetails);
        setMenu(res.data.menu);
      })
      .catch((err) => {
        console.log(err);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setMenu(restaurantDetails.menu);
  }, [restaurantDetails]);

  // window.onbeforeunload = () => {
  //   dispatch(releiveTable());
  // };

  return (
    <App theme="ios">
      <Page>
        <MobileNav />
        <>
          <BlockTitle>{restaurantDetails.restaurantName}</BlockTitle>
          <Block>
            <p>{restaurantDetails.description}</p>
          </Block>

          <MenuItemsList items={menu} restaurantId={restaurantDetails.restaurantId} />
          <div>hi</div>
        </>
      </Page>
      <MobileNavigation />
    </App>
  );
}

export default RestaurantDetailPage;
