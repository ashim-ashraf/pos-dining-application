import React from 'react'

function ChatLayout() {
  return (
    // <div>
    // {/* component */}
    // {/* This is an example component */}
    // <div className="container mx-auto shadow-lg rounded-lg">
    //   {/* headaer */}
    //   <div className="px-5 py-5 flex justify-between items-center bg-white border-b-2">
    //     <div className="font-semibold text-2xl">GoingChat</div>
    //     <div className="w-1/2">
    //       <input type="text" name id placeholder="search IRL" className="rounded-2xl bg-gray-100 py-3 px-5 w-full" />
    //     </div>
    //     <div className="h-12 w-12 p-2 bg-yellow-500 rounded-full text-white font-semibold flex items-center justify-center">
    //       RA
    //     </div>
    //   </div>
    //   {/* end header */}
    //   {/* Chatting */}
    //   <div className="flex flex-row justify-between bg-white">
    //     {/* chat list */}
    //     <div className="flex flex-col w-2/5 border-r-2 overflow-y-auto">
    //       {/* search compt */}
    //       <div className="border-b-2 py-4 px-2">
    //         <input type="text" placeholder="search chatting" className="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full" />
    //       </div>
    //       {/* end search compt */}
    //       {/* user list */}
    //       <div className="flex flex-row py-4 px-2 justify-center items-center border-b-2">
    //         <div className="w-1/4">
    //           <img src="https://source.unsplash.com/_7LbC5J-jw4/600x600" className="object-cover h-12 w-12 rounded-full" alt="" />
    //         </div>
    //         <div className="w-full">
    //           <div className="text-lg font-semibold">Luis1994</div>
    //           <span className="text-gray-500">Pick me at 9:00 Am</span>
    //         </div>
    //       </div>
    //       <div className="flex flex-row py-4 px-2 items-center border-b-2">
    //         <div className="w-1/4">
    //           <img src="https://source.unsplash.com/otT2199XwI8/600x600" className="object-cover h-12 w-12 rounded-full" alt="" />
    //         </div>
    //         <div className="w-full">
    //           <div className="text-lg font-semibold">Everest Trip 2021</div>
    //           <span className="text-gray-500">Hi Sam, Welcome</span>
    //         </div>
    //       </div>
    //       <div className="flex flex-row py-4 px-2 items-center border-b-2 border-l-4 border-blue-400">
    //         <div className="w-1/4">
    //           <img src="https://source.unsplash.com/L2cxSuKWbpo/600x600" className="object-cover h-12 w-12 rounded-full" alt="" />
    //         </div>
    //         <div className="w-full">
    //           <div className="text-lg font-semibold">MERN Stack</div>
    //           <span className="text-gray-500">Lusi : Thanks Everyone</span>
    //         </div>
    //       </div>
    //       <div className="flex flex-row py-4 px-2 items-center border-b-2">
    //         <div className="w-1/4">
    //           <img src="https://source.unsplash.com/vpOeXr5wmR4/600x600" className="object-cover h-12 w-12 rounded-full" alt="" />
    //         </div>
    //         <div className="w-full">
    //           <div className="text-lg font-semibold">Javascript Indonesia</div>
    //           <span className="text-gray-500">Evan : some one can fix this</span>
    //         </div>
    //       </div>
    //       <div className="flex flex-row py-4 px-2 items-center border-b-2">
    //         <div className="w-1/4">
    //           <img src="https://source.unsplash.com/vpOeXr5wmR4/600x600" className="object-cover h-12 w-12 rounded-full" alt="" />
    //         </div>
    //         <div className="w-full">
    //           <div className="text-lg font-semibold">Javascript Indonesia</div>
    //           <span className="text-gray-500">Evan : some one can fix this</span>
    //         </div>
    //       </div>
    //       <div className="flex flex-row py-4 px-2 items-center border-b-2">
    //         <div className="w-1/4">
    //           <img src="https://source.unsplash.com/vpOeXr5wmR4/600x600" className="object-cover h-12 w-12 rounded-full" alt="" />
    //         </div>
    //         <div className="w-full">
    //           <div className="text-lg font-semibold">Javascript Indonesia</div>
    //           <span className="text-gray-500">Evan : some one can fix this</span>
    //         </div>
    //       </div>
    //       {/* end user list */}
    //     </div>
    //     {/* end chat list */}
    //     {/* message */}
    //     <div className="w-full px-5 flex flex-col justify-between">
    //       <div className="flex flex-col mt-5">
    //         <div className="flex justify-end mb-4">
    //           <div className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
    //             Welcome to group everyone !
    //           </div>
    //           <img src="https://source.unsplash.com/vpOeXr5wmR4/600x600" className="object-cover h-8 w-8 rounded-full" alt="" />
    //         </div>
    //         <div className="flex justify-start mb-4">
    //           <img src="https://source.unsplash.com/vpOeXr5wmR4/600x600" className="object-cover h-8 w-8 rounded-full" alt="" />
    //           <div className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
    //             Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
    //             at praesentium, aut ullam delectus odio error sit rem. Architecto
    //             nulla doloribus laborum illo rem enim dolor odio saepe,
    //             consequatur quas?
    //           </div>
    //         </div>
    //         <div className="flex justify-end mb-4">
    //           <div>
    //             <div className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
    //               Lorem ipsum dolor, sit amet consectetur adipisicing elit.
    //               Magnam, repudiandae.
    //             </div>
    //             <div className="mt-4 mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
    //               Lorem ipsum dolor sit amet consectetur adipisicing elit.
    //               Debitis, reiciendis!
    //             </div>
    //           </div>
    //           <img src="https://source.unsplash.com/vpOeXr5wmR4/600x600" className="object-cover h-8 w-8 rounded-full" alt="" />
    //         </div>
    //         <div className="flex justify-start mb-4">
    //           <img src="https://source.unsplash.com/vpOeXr5wmR4/600x600" className="object-cover h-8 w-8 rounded-full" alt="" />
    //           <div className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
    //             happy holiday guys!
    //           </div>
    //         </div>
    //       </div>
    //       <div className="py-5">
    //         <input className="w-full bg-gray-300 py-5 px-3 rounded-xl" type="text" placeholder="type your message here..." />
    //       </div>
    //     </div>
    //     {/* end message */}
    //     <div className="w-2/5 border-l-2 px-5">
    //       <div className="flex flex-col">
    //         <div className="font-semibold text-xl py-4">Mern Stack Group</div>
    //         <img src="https://source.unsplash.com/L2cxSuKWbpo/600x600" className="object-cover rounded-xl h-64" alt="" />
    //         <div className="font-semibold py-4">Created 22 Sep 2021</div>
    //         <div className="font-light">
    //           Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt,
    //           perspiciatis!
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div></div>

    <div>
    {/*
Include Tailwind JIT CDN compiler
More info: https://beyondco.de/blog/tailwind-jit-compiler-via-cdn
*/}
    {/* Specify a custom Tailwind configuration */}
    {/* Snippet */}
    <section className="flex flex-col justify-center antialiased bg-gray-50 text-gray-600 min-h-screen p-4">
      <div className="h-full">
        {/* Card */}
        <div className="relative max-w-[340px] mx-auto bg-white shadow-lg rounded-lg">
          {/* Card header */}
          <header className="pt-6 pb-4 px-5 border-b border-gray-200">
            <div className="flex justify-between items-center mb-3">
              {/* Image + name */}
              <div className="flex items-center">
                <a className="inline-flex items-start mr-3" href="#0">
                  <img className="rounded-full" src="https://res.cloudinary.com/dc6deairt/image/upload/v1638102932/user-48-01_nugblk.jpg" width={48} height={48} alt="Lauren Marsano" />
                </a>
                <div className="pr-1">
                  <a className="inline-flex text-gray-800 hover:text-gray-900" href="#0">
                    <h2 className="text-xl leading-snug font-bold">Lauren Marsano</h2>
                  </a>
                  <a className="block text-sm font-medium hover:text-indigo-500" href="#0">@lauren.mars</a>
                </div>
              </div>
              {/* Settings button */}
              <div className="relative inline-flex flex-shrink-0">
                <button className="text-gray-400 hover:text-gray-500 rounded-full focus:ring-0 outline-none focus:outline-none">
                  <span className="sr-only">Settings</span>
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16">
                    <path d="m15.621 7.015-1.8-.451A5.992 5.992 0 0 0 13.13 4.9l.956-1.593a.5.5 0 0 0-.075-.611l-.711-.707a.5.5 0 0 0-.611-.075L11.1 2.87a5.99 5.99 0 0 0-1.664-.69L8.985.379A.5.5 0 0 0 8.5 0h-1a.5.5 0 0 0-.485.379l-.451 1.8A5.992 5.992 0 0 0 4.9 2.87l-1.593-.956a.5.5 0 0 0-.611.075l-.707.711a.5.5 0 0 0-.075.611L2.87 4.9a5.99 5.99 0 0 0-.69 1.664l-1.8.451A.5.5 0 0 0 0 7.5v1a.5.5 0 0 0 .379.485l1.8.451c.145.586.378 1.147.691 1.664l-.956 1.593a.5.5 0 0 0 .075.611l.707.707a.5.5 0 0 0 .611.075L4.9 13.13a5.99 5.99 0 0 0 1.664.69l.451 1.8A.5.5 0 0 0 7.5 16h1a.5.5 0 0 0 .485-.379l.451-1.8a5.99 5.99 0 0 0 1.664-.69l1.593.956a.5.5 0 0 0 .611-.075l.707-.707a.5.5 0 0 0 .075-.611L13.13 11.1a5.99 5.99 0 0 0 .69-1.664l1.8-.451A.5.5 0 0 0 16 8.5v-1a.5.5 0 0 0-.379-.485ZM8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                  </svg>
                </button>
              </div>
            </div>
            {/* Meta */}
            <div className="flex flex-wrap justify-center sm:justify-start space-x-4">
              <div className="flex items-center">
                <svg className="w-4 h-4 fill-current flex-shrink-0 text-gray-400" viewBox="0 0 16 16">
                  <path d="M8 8.992a2 2 0 1 1-.002-3.998A2 2 0 0 1 8 8.992Zm-.7 6.694c-.1-.1-4.2-3.696-4.2-3.796C1.7 10.69 1 8.892 1 6.994 1 3.097 4.1 0 8 0s7 3.097 7 6.994c0 1.898-.7 3.697-2.1 4.996-.1.1-4.1 3.696-4.2 3.796-.4.3-1 .3-1.4-.1Zm-2.7-4.995L8 13.688l3.4-2.997c1-1 1.6-2.198 1.6-3.597 0-2.798-2.2-4.996-5-4.996S3 4.196 3 6.994c0 1.399.6 2.698 1.6 3.697 0-.1 0-.1 0 0Z" />
                </svg>
                <span className="text-sm whitespace-nowrap ml-2">Milan, IT</span>
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 fill-current flex-shrink-0 text-gray-400" viewBox="0 0 16 16">
                  <path d="M11 0c1.3 0 2.6.5 3.5 1.5 1 .9 1.5 2.2 1.5 3.5 0 1.3-.5 2.6-1.4 3.5l-1.2 1.2c-.2.2-.5.3-.7.3-.2 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l1.1-1.2c.6-.5.9-1.3.9-2.1s-.3-1.6-.9-2.2C12 1.7 10 1.7 8.9 2.8L7.7 4c-.4.4-1 .4-1.4 0-.4-.4-.4-1 0-1.4l1.2-1.1C8.4.5 9.7 0 11 0ZM8.3 12c.4-.4 1-.5 1.4-.1.4.4.4 1 0 1.4l-1.2 1.2C7.6 15.5 6.3 16 5 16c-1.3 0-2.6-.5-3.5-1.5C.5 13.6 0 12.3 0 11c0-1.3.5-2.6 1.5-3.5l1.1-1.2c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4L2.9 8.9c-.6.5-.9 1.3-.9 2.1s.3 1.6.9 2.2c1.1 1.1 3.1 1.1 4.2 0L8.3 12Zm1.1-6.8c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-4.2 4.2c-.2.2-.5.3-.7.3-.2 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l4.2-4.2Z" />
                </svg>
                <a className="text-sm font-medium whitespace-nowrap text-indigo-500 hover:text-indigo-600 ml-2" href="#0">carolinmcneail.com</a>
              </div>
            </div>
          </header>
          {/* Card body */}
          <div className="py-3 px-5">
            <h3 className="text-xs font-semibold uppercase text-gray-400 mb-1">Chats</h3>
            {/* Chat list */}
            <div className="divide-y divide-gray-200">
              {/* User */}
              <button className="w-full text-left py-2 focus:outline-none focus-visible:bg-indigo-50">
                <div className="flex items-center">
                  <img className="rounded-full items-start flex-shrink-0 mr-3" src="https://res.cloudinary.com/dc6deairt/image/upload/v1638102932/user-32-01_pfck4u.jpg" width={32} height={32} alt="Marie Zulfikar" />
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">Marie Zulfikar</h4>
                    <div className="text-[13px]">The video chat ended · 2hrs</div>
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
            </div>
          </div>
          {/* Bottom right button */}
          <button className="absolute bottom-5 right-5 inline-flex items-center text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 rounded-full text-center px-3 py-2 shadow-lg focus:outline-none focus-visible:ring-2">
            <svg className="w-3 h-3 fill-current text-indigo-300 flex-shrink-0 mr-2" viewBox="0 0 12 12">
              <path d="M11.866.146a.5.5 0 0 0-.437-.139c-.26.044-6.393 1.1-8.2 2.913a4.145 4.145 0 0 0-.617 5.062L.305 10.293a1 1 0 1 0 1.414 1.414L7.426 6l-2 3.923c.242.048.487.074.733.077a4.122 4.122 0 0 0 2.933-1.215c1.81-1.809 2.87-7.94 2.913-8.2a.5.5 0 0 0-.139-.439Z" />
            </svg>
            <span>New Chat</span>
          </button>
        </div>
      </div>
    </section>
    {/* More components */}
    <div x-show="open" className="fixed bottom-0 right-0 w-full md:bottom-8 md:right-12 md:w-auto z-60" x-data="{ open: true }">
      <div className="bg-gray-800 text-gray-50 text-sm p-3 md:rounded shadow-lg flex justify-between">
        {/* <div>👉 <a className="hover:underline ml-1" href="https://cruip.com/?ref=codepen-cruip-snippet-6" target="_blank">More components on Cruip.com</a></div> */}
        <button className="text-gray-500 hover:text-gray-400 ml-5" >
          <span className="sr-only">Close</span>
          <svg className="w-4 h-4 flex-shrink-0 fill-current" viewBox="0 0 16 16">
            <path d="M12.72 3.293a1 1 0 00-1.415 0L8.012 6.586 4.72 3.293a1 1 0 00-1.414 1.414L6.598 8l-3.293 3.293a1 1 0 101.414 1.414l3.293-3.293 3.293 3.293a1 1 0 001.414-1.414L9.426 8l3.293-3.293a1 1 0 000-1.414z" />
          </svg>
        </button>
      </div>
    </div>
  </div>
  )
}

export default ChatLayout