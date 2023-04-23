import axios from "axios";
import {
  Actions,
  ActionsButton,
  ActionsGroup,
  ActionsLabel,
  App,
  Block,
  BlockTitle,
  Button,
  Page,
  Preloader,
} from "konsta/react";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import MobileNav from "./MobileNav";
import MenuItemsList from "./MenuItemsList";
import MobileNavigation from "../../components/User-Components/MobileNavigation";
import QrReader from "react-qr-scanner";

function RestaurantDetailPage() {
  const videoRef = useRef(null);
  const imgRef = useRef(null);
  const qrRef = useRef(null);

  const { restaurantId } = useParams();
  const [restaurantDetails, setRestaurantDetails] = useState({});
  const [menu, setMenu] = useState([]);
  const [actionScan, setActionScan] = useState(false);
  const [scanningStatus, setScanningStatus] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isImageCaptured, setIsImageCaptured] = useState(false);
  const [capturedImageDataUrl, setCapturedImageDataUrl] = useState(null);
  const [scanResultFile, setScanResultFile] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`/api/vendors/get-vendor/${restaurantId}`)
      .then((res) => {
        setRestaurantDetails(res.data.vendorDetails);
        setMenu(res.data.menu);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setMenu(restaurantDetails.menu);
  }, [restaurantDetails]);

  const handleOpenCamera = () => {
    setActionScan(false);
    setScanningStatus(true);
    setIsCameraOpen(true);

    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      })
      .catch((error) => {
        console.error("Error opening webcam:", error);
      });
  };

  // const handleCapture = () => {
  //   setIsImageCaptured(true);
  //   const canvas = document.createElement("canvas");
  //   canvas.width = videoRef.current.videoWidth;
  //   canvas.height = videoRef.current.videoHeight;
  //   const context = canvas.getContext("2d");
  //   context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
  //   const imageData = canvas.toDataURL("image/png");
  //   setCapturedImageDataUrl(imageData);
  //   if (imgRef.current) {
  //     imgRef.current.src = imageData;
  //   }
  //   videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
  //   setIsCameraOpen(false);
  // };

  useEffect(() => {
    if (capturedImageDataUrl && isImageCaptured) {
      imgRef.current.src = capturedImageDataUrl;
    }
  }, [capturedImageDataUrl, isImageCaptured]);

  const handleErrorFile = (error) => {
    console.log(error);
  };

  const handleScanfile = (result) => {
    if (result) {
      setScanResultFile(result);
      setLoading(true);
    }
  };

  useEffect(() => {
    console.log(scanResultFile);
  }, [scanResultFile]);

  return (
    <App theme="ios">
      <Page>
        <MobileNav />

        {scanningStatus ? (
          <>
            {loading ? (
              <div className="flex justify-center items-center h-screen">
                <div className="text-center">
                  <Preloader size="w-16 h-16" />
                  <p>Checking for Availability</p>
                </div>
              </div>
            ) : (
              <>
                <Block>
                  <p className="mb-6">
                    QR code is available on each table. Capture it to make the
                    table selection
                  </p>

                  <QrReader
                    ref={qrRef}
                    delay={300}
                    onError={handleErrorFile}
                    onScan={handleScanfile}
                    legacyMode
                  />
                </Block>

                <Block>
                  <div className="mx-auto w-4/5">
                    <img
                      className="mt-8 h-32 w-full rounded-lg  mx-auto object-cover shadow-2xl"
                      src="https://storage.googleapis.com/support-kms-prod/mQmcrC93Ryi2U4x5UdZNeyHQMybbyk71yCVm"
                      alt="food"
                    ></img>
                  </div>
                </Block>

                <Block>
                  <p>
                    Point your camera towards the QR code and adjust it to gain
                    the focus
                  </p>
                </Block>

                {/* <div id="cameraContainer">
              {isCameraOpen && !isImageCaptured && (
                <>
                  <video ref={videoRef} autoPlay muted></video>
                  <Block strong inset>
                    {isCameraOpen && !isImageCaptured && (
                      <Button small rounded outline onClick={handleCapture}>
                        Capture
                      </Button>
                    )}
                  </Block>
                </>
              )}
              {isImageCaptured && (
                <img ref={imgRef} src={capturedImageDataUrl} alt="captured" />
              )}
              </div> */}
              </>
            )}
          </>
        ) : (
          <>
            <BlockTitle>{restaurantDetails.restaurantName}</BlockTitle>
            <Block>
              <p>{restaurantDetails.description}</p>
            </Block>

            <Block strong inset>
              <Button onClick={() => setActionScan(true)}>
                Select A Table
              </Button>
            </Block>

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

            <MenuItemsList items={menu} restaurantId={restaurantDetails._id} />
            <div>hi</div>
          </>
        )}
      </Page>
      <MobileNavigation />
    </App>
  );
}

export default RestaurantDetailPage;
