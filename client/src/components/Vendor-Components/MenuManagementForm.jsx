import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { IoTrashSharp } from "react-icons/io5";

import { Toaster, toast } from "react-hot-toast";
import {
  isValidName,
  validateDescription,
  validateDropdown,
  validateImage,
  validatePrice,
} from "../../validation/validation";

function MenuManagementForm() {
  const [categoryName, setCategoryName] = useState("");
  const [category, setCategory] = useState([]);
  const [formdata, setFormdata] = useState({});
  const [menu, setMenu] = useState([]);
  const [menuManagement, setMenuManagement] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [showPublishButton, setShowPublishButton] = useState(false);
  const userId = useSelector((state) => state.vendor.vendor.id);

  const handleCategorySubmit = (e) => {
    try {
      if (!isValidName(categoryName)) {
        toast.error("Enter Valid Catefory Name");
      }
      if (isValidName(categoryName)) {
        axios
          .post("/api/vendors/category", { userId, categoryName })
          .then(() => {
            getCategories();
          }).catch((res) => {
            toast.error("Failed adding category")
          })
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkApproval = () => {
    axios
      .get(`/api/vendors/vendor-approval/${userId}`)
      .then((res) => {
        setShowPublishButton(res.data);
      })
      .catch((err) => {
        toast.error("Waiting for Approval");
      });
  };

  useEffect(() => {
    axios
      .get(`/api/vendors/menu/${userId}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((res) => {
        setMenu(res.data.menu);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [menuManagement, userId]);

  useEffect(() => {
    checkApproval();
    getCategories();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCategories = () => {
    axios
      .get(`/api/vendors/category/${userId}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((res) => {
        setCategory(res.data.categories);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDeleteCategory = (name) => {
    deleteCategory(name);
  };

  function deleteCategory(name) {
    axios
      .delete(`/api/categories/${userId}/${name}`)
      .then((response) => {
        setCategory(category.filter((item) => item !== name));
      })
      .catch((error) => {
        console.log(error);
      });
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

  const onMenuItemSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!isValidName(formdata.itemName)) {
        toast.error("Enter Valid Item Name");
      } else if (!validateDescription(formdata.description)) {
        toast.error("Enter Valid Description");
      } else if (!validateDropdown(formdata.category)) {
        toast.error("Select Valid Category");
      } else if (!validatePrice(formdata.retailPrice)) {
        toast.error("Enter Valid Retail Price");
      } else if (!validatePrice(formdata.sellingPrice)) {
        toast.error("Enter Valid Selling Price");
      } else if (formdata.retailPrice < formdata.sellingPrice) {
        toast.error("Enter Valid Selling Price");
      } else if (!validateImage(formdata.image)) {
        toast.error("Select a valid image for upload");
      } else {
        formdata.userId = userId;
        const submitFormData = new FormData();
        for (const key in formdata) {
          submitFormData.append(key, formdata[key]);
        }

        axios
          .post("/api/vendors/create-menuItem", submitFormData)
          .then((response) => {
            if (response.data.success) {
              setMenuManagement(false);
              setFormdata({});
            }
          })
          .catch(async (err) => {
            console.log(err);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editItemSubmit = () => {
    try {
      if (!isValidName(formdata.itemName)) {
        toast.error("Enter Valid Item Name");
      } else if (!validateDescription(formdata.description)) {
        toast.error("Enter Valid Description");
      } else if (!validateDropdown(formdata.category)) {
        toast.error("Select Valid Category");
      } else if (!validatePrice(formdata.retailPrice)) {
        toast.error("Enter Valid Retail Price");
      } else if (!validatePrice(formdata.sellingPrice)) {
        toast.error("Enter Valid Selling Price");
      } else if (formdata.retailPrice < formdata.sellingPrice) {
        toast.error("Enter Valid Selling Price");
      } else if (!showImage) {
        // debugger;
        //validate the image
        if (!validateImage(formdata.image)) {
          toast.error("Enter a valid image");
        } else {
          editpost();
        }
      } else {
        editpost();
      }
    } catch (error) {
      console.log(error);
    }
  };

  //form data appending and api call after edit validations
  const editpost = () => {
    formdata.userId = userId;
    const submitFormData = new FormData();
    for (const key in formdata) {
      submitFormData.append(key, formdata[key]);
    }

    axios
      .post("/api/vendors/edit-menuItem", submitFormData)
      .then((response) => {
        if (response.data.success) {
          setMenuManagement(false);
          setFormdata({});
        }
      })
      .catch(async (err) => {
        console.log(err);
      });
  };

  const deletImage = (deletedImage) => {
    delete formdata.image;
    setShowImage(false);
  };

  const publishRestaurant = () => {
    axios
      .post(`/api/vendors/publish-vendors/${userId}`)
      .then((res) => {
        toast.success("vendor published");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEditItem = (item) => {
    setFormdata(item);
    setMenuManagement(true);
    setShowImage(true);
  };

  return (
    <>
      <Toaster toastOptions={{ duration: 4000 }} />
      {menuManagement ? (
        <div className="flex flex-col ">
          <div className="flex justify-between items-center border-b-2 pb-2 mb-4">
            <div className="ml-auto">
              <button
                onClick={(e) => {
                  setMenuManagement(false);
                  setFormdata({});
                }}
                className="bg-emerald-700 hover:bg-green-600 text-white font-bold py-2 mx-4 mt-2 rounded w-full"
              >
                Go Back
              </button>
            </div>
          </div>
          <h1 className="text-xl font-bold mt-8 text-center">
            Menu Management
          </h1>
          <div className="flex flex-wrap">
            <div className="w-full md:w-8/12 ml-auto px-3 mb-6 md:mb-0 mt-10 rounded-lg shadow-lg">
              <h1 className="text-l font-bold mb-4">ADD MENU ITEMS</h1>

              <div className="flex flex-wrap">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 mt-10 rounded-lg ">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-2"
                    for="grid-first-name"
                  >
                    Item Name
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border mt-3  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="grid-first-name"
                    name="itemName"
                    onChange={handleChange}
                    value={formdata["itemName"]}
                    type="text"
                    placeholder="Resto Cafe"
                  />

                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-2"
                    for="grid-second-name"
                  >
                    Description
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border mt-3  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="grid-second-name"
                    name="description"
                    onChange={handleChange}
                    value={formdata["description"] || ""}
                    type="text"
                    placeholder="Resto Cafe"
                  />

                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-2"
                    for="grid-third-name"
                  >
                    Category
                  </label>
                  <select
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border mt-3 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="category"
                    name="category"
                    onChange={handleChange}
                    value={formdata["category"] || ""}
                  >
                    <option value="">Select a category</option>
                    {category.map((category, index) => (
                      <option key={index} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 mt-10 rounded-lg ">
                  {" "}
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-2"
                    for="grid-retailPrice-name"
                  >
                    Max Retail Price
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border mt-3  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="grid-retailPrice-name"
                    name="retailPrice"
                    onChange={handleChange}
                    value={formdata["retailPrice"] || ""}
                    type="text"
                    placeholder="Resto Cafe"
                  />
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-2"
                    for="grid-sellingPrice-name"
                  >
                    Selling Price
                  </label>
                  <input
                    className="appearance-none block  w-full bg-gray-200 text-gray-700 border mt-3  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="grid-sellingPrice-name"
                    name="sellingPrice"
                    onChange={handleChange}
                    value={formdata["sellingPrice"] || ""}
                    type="text"
                    placeholder="Resto Cafe"
                  />
                  {showImage ? (
                    <div className="mt-7">
                      <div className=" flex ">
                        <div className="relative">
                          <img
                            src={formdata?.image}
                            alt=""
                            className="w-40 h-16 object-cover rounded-lg"
                          />
                          <button
                            onClick={() => deletImage(formdata.image)}
                            className="absolute top-0 right-0 p-2 m-2 bg-white rounded-full"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-2 w-2 text-gray-900"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
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
                      />
                    </>
                  )}
                </div>
              </div>

              <div className="mb-5 mt-6 flex justify-center">
                {formdata["itemName"] && formdata["_id"] ? (
                  <>
                    <button
                      type="submit"
                      onClick={editItemSubmit}
                      className="bg-emerald-700 hover:bg-green-600 text-white font-bold py-2  rounded w-4/12 "
                    >
                      Edit Item
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="submit"
                      onClick={onMenuItemSubmit}
                      className="bg-emerald-700 hover:bg-green-600 text-white font-bold py-2  rounded w-4/12 "
                    >
                      Add Item
                    </button>
                  </>
                )}
              </div>
            </div>
            <div className="w-full md:w-1/4  ml-auto mb-6 mt-10 md:mb-0  ">
              <div className="px-3 border-emerald-600 border-2 rounded-lg">
                <label
                  className=" uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-2 flex justify-center"
                  for="grid-first-name"
                >
                  Add Menu Category
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="grid-first-name"
                  name="categoryName"
                  onChange={(e) => {
                    setCategoryName(e.target.value);
                  }}
                  value={categoryName}
                  type="text"
                  placeholder="Desserts"
                />
                <div className="mb-5">
                  <button
                    type="submit"
                    onClick={handleCategorySubmit}
                    className="bg-emerald-700 hover:bg-green-600 text-white font-bold py-2  rounded w-full"
                  >
                    Add Category
                  </button>
                </div>
              </div>

              <div className="px-3 mt-5 border-emerald-600 border-2 rounded-lg">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-2 text-center"
                  for="grid-first-name"
                >
                  Categories
                </label>
                <div id="categorylist" className="mb-2 ">
                  <ul>
                    {category.map((item, index) => (
                      <li key={index}>
                        <div className="flex items-center uppercase">
                          <span className="text-lg ">{item}</span>
                          <IoTrashSharp
                            className="ml-auto"
                            onClick={() => handleDeleteCategory(item)}
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <section>
          <div className="flex justify-between items-center border-b-2 pb-2 mb-4">
            <div className="flex flex-row ml-auto">
              {showPublishButton ? (
                <>
                <button
                  onClick={publishRestaurant}
                  className="bg-emerald-700 hover:bg-green-600 text-white font-bold py-2 mx-6 mt-2 rounded w-full"
                >
                  Publish Menu
                </button>
                <button
                onClick={(e) => {
                  setMenuManagement(true);
                }}
                className="bg-emerald-700 hover:bg-green-600 text-white font-bold py-2 mx-4 mt-2 rounded w-full"
              >
                Menu management
              </button>
              </>
              ) : (
                <div>Waiting Approval</div>
              )}

              
            </div>
          </div>
          <div className="flex flex-col ">
            <div className="flex flex-wrap -mx-3 mb-4">
              {category.map((category) => (
                <div
                  className="w-full md:w-1/2 px-3 mb-6 md:mb-0 mt-5 uppercase"
                  key={category}
                >
                  <h2 className="text-sm font-bold bg-menugreen  py-2 text-center">
                    {category}
                  </h2>
                  <ul className="bg-listgreen px-2 text-sm py-2">
                    {menu
                      .filter((item) => item.category === category)
                      .map((item, index) => (
                        <div className="flex">
                          <li key={index}>
                            {item.itemName} - {item.sellingPrice}
                          </li>
                          <i
                            onClick={() => {
                              handleEditItem(item);
                            }}
                            className="fa-regular fa-pen-to-square justify-center ml-auto"
                          ></i>
                        </div>
                      ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default MenuManagementForm;
