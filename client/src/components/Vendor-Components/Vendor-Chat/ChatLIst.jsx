import axios from 'axios';
import React, { useEffect, useState } from 'react'

function ChatLIst({conversation, vendorId}) {
  const [user,setUser] = useState(null)

  useEffect(() => {
    const tableId = conversation.members.find((m) => m !== vendorId);

    const getTable = async () => {
      try{
        const res = await axios(`/api/vendors/get-table/${tableId}`);
        console.log(res.data)
      } catch (error){
        console.log(error)
      }
    }
    getTable();
  },[vendorId, conversation])
  return (
    <div className="flex flex-row py-4 px-2 justify-center items-center border-b-2">
              <div className="w-1/4">
                <img
                  src="https://source.unsplash.com/_7LbC5J-jw4/600x600"
                  className="object-cover h-12 w-12 rounded-full"
                  alt=""
                />
              </div>
              <div className="w-full">
                <div className="text-lg font-semibold">Luis1994</div>
                <span className="text-gray-500">Pick me at 9:00 Am</span>
              </div>
            </div>
  )
}

export default ChatLIst