import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  isValidName,
  
  validateImage,
  
  validateUrl,
} from "../../validation/validation";
import { Toaster, toast } from "react-hot-toast";
import { IoTrashSharp } from "react-icons/io5";

function AddBannerForm() {
  const [formdata, setFormdata] = useState({});
  const [data, setData] = useState(null);
  const [vendors, setVendors] = useState(null)

  useEffect(() => {
    getBanners();
    getVendors();
  }, []);

  const getBanners = () => {
    axios
    .get("/api/admin/get-banners")
    .then((res) => {
      console.log(res.data);
      setData(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  const getVendors = () => {
    axios.get("/api/admin/get-vendors").then((res) => {
      setVendors(res.data)
      console.log(res.data)
    }).catch((err) => {
      toast.error("Vendors Not Found")
    })
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata({ ...formdata, [name]: value });
  };

  function handleImageChange(event) {
    const { name } = event.target;
    const file = event.target.files[0];
    setFormdata({ ...formdata, [name]: file });
  }

  const onSubmit = () => {
    if (!isValidName(formdata.title)) {
      toast.error("Enter a valid name");
    } else if (!validateUrl(formdata.url)) {
      toast.error("Enter a valid endpoint");
    } else if (!formdata.image) {
      toast.error("Select a valid image for upload");
    } else if (!validateImage(formdata.image)) {
      toast.error("Select a valid image for upload");
    } else {
      const submitFormData = new FormData();
      for (const key in formdata) {
        submitFormData.append(key, formdata[key]);
      }
      axios
        .post("/api/admin/create-banner", submitFormData)
        .then((response) => {
          if (response.data.success) {
            setFormdata({});
          }
          getBanners();
        })
        .catch(async (err) => {
          console.log(err);
        });
    }
  };

  const deleteBanner = (id) => {
    axios.delete(`/api/admin/delete-banner/${id}`).then((res) => {
      toast.success("Banner Deleted")
      getBanners()
    }).catch((error) => {
      toast.error("Banner Deletion Failed")
    })
  }

  return (
    <div>
      <Toaster toastOptions={{ duration: 4000 }} />
      <div className="flex flex-col">
        <div className="flex">
          <div className="w-full md:w-8/12 px-3 mb-6 md:mb-0 mt-10 rounded-lg shadow-lg border-2">
            <>
              <table className="items-center w-full bg-transparent border-collapse">
                <thead>
                  <tr>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ">
                      Image
                    </th>

                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ">
                      Title
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ">
                      Banner URL
                    </th>
                    <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.length > 0 &&
                    data.map((item, index) => {
                      return (
                        <tr>
                          <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                            <img
                              className="w-30 h-16 object-cover rounded-lg"
                              src={item?.image}
                              alt=""
                            />
                          </th>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {item?.title}
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {item?.url}
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <div className="flex gap-3">
                              <span>
                                <IoTrashSharp onClick={() => deleteBanner(item._id)} />
                              </span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </>
          </div>
          <div className="w-full md:w-1/4  ml-auto mb-6 mt-10 md:mb-0 items-end border-2 border-sky-400 rounded-lg p-5 ">
            <div className="items-center font-bold text-center">
              Bannner Management{" "}
            </div>
            <div className="justify-center">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-2"
                for="grid-retailPrice-name"
              >
                Title
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border mt-3  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-retailPrice-name"
                name="title"
                onChange={handleChange}
                value={formdata["title"] || ""}
                type="text"
                placeholder="Party Bash"
              />
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-2"
                for="grid-retailPrice-name"
              >
                Banner URL
              </label>
              <select
                className="appearance-none block w-full bg-gray-200 text-gray-700 border mt-3  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-retailPrice-name"
                name="url"
                onChange={handleChange}
                value={formdata["url"] || ""}
                type="text"
                placeholder="/bestsellers"
              >
              <option value="">Select a Vendor</option>
                    {vendors?.map((vendor, index) => (
                      <option key={index} value={"/"+vendor._id}>
                        {vendor.restaurantName}
                      </option>
                    ))}
              </select>

              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-2"
                for="grid-sellingPrice-name"
              >
                Upload Image
              </label>
              <input
                id="image-upload"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border mt-3  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="file"
                name="image"
                onChange={handleImageChange}
                required
              />

              <div className="text-center">
                <button
                  type="submit"
                  onClick={onSubmit}
                  className="bg-emerald-700 hover:bg-green-600 text-white font-bold py-2   rounded w-4/12 "
                >
                  Add Item
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddBannerForm;
