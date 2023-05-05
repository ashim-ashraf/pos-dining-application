
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";


export default function Account({userData,setUserData , handleChangeValidation, errors }) {

  // const { userData, setUserData } = useStepperContext();
  // const [Restaurant, setRestaurant] = useState('')
  const vendorId = useSelector((state) => state.vendor.vendor.id);

  useEffect(() => {
    axios.get(`/api/vendors/listed-restaurant/${vendorId}`).then(async(res) => {
      console.log(res.data)
      // setRestaurant(res.data)
      const {
        restaurantName,
        liscenceNo,
        description,
        restaurantPhone,
        restaurantType,
        address,
        state,
        pincode,
        email,
      } = res.data;
      await setUserData({restaurantName: restaurantName,
      liscenceNo: liscenceNo,
      description: description,
      restaurantPhone: restaurantPhone,
      restaurantType:restaurantType,
      address: address,
      state: state,
      pincode:pincode,
      email:email});
    }).catch(() => {
      console.log("restaurant not listed")
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    console.log(errors)
  }, [errors])
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    handleChangeValidation(e)
  };




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
            <p className="text-red-500 text-xs italic">{errors?.liscenceNo}</p>
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
            <p className="text-red-500 text-xs italic">{errors?.description}</p>
          {/* <p className="text-gray-600 text-xs italic">
            Make it as long and as crazy as you'd like
          </p> */}
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
            <p className="text-red-500 text-xs italic">{errors?.restaurantType}</p>
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
            <p className="text-red-500 text-xs italic">{errors?.email}</p>
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
            <p className="text-red-500 text-xs italic">{errors?.restaurantPhone}</p>
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
            <p className="text-red-500 text-xs italic">{errors?.address}</p>
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
            <p className="text-red-500 text-xs italic">{errors?.state}</p>
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
            <p className="text-red-500 text-xs italic">{errors?.pincode}</p>
        </div>
      </div>
    </div>
  );
}










