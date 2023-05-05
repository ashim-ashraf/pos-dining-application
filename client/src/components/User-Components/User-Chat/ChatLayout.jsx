import React from 'react'

function ChatLayout() {
  return (
    <div>
  
    {/* <section className="flex flex-col justify-center antialiased bg-gray-50 text-gray-600 min-h-screen p-4"> */}
      <div className="h-full">
        {/* Card */}
        <div className="relative max-w-screen mx-auto h-full bg-white  rounded-lg">
         
          {/* Card body */}
          <div className="py-3 px-5 h-full">
            <h3 className="text-xs font-semibold uppercase text-gray-400 mb-1">Chats</h3>
            {/* Chat list */}
            <div className="divide-y divide-gray-200">
              {/* User */}
              <button className="w-full text-left py-2 focus:outline-none focus-visible:bg-indigo-50">
                <div className="flex items-center">
                  <img className="rounded-full items-start flex-shrink-0 mr-3" src="https://res.cloudinary.com/dc6deairt/image/upload/v1638102932/user-32-01_pfck4u.jpg" width={32} height={32} alt="Marie Zulfikar" />
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">Marie Zulfikar</h4>
                    <div className="text-[13px]">Yes, you’re right but… · 14 Mar</div>
                  </div>
                </div>
              </button>
              {/* User */}
              <button className="w-full text-left py-2 focus:outline-none focus-visible:bg-indigo-50">
                <div className="flex items-center">
                  <img className="rounded-full items-start flex-shrink-0 mr-3" src="https://res.cloudinary.com/dc6deairt/image/upload/v1638102932/user-32-02_vll8uv.jpg" width={32} height={32} alt="Nhu Cassel" />
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">Nhu Cassel</h4>
                    <div className="text-[13px]">Hello Lauren 👋, · 24 Mar</div>
                  </div>
                </div>
              </button>
              {/* User */}
              <button className="w-full text-left py-2 focus:outline-none focus-visible:bg-indigo-50">
                <div className="flex items-center">
                  <img className="rounded-full items-start flex-shrink-0 mr-3" src="https://res.cloudinary.com/dc6deairt/image/upload/v1638102932/user-32-03_uzwykl.jpg" width={32} height={32} alt="Patrick Friedman" />
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">Patrick Friedman</h4>
                    <div className="text-[13px]">Yes, you’re right but… · 14 Mar</div>
                  </div>
                </div>
              </button>
              {/* User */}
              <button className="w-full text-left py-2 focus:outline-none focus-visible:bg-indigo-50">
                <div className="flex items-center">
                  <img className="rounded-full items-start flex-shrink-0 mr-3" src="https://res.cloudinary.com/dc6deairt/image/upload/v1638102932/user-32-04_ttlftd.jpg" width={32} height={32} alt="Byrne McKenzie" />
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">Byrne McKenzie</h4>
                    <div className="text-[13px]">Hey Lauren ✨, first of all… · 14 Mar</div>
                  </div>
                </div>
              </button>
              {/* User */}
              <button className="w-full text-left py-2 focus:outline-none focus-visible:bg-indigo-50">
                <div className="flex items-center">
                  <img className="rounded-full items-start flex-shrink-0 mr-3" src="https://res.cloudinary.com/dc6deairt/image/upload/v1638102932/user-32-05_bktgmb.jpg" width={32} height={32} alt="Scott Micheal" />
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">Scott Micheal</h4>
                    <div className="text-[13px]">No way 🤙! · 11 Mar</div>
                  </div>
                </div>
              </button>
              <hr/>
            </div>
          </div>
          {/* Bottom right button */}
          
        </div>
      </div>
    {/* </section> */}
    <button className="absolute bottom-15 right-5 inline-flex items-center text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 rounded-full text-center px-3 py-2 shadow-lg focus:outline-none focus-visible:ring-2">
            <svg className="w-3 h-3 fill-current text-indigo-300 flex-shrink-0 mr-2" viewBox="0 0 12 12">
              <path d="M11.866.146a.5.5 0 0 0-.437-.139c-.26.044-6.393 1.1-8.2 2.913a4.145 4.145 0 0 0-.617 5.062L.305 10.293a1 1 0 1 0 1.414 1.414L7.426 6l-2 3.923c.242.048.487.074.733.077a4.122 4.122 0 0 0 2.933-1.215c1.81-1.809 2.87-7.94 2.913-8.2a.5.5 0 0 0-.139-.439Z" />
            </svg>
            <span>New Chat</span>
          </button>
  </div>
  )
}

export default ChatLayout