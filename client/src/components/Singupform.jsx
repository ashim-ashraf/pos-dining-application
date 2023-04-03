import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Singupform() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState("");

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post("/api/users/signup", {
        name,
        email,
        password,
        phone,
      })
      .then((response) => {
        console.log("then", response);
        navigate("/");
      })
      .catch(async (err) => {
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

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  return (
    <div>
      <section>
        <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
          <div className="flex items-center flex-shrink-0 text-white mr-6">
            <svg
              className="fill-current h-8 w-8 mr-2"
              width="54"
              height="54"
              viewBox="0 0 54 54"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
            </svg>
            <span className="font-semibold text-xl tracking-tight">
              Dine Out
            </span>
          </div>
          <div className="block lg:hidden">
            <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
              <svg
                className="fill-current h-3 w-3"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </button>
          </div>
          <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
            <div className="text-sm lg:flex-grow">
              <a
                href="#responsive-header"
                className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
              >
                Docs
              </a>
              <a
                href="#responsive-header"
                className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
              >
                Examples
              </a>
              <a
                href="#responsive-header"
                className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white"
              >
                Blog
              </a>
            </div>
          </div>
        </nav>

        <div className="bg-grey-lighter min-h-screen flex flex-col">
          <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
            <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
              <h1 className="mb-8 text-3xl text-center">Sign up</h1>
              <input
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="fullname"
                placeholder="Full Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              {errors.name?.length>0 && (
                <span className="flex items-center font-medium tracking-wide text-red-500 text-xs ml-1">
                {errors.name[0]}
              </span>
              )}

              <input
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              {errors.email?.length>0 && (
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
                <span className="flex items-center font-medium tracking-wide text-red-500 text-xs  ml-1">
                {errors.password[0]}
              </span>
              )}

              <input
                type="number"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="phone"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
              {errors.phone?.length>0 && (
                <span className="flex items-center font-medium tracking-wide text-red-500 text-xs  ml-1">
                {errors.phone[0]}
              </span>
              )}

              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={onSubmit}
              >
                Create Account
              </button>
            </div>

            <div className="text-grey-dark mt-6">
              Already have an account?
              <Link to="/login">Login here</Link>.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Singupform;
