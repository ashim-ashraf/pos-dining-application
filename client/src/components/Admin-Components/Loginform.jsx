import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Toaster, toast } from "react-hot-toast";
import { isValidName } from "../../validation/validation";
import { adminLogin } from "../../features/authSlices/adminSlice";

function Loginform() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("")
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (event) => {
    event.preventDefault();
    if(isValidName(username) && password){
      await axios
      .post("/api/admin/signin", {
        username,
        password,
      })
      .then( async (response) => {
        await dispatch(adminLogin());
        navigate("/admin/dashboard");
      }).catch(async (err) => {
        console.log(err.response.data.errors);
        toast.error("Invalid Credentials")
      });
    } else {
      toast.error("Enter Valid Credentials")
    }
  };

  return (
    <div>
      <section>
        <div className="bg-slate-300 min-h-screen flex flex-col">
        <Toaster toastOptions={{ duration: 4000 }} />
          <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
            <div className="bg-white px-6 py-8 rounded shadow-2xl drop-shadow-2xl  text-black w-full">
              <h1 className="mb-8 text-3xl text-center">Login </h1>

              <input
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="username"
                placeholder="Username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />{errors.email?.length>0 && (
                <span className="flex items-center font-medium tracking-wide text-red-500 text-xs ml-1">
                {errors.email[0]}
              </span>
              )}

              <input
                type="password"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              {errors.password?.length>0 && (
                <span className="flex items-center font-medium tracking-wide text-red-500 text-xs ml-1">
                {errors.password[0]}
              </span>
              )}

              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
                onClick={onSubmit}
              >
                Login
              </button>
            </div>

           
          </div>
        </div>
      </section>
    </div>
  );
}

export default Loginform;
