import { Navbar } from 'konsta/react'
import React from 'react'

function MessageUser({message, ownMessage}) {

  return (

    <div className="chat-message">
    <div className={ownMessage?"flex items-end justify-end":"flex items-end justify-start"}>
      <div className={ownMessage?"flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end" : "flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1  items-start" }>
        <div>
          <span className={ownMessage?"px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white":"px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600"}>
            {message.text}
          </span>
        </div>
      </div>
      <img
        src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144"
        alt="My profile"
        className={ownMessage? "w-6 h-6 rounded-full order-2" : "w-6 h-6 rounded-full order-1"}
      />
    </div>
    <div className={ownMessage?"text-right":"text-left"}>{message.sender}</div>
  </div>
  )
}

export default MessageUser
