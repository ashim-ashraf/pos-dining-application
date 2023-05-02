
import { Toaster } from "react-hot-toast";
import { isValidEmail, isValidName, validateDescription, validatePhone } from "../../../../validation/validation";
import { useStepperContext } from "../../../../contexts/StepperContext";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";


export default function Account({userData,setUserData , handleChangeValidation, errors }) {

  // const { userData, setUserData } = useStepperContext();
  const [Restaurant, setRestaurant] = useState('')
  const vendorId = useSelector((state) => state.vendor.vendor.id);

  useEffect(() => {
    axios.get(`/api/vendors/listed-restaurant/${vendorId}`).then(async(res) => {
      console.log(res.data)
      setRestaurant(res.data)
      await setUserData(res.data);
    }).catch(() => {
      console.log("restaurant not listed")
    });
  }, [])

  useEffect(() => {
    console.log(errors)
  }, [errors])
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    // validateInputs();
    handleChangeValidation(e)
  };


  // const validateInputs = () => {
    
  //   let errors = {};
  //   if (!isValidName(userData.restaurantName)) {
  //     errors.restaurantName = "Please enter a restaurant name";
  //   }

  //   if (!userData.liscenceNo || !userData.liscenceNo.length === 6) {
  //     errors.liscenceNo = "Please enter a valid license number";
  //   }

  //   if (!validateDescription(userData.description)) {
  //     errors.description = "Please enter a description";
  //   }

  //   if (!isValidEmail(userData.email)) {
  //     errors.email = "Please enter a restaurant email";
  //   }

  //   if (!validatePhone(userData.restaurantPhone) && !userData.restaurantPhone?.length === 10) {
  //     errors.restaurantPhone = "Please enter a Restaurant phone number";
  //   }

  //   if (!isValidName(userData.address)) {
  //     errors.address = "Please enter a address";
  //   }

  //   if (!isValidName(userData.state)) {
  //     errors.state = "Please enter a state";
  //   }
  //   if (!userData.pincode) {
  //     errors.pincode = "Please enter a pincode";
  //   }
  //   if (!userData.pincode?.length === 6) {
  //     errors.pincode = "Please enter a valid pincode";
  //   }

  //   if (
  //     isValidName(userData.restaurantName) &&
  //     userData.liscenceNo &&
  //     userData.liscenceNo?.length === 6 &&
  //     validateDescription(userData.description) &&
  //     isValidEmail(userData.email) &&
  //     userData.email &&
  //     validatePhone(userData.restaurantPhone) &&
  //     userData.restaurantPhone?.length === 10 &&
  //     isValidName(userData.address) &&
  //     isValidName(userData.state) &&
  //     userData.pincode &&
  //     userData.pincode?.length === 6
  //   ) {
  //     SetValidate(true);
  //   }
  //   SetValidate(errors);

  //   return errors;
  // };


  return (
    <div className="flex flex-col ">
      <Toaster toastOptions={{ duration: 4000 }} />
      <div className="flex flex-wrap -mx-3 mb-4">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-first-name"
          >
            Restaurant Name
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-first-name"
            name="restaurantName"
            onChange={handleChange}
            value={userData["restaurantName"] || ""}
            type="text"
            placeholder="Resto Cafe"
          />
          <p className="text-red-500 text-xs italic">{errors?.restaurantName}</p>
        </div>
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-first-name"
          >
            Liscence No
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-first-name"
            name="liscenceNo"
            onChange={handleChange}
            value={userData["liscenceNo"] || ""}
            type="text"
            placeholder="862342"
          />
          {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-4">
      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <div className="w-full ">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-password"
          >
            Description
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-password"
            name="description"
            onChange={handleChange}
            value={userData["description"] || ""}
            type="text"
            placeholder="What the best you provide"
          />
          <p className="text-gray-600 text-xs italic">
            Make it as long and as crazy as you'd like
          </p>
        </div>
        </div>
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-first-name"
          >
            Restaurant Type
          </label>

          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-first-name"
            name="restaurantType"
            onChange={handleChange}
            value={userData["restaurantType"] || ""}
            type="text"
            placeholder="Resto Cafe"
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-4">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-first-name"
          >
            Email
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-first-name"
            name="email"
            onChange={handleChange}
            value={userData["email"] || ""}
            type="text"
            placeholder="RestoCafe@gmail.com"
          />
          {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
        </div>
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-first-name"
          >
            Phone
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-first-name"
            name="restaurantPhone"
            onChange={handleChange}
            value={userData["restaurantPhone"] || ""}
            type="text"
            placeholder="9994442211"
          />
          {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
        </div>
      </div>
      <div className="flex flex-wrap -mx-3">
        <div className="w-full md:w-1/3 px-3  md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-city"
          >
            Address
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-city"
            type="text"
            name="address"
            onChange={handleChange}
            value={userData["address"] || ""}
            placeholder="Albuquerque"
          />
        </div>
        <div className="w-full md:w-1/3 px-3  md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-city"
          >
            State
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-city"
            type="text"
            name="state"
            onChange={handleChange}
            value={userData["state"] || ""}
            placeholder="Albuquerque"
          />
        </div>
        <div className="w-full md:w-1/3 px-3 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-zip"
          >
            Zip
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-zip"
            name="pincode"
            type="text"
            onChange={handleChange}
            value={userData["pincode"] || ""}
            placeholder="90210"
          />
        </div>
      </div>
    </div>
  );
}










