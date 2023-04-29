import React, { useEffect, useState } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth, onSigninssubmit, recaptcha } from "../../firebase.js/firebase";
import { toast, Toaster } from "react-hot-toast";
import { CgSpinner } from "react-icons/cg";
import axios from "axios";
import { useDispatch } from "react-redux";
import { vendorLogin } from "../../features/authSlices/vendorSlice";
import { Link, useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { isValidName, validatePhone } from "../../validation/validation";

function VendorSignup() {
  const [phone, setPhone] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState("");
  const [counter, setCounter] = useState(60);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function resendotp() {
    const phoneNumber = "+" + phone;
    onSigninssubmit(phoneNumber)
      .then(() => {
        setCounter(60);
      })
      .catch((err) => {
        console.log(err);
      }); 
  }

  useEffect(() => {
    let timer =
      counter > 0 &&
      setInterval(() => {
        setCounter(counter - 1);
      }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [counter]);

  //send otp
  const handleSubmit = () => {
    recaptcha();
    try {
      if (!phone || !userName) {
        toast.error("Please fill in the credentials");
      } else {
        if (!isValidName(userName)) {
          toast.error("Enter Valid Name");
        }
        if (isValidName(userName)) {
          setLoading(true);
          const phoneNumber = "+" + phone;
          axios
            .post("/api/vendors/check-vendor", { phone })
            .then((res) => {
              setLoading(false);
              toast.error("Phone number in use!");
            })
            .catch(() => {
              onSigninssubmit(phoneNumber)
                .then(() => {
                  toast.success("OTP sended successfully!");
                  setShowOTP(true);
                  setLoading(false);
                  console.log(userName);
                })
                .catch((error) => {
                  setLoading(false);
                  toast.error("Invalid Phone number");
                  console.log(error);
                });
            });
        }
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res.user);
        let user = res.user;
        await axios
          .post("/api/vendors/signup", { user, userName })
          .then((response) => {
            console.log(response);
            dispatch(vendorLogin(response.data));
            setLoading(false);
            navigate("/vendors/home");
          });
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.code);
        setLoading(false);
      });
  }

  return (
    <div>
      <div id="recaptcha-container"></div>
      <Toaster toastOptions={{ duration: 4000 }} />
      {/* start */}
      <div className="flex flex-col justify-center items-center mx-auto ">
        <div
          style={{
            backgroundImage:
              "url(https://www.shutterstock.com/image-photo/assortment-cooked-food-vegetables-chicken-260nw-1624168432.jpg)",
          }}
          className=" bg-gray-300 h-80 w-full rounded-lg shadow-md bg-cover bg-center"
        ></div>
        {/* Card */}
        {user ? (
          <h2 className="text-center text-white font-medium text-2xl">
            👍Login Success
          </h2>
        ) : (
          <div className="bg-white -mt-20 shadow-md rounded-lg overflow-hidden w-80">
            <div className="items-center justify-between py-10 px-5 bg-white shadow-2xl rounded-lg mx-auto text-center">
              <div className="px-2 -mt-6">
                <div className="text-center">
                  <h1 className="text-3xl text-grey-800 font-medium leading-loose my-3 w-full">
                    Signup
                  </h1>
                  {showOTP ? (
                    <div className="mt-6">
                      <div>
                        <label className="block text-gray-700">Enter OTP</label>
                        <input
                          onChange={(e) => setOtp(e.target.value)}
                          type="text"
                          name=""
                          id=""
                          value={otp}
                          placeholder="Enter 6 digit OTP"
                          className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                          autoComplete=""
                          required
                        />
                        <label>OTP sent to {phone}</label>
                        <label>
                          {counter > 0 ? (
                            <div>Time Remainig {counter}</div>
                          ) : (
                            ""
                          )}
                        </label>
                      </div>
                      {!counter ? (
                        <button
                          onClick={resendotp}
                          className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
                   px-4 py-3 mt-6"
                        >
                          <span className="flex items-center justify-center w-full">
                            {loading && (
                              <CgSpinner
                                size={20}
                                className="mt-1 animate-spin"
                              />
                            )}
                            Resend OTP
                          </span>
                        </button>
                      ) : (
                        <button
                          onClick={onOTPVerify}
                          className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
                   px-4 py-3 mt-6"
                        >
                          <span className="flex items-center justify-center w-full">
                            {loading && (
                              <CgSpinner
                                size={20}
                                className="mt-1 animate-spin"
                              />
                            )}
                            Verify OTP
                          </span>
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="mt-6">
                      <div>
                        <label className="block text-gray-700">Username</label>
                        <input
                          onChange={(e) => setUserName(e.target.value)}
                          type="text"
                          name="name"
                          id=""
                          placeholder="Enter Phone Number"
                          className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                          autoComplete=""
                          required
                        />
                      </div>

                      <div className="mt-2">
                        <label className="block text-gray-700">
                          Phone Number
                        </label>
                        <div className="w-full overflow-hidden">
                          <PhoneInput
                            country={"in"}
                            value={phone}
                            onChange={setPhone}
                          />
                        </div>
                      </div>
                      <button
                        onClick={handleSubmit}
                        className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
      px-4 py-3 mt-6"
                      >
                        <span className="flex items-center justify-center w-full">
                          {/* {loading && (
                          <CgSpinner size={20} className="mt-1 animate-spin" />
                        )} */}
                          Signup
                        </span>
                      </button>
                      <div className="text-grey-dark mt-6">
                        Already have an accout?
                        <Link to="/vendors/login">Login</Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        {/* end card */}
      </div>
      {/* end */}
    </div>
  );
}

export default VendorSignup;
