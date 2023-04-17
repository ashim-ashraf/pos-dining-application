import axios from "axios";
import { Actions, ActionsButton, ActionsGroup, ActionsLabel, App, Block, BlockTitle, Button, Page } from "konsta/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MobileNav from "./MobileNav";
import MenuItemsList from "./MenuItemsList";
import MobileNavigation from "./MobileNavigation";

function RestaurantDetailPage() {
    const { restaurantId } = useParams();
    const [restaurantDetails, setRestaurantDetails] = useState({})
    const [menu, setMenu] = useState([])
    const [actionScan, setActionScan] = useState(false)
  
    useEffect(() => {
    axios
      .get(`/api/vendors/get-vendor/${restaurantId}`)
      .then((res) => {
        setRestaurantDetails(res.data.vendorDetails)
        setMenu(res.data.menu)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setMenu(restaurantDetails.menu)
  }, [restaurantDetails])

  const handleOpenCamera = () => {
    const videoElement = document.createElement('video');
  videoElement.autoplay = true;
  videoElement.muted = true;
    navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      videoElement.srcObject = stream;
      document.getElementById('cameraContainer').appendChild(videoElement);
      console.log('Webcam successfully opened!')
    })
    .catch(error => {
      console.error('Error opening webcam:', error)
    })
  }


  return (
    <App theme="ios">
      <Page>
      <MobileNav/>
      <BlockTitle>{restaurantDetails.restaurantName}</BlockTitle>
      <Block>
        <p>
          {restaurantDetails.description}
        </p>
      </Block>

      <Block strong inset className="flex space-x-4">
        <Button onClick={() => setActionScan(true)}>Select A Table</Button>
      </Block>

      <div id="cameraContainer"></div>

      <Actions
        opened={actionScan}
        onBackdropClick={() => setActionScan(false)}
      >
        <ActionsGroup>
          <ActionsLabel>Scan QR code on the table</ActionsLabel>
          <ActionsButton onClick={() => handleOpenCamera()} bold>
            Open Camera
          </ActionsButton>
          <ActionsButton onClick={() => setActionScan(false)}>
            Cancel
          </ActionsButton>
        </ActionsGroup>
      </Actions>

        <MenuItemsList items={menu}/>  
        <MobileNavigation/>
      </Page>
    </App>
  );
}

export default RestaurantDetailPage;
