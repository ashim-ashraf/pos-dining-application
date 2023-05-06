import axios from "axios";
import React, { useEffect, useState } from "react";

function UserChatList({ conversation, tableId }) {

  const [vendor, setVendor] = useState([]);

  useEffect(() => {
    const vendorId = conversation.members.find((m) => m !== tableId);
console.log(vendorId)
    const getTable = async () => {
      try {
        const res = await axios.get(`/api/users/get-vendor/${vendorId}`);
        console.log(res.data,"axioas")
        setVendor(res.data.vendorDetails)
      } catch (error) {
        console.log(error);
      }
    };
    getTable();
  }, [tableId, conversation]);

  return (
    <button className="w-full text-left py-2 focus:outline-none focus-visible:bg-indigo-50">
      <div className="flex items-center">
        <img
          className="rounded-full items-start flex-shrink-0 mr-3"
          src="https://res.cloudinary.com/dc6deairt/image/upload/v1638102932/user-32-01_pfck4u.jpg"
          width={32}
          height={32}
          alt="Marie Zulfikar"
        />
        <div>
          <h4 className="text-sm font-semibold text-gray-900">
            {vendor.restaurantName}
          </h4>
          <div className="text-[13px]">Yes, you’re right but… · 14 Mar</div>
        </div>
      </div>
    </button>
  );
}

export default UserChatList;
