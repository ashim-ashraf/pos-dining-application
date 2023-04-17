import React, { useState } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../firebase.js/firebase";
import { toast, Toaster } from "react-hot-toast";
import { CgSpinner } from "react-icons/cg";
import axios from "axios";
import { useDispatch } from "react-redux";
import { vendorLogin } from "../../features/authSlices/vendorSlice";
import { Link, useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { validatePhone } from "../../validation/validation";


function VendorLogin() {
  const [phone, setPhone] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onCaptchaVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "sign-in-button",
        {
          size: "invisible",
          callback: (response) => {
            handleSubmit();
          },
        },
        auth
      );
    }
  }

  
  const handleSubmit =  (e) => {
    e.preventDefault();

    try {
      if (!phone) {
        toast.error('Please fill in the credentials');
      }else{
        if(!validatePhone(phone)){
          toast.error('enter valid phone')
        }
        if(validatePhone(phone))
        { setLoading(true);
          const phoneNumber = "+" + phone;
          console.log(phone)
           axios.post('/api/vendors/check-vendor', {phone} ).then(() => {
            onCaptchaVerify();
          const appVerifier = window.recaptchaVerifier;
          signInWithPhoneNumber(auth, phoneNumber, appVerifier)
            .then((confirmationResult) => {
              window.confirmationResult = confirmationResult;
              toast.success("OTP sended successfully!");
              setShowOTP(true);
              setLoading(false);
            })
            .catch((error) => {
              toast.error(error.code)
              setLoading(false)
              console.log(error);
            });
          }).catch((error) => {
            toast.error("Account not found!");
            console.log("catch block", error)
            setLoading(false)
          })}
      }
    } catch (error) {
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
          .post("/api/vendors/signin", { user })
          .then((response) => {
            console.log(response);
            dispatch(vendorLogin(response.data));
            setLoading(false);
            navigate("/vendors/home");
          });
      })
      .catch((err) => {
        toast.error(err.code);
        console.log(err);
        setLoading(false);
      });
  }

  return (
    <div>
      <div id="sign-in-button"></div>
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
          <div className="bg-white -mt-20 shadow-md rounded-lg overflow-hidden w-80">
            <div className="items-center justify-between py-10 px-5 bg-white shadow-2xl rounded-lg mx-auto text-center">
              <div className="px-2 -mt-6">
                <div className="text-center">
                  <h1 className="text-3xl text-grey-800 font-medium leading-loose my-3 w-full">
                    Login
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
                      </div>
                      <button
                        onClick={onOTPVerify}
                        className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
                   px-4 py-3 mt-6"
                      >
                        {loading && (
                          <CgSpinner size={20} className="mt-1 animate-spin" />
                        )}
                        <span>Verify OTP</span>
                      </button>
                    </div>
                  ) : (
                    <div className="mt-6 ">

                      <div className="mt-2 ">
                        <label className="block text-gray-700">
                          Phone Number
                        </label>
                        <div className="w-full overflow-hidden">
                        <PhoneInput country={"in"} value={phone} onChange={setPhone}  />
                        </div>
                        
                      </div>
                      <button
                        onClick={handleSubmit}
                        className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
      px-4 py-3 mt-6"
                      >
                        {loading && (
                          <CgSpinner size={20} className="mt-1 animate-spin" />
                        )}
                        <span>Login</span>
                      </button>
                      <div className="text-grey-dark mt-6">
                        Do not have an accout? 
                        <Link to="/vendors/signup">Signup</Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        {/* end card */}
      </div>
      {/* end */}
    </div>
  );
}

export default VendorLogin;