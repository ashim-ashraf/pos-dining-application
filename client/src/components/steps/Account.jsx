import { useEffect } from "react";
import { useStepperContext } from "../../contexts/StepperContext";

export default function Account({SetValidate}) {
  const { userData, setUserData } = useStepperContext();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    validateInputs();
    console.log(userData)
  };

  const validateInputs = () => { 
    const errors = {};
  if (userData.restaurantName.length === 0) {
    errors.restaurantName = "Please enter a restaurant name";
  }
  if (!userData.liscenceNo) {
    errors.liscenceNo = "Please enter a license number";
  }

  if (!userData.description) {
    errors.description = "Please enter a description";
  }

  if (!userData.email) {
    errors.email = "Please enter a restaurant email";
  }

  if (!userData.restaurantPhone) {
    errors.restaurantPhone = "Please enter a Restaurant phone number";
  }

  
  if (!userData.address) {
    errors.address = "Please enter a address";
  }

  if (!userData.state) {
    errors.state = "Please enter a state";
  }
  if (!userData.pincode) {
    errors.pincode = "Please enter a pincode";
  }
  
  SetValidate(Object.keys(errors).length === 0);
  return errors;
  }

  return (
    <div className="flex flex-col ">
      
      <div class="flex flex-wrap -mx-3 mb-4">
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-first-name"
          >
            Restaurant Name
          </label>
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-first-name"
            name="restaurantName"
            onChange={handleChange}
            value={userData["restaurantName"] || ""}
            type="text"
            placeholder="Resto Cafe"
          />
          {/* <p class="text-red-500 text-xs italic">Please fill out this field.</p> */}
        </div>
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-first-name"
          >
            Liscence No
          </label>
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-first-name"
            name="liscenceNo"
            onChange={handleChange}
            value={userData["liscenceNo"] || ""}
            type="text"
            placeholder="FSSAI2324"
          />
          {/* <p class="text-red-500 text-xs italic">Please fill out this field.</p> */}
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 mb-4">
        <div class="w-full px-3">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-password"
          >
            Description
          </label>
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-password"
            name="description"
            onChange={handleChange}
            value={userData["description"] || ""}
            type="text"
            placeholder="What the best you provide"
          />
          <p class="text-gray-600 text-xs italic">
            Make it as long and as crazy as you'd like
          </p>
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 mb-4">
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-first-name"
          >
            Email
          </label>
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-first-name"
            name="email"
            onChange={handleChange}
            value={userData["email"] || ""}
            type="text"
            placeholder="RestoCafe@gmail.com"
          />
          {/* <p class="text-red-500 text-xs italic">Please fill out this field.</p> */}
        </div>
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-first-name"
          >
            Phone
          </label>
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-first-name"
            name="restaurantPhone"
            onChange={handleChange}
            value={userData["restaurantPhone"] || ""}
            type="text"
            placeholder="9994442211"
          />
          {/* <p class="text-red-500 text-xs italic">Please fill out this field.</p> */}
        </div>
      </div>
      <div class="flex flex-wrap -mx-3">
        <div class="w-full md:w-1/3 px-3  md:mb-0">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-city"
          >
            Address
          </label>
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-city"
            type="text"
            name="address"
            onChange={handleChange}
            value={userData["address"] || ""}
            placeholder="Albuquerque"
          />
        </div>
        <div class="w-full md:w-1/3 px-3  md:mb-0">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-city"
          >
            State
          </label>
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-city"
            type="text"
            name="state"
            onChange={handleChange}
            value={userData["state"] || ""}
            placeholder="Albuquerque"
          />
        </div>
        <div class="w-full md:w-1/3 px-3 md:mb-0">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-zip"
          >
            Zip
          </label>
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
