import React, { useState } from "react";
import axios from "axios";
import { Link , useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../features/user/userSlice";

function Loginform() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("")
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (event) => {
    event.preventDefault();

    await axios
      .post("/api/users/signin", {
        email,
        password,
      })
      .then( (response) => {
        console.log("hi", response.data);
        dispatch(login(response.data));
        navigate("/home");
      }).catch(async (err) => {
        console.log(err.response.data.errors);
        // setErrors(err.response.data.errors)
        // console.log("hereeee",errors)
        let response = err.response.data.errors;
        console.log("response", response);
        function transformErrorsToObj(errors) {
          const transformedErrors = {};

          errors.forEach((error) => {
            const { field, message } = error;
            if (transformedErrors[field]) {
              transformedErrors[field].push(message);
            } else {
              transformedErrors[field] = [message];
            }
          });

          return transformedErrors;
        }

        let x = await transformErrorsToObj(response);
        setErrors(x);
      });
  };

  return (
    <div>
      <section>
 
        <div className="bg-grey-lighter min-h-screen flex flex-col">
          <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
            <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
              <h1 className="mb-8 text-3xl text-center">Login </h1>

              <input
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
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
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={onSubmit}
              >
                Login
              </button>
            </div>

            <div className="text-grey-dark mt-6">
              Do not have an accout?
              <Link to="/signup">Create New</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Loginform;
