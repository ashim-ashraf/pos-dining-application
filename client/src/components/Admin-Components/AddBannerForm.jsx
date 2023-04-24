import axios from "axios";
import React, { useState } from "react";

function AddBannerForm() {
  const [formdata, setFormdata] = useState({});

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
      })
      .catch(async (err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="flex flex-col">
        <div className="w-full md:w-8/12 px-3 mb-6 md:mb-0 mt-10 rounded-lg shadow-lg border-2"></div>
        <div className="w-full md:w-1/4  ml-auto mb-6 mt-10 md:mb-0 items-end border-2 border-sky-400 rounded-lg p-5 ">
          <div className="items-center font-bold text-center">Bannner Management </div>
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

            <div className="text-center">
              <button
                type="submit"
                onClick={onSubmit}
                className="bg-emerald-700 hover:bg-green-600 text-white font-bold py-2  rounded w-4/12 "
              >
                Add Item
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddBannerForm;
