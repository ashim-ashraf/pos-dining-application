import React, { useEffect, useRef, useState } from "react";
import UserLayout from "../../components/User-Components/UserLayout";
import useCart from "../../components/User-Components/Cart-Functions";
import {
  Actions,
  ActionsButton,
  ActionsGroup,
  ActionsLabel,
  Block,
  Button,
  Preloader,
  Stepper,
  Toast,
} from "konsta/react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import QrReader from "react-qr-scanner";
import { bookedTable } from "../../features/authSlices/userSlice";
import { releiveTable } from "../../features/authSlices/userSlice";

function Cart() {
  const videoRef = useRef(null);
  const imgRef = useRef(null);
  const qrRef = useRef(null);

  const {
    getCart,
    increaseCount,
    decreaseCount,
    calculateTotal,
    clearCartItems,
  } = useCart();
  const [cart, setCart] = useState(getCart().items);
  const table = useSelector((state) => state.user.table);
  const orderId = useSelector((state) => state.user.orderId)
  const [toast, setToast] = useState(false);
  const [errorToast, setErrorToast] = useState(false);
  const [actionScan, setActionScan] = useState(false);
  const [scanningStatus, setScanningStatus] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isImageCaptured, setIsImageCaptured] = useState(false);
  const [capturedImageDataUrl, setCapturedImageDataUrl] = useState(null);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [updated, setUpdated] = useState(false)
  const dispatch = useDispatch();

  useEffect(() => {
    if(!updated){
      setCart(getCart().items || {});
    }
  }, [updated]);

  useEffect(() => {
    setUpdated(true)
  }, [])
  
  useEffect(() => {
    if (code) {
      axios
        .post("/api/users/book-table", { code })
        .then((res) => {
          console.log(res);
          dispatch(bookedTable(res.data.tableid));
          setScanningStatus(false);
        })
        .catch((err) => {
          console.log(err);
          setScanningStatus(false);
          setErrorToast(true);
        });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  useEffect(() => {
    if (capturedImageDataUrl && isImageCaptured) {
      imgRef.current.src = capturedImageDataUrl;
    }
  }, [capturedImageDataUrl, isImageCaptured]);

  function handleIncrease(item) {
    increaseCount(item);
    setCart(getCart().items);
  }

  function handleDecrease(item) {
    decreaseCount(item);
    setCart(getCart().items);
  }

  const handleOrder = () => {
    if (table) {
      const cart = localStorage.getItem('cart');
      axios
        .post("/api/users/orders",  {cart , table} )
        .then((res) => {
          console.log(res.data);
          clearCartItems()
          setUpdated(false)
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleOpenCamera = () => {
    setActionScan(false);
    setScanningStatus(true);
    // setIsCameraOpen(true);

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

  const handleErrorFile = (error) => {
    console.log(error);
  };

  const handleScanfile = (result) => {
    if (result) {
      setCode(result.text);
      setLoading(true);
    }
  };

  const handleChangeTable = () => {
    let code = table
    axios.post("/api/users/releive-table", {code}).then((res) => {
      console.log(res.data)
      dispatch(releiveTable())
    }).catch((err) => {
      console.log(err)
    })
  }

  return (
    <UserLayout>
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
            </>
          )}
        </>
      ) : (
        <>
          {Object.keys(cart).length > 0 ? (
            <>
              <Block>
                {table ? (
                  <>
                    <Block className="flex gap-5">
                      <p className="font-bold mt-1">TABLE SELECTED</p>
                      <div className=" w-25">
                        { !orderId &&
                          <Button outline onClick={handleChangeTable}>Change Table</Button>
                        }
                      </div>
                    </Block>
                  </>
                ) : (
                  <>
                    <Block strong inset>
                      <Button onClick={() => setActionScan(true)}>
                        Select A Table
                      </Button>
                    </Block>
                  </>
                )}

                <table className="border-collapse w-full">
                  <thead>
                    <tr>
                      <th className=" px-4 py-2">Item Name</th>
                      <th className=" px-4 py-2">Quantity</th>
                      <th className=" px-4 py-2">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(cart).map((key) => (
                      <tr key={key}>
                        <td className=" px-4 py-2">
                          {cart[key].itemName}
                        </td>
                        <td className=" px-4 py-2">
                          <Stepper
                            value={cart[key].count}
                            raised
                            small
                            outline
                            onPlus={() => handleIncrease(cart[key])}
                            onMinus={() => handleDecrease(cart[key])}
                          />
                        </td>
                        <td className=" px-4 py-2">
                          {"₹" +
                            cart[key].count *
                              cart[key].sellingPrice}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Block>
              <Block className="left-0 bottom-10 fixed">
                <table className="border-collapse w-full">
                  <thead>
                    <tr>
                      <td className=" px-4 py-2 font-body text-lg">
                        Bill Details
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className=" px-4 py-2">Item Total</td>
                      <td className=" px-4 py-2">
                        {"₹" + calculateTotal(cart)}
                      </td>
                    </tr>
                    <tr>
                      <td className=" px-4 py-2">
                        <Button
                          onClick={() => {
                            if (table) {
                              handleOrder();
                            } else {
                              setToast(true)
                            }
                          }}
                        >
                          Order Items
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Block>
            </>
          ) : (
            <div className="fixed inset-0 flex items-center justify-center flex-col">
<div><img src="https://mir-s3-cdn-cf.behance.net/projects/404/95974e121862329.Y3JvcCw5MjIsNzIxLDAsMTM5.png" alt="" /></div>
  
</div>
          )}
        </>
      )}

      <Toast
        className="bottom-12 "
        position="left"
        opened={errorToast}
        button={
          <Button rounded clear small inline onClick={() => setErrorToast(false)}>
            Close
          </Button>
        }
      >
        <div className="shrink ">Table not available!</div>
      </Toast>

      <Toast
        className="bottom-12 "
        position="left"
        opened={toast}
        button={
          <Button rounded clear small inline onClick={() => setToast(false)}>
            Close
          </Button>
        }
      >
        <div className="shrink ">Please Select a Table to Proceed</div>
      </Toast>

      <Actions opened={actionScan} onBackdropClick={() => setActionScan(false)}>
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
    </UserLayout>
  );
}

export default Cart;
