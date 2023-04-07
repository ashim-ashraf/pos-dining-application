import React, { useState } from "react";

function Category() {

 const [AddCategory, setAddCategory] = useState('');
 

  return (
    <div className="flex flex-col ">
        <h1 className="text-xl font-bold mt-8 ">Menu Management</h1>
      <div class="flex flex-wrap">
        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0 mt-10 rounded-lg shadow-lg">
        <h1 className="text-l font-bold mb-4" >ADD MENU ITEMS</h1>
        <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-2"
            for="grid-first-name"
          >
            Item Name
          </label>
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border mt-3  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-first-name"
            name="itemName"
            // onChange={handleChange}
            // value={userData["restaurantName"] || ""}
            type="text"
            placeholder="Resto Cafe"
          />

<label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-2"
            for="grid-first-name"
          >
            Description
          </label>
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border mt-3  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-first-name"
            name="description"
            // onChange={handleChange}
            // value={userData["restaurantName"] || ""}
            type="text"
            placeholder="Resto Cafe"
          />

<label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-2"
            for="grid-first-name"
          >
            Category
          </label>
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border mt-3  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-first-name"
            name="category"
            // onChange={handleChange}
            // value={userData["restaurantName"] || ""}
            type="text"
            placeholder="Resto Cafe"
          />

<label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-2"
            for="grid-first-name"
          >
            Max Retail Price
          </label>
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border mt-3  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-first-name"
            name="retailPrice"
            // onChange={handleChange}
            // value={userData["restaurantName"] || ""}
            type="text"
            placeholder="Resto Cafe"
          />

<label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-2"
            for="grid-first-name"
          >
            Selling Price
          </label>
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border mt-3  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-first-name"
            name="sellingPrice"
            // onChange={handleChange}
            // value={userData["restaurantName"] || ""}
            type="text"
            placeholder="Resto Cafe"
          />
          <div className="mb-5">
            <button
              type="submit"
              className="bg-emerald-700 hover:bg-blue-700 text-white font-bold py-2  rounded w-4/12"
            >
              Add Item
            </button>
          </div>
        </div>
        <div class="w-full md:w-1/4  ml-auto mb-6 mt-10 md:mb-0  ">
          <div className="px-3 border-emerald-600 border-2 rounded-lg">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-2"
            for="grid-first-name"
          >
            Add Menu Category
          </label>
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-first-name"
            name="category"
            onChange={(e) => {setAddCategory(e.target.value)}}
            value={AddCategory}
            type="text"
            placeholder="Desserts"
          />
          <div className="mb-5">
            <button
              type="submit"
              className="bg-emerald-700 hover:bg-blue-700 text-white font-bold py-2  rounded w-full"
            >
              Add Category
            </button>
          </div>
          </div>


          <div className="px-3 mt-5 border-emerald-600 border-2 rounded-lg">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-2"
            for="grid-first-name"
          >
            Categories
          </label>
         
          </div>


          
        </div>
      </div>
    </div>
  );
}

export default Category;
