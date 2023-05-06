import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import ConversationWindow from "./MessageUser";
import UserLayout from "../UserLayout";
import UserChatList from "./UserChatList";
import MessageUser from "./MessageUser";

function ChatLayout() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const tableId = useSelector((state) => state.user.table);
  const [messages, setMessages] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef();

  console.log(tableId);
  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("/api/chat/conversation/" + tableId);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [tableId]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(`/api/chat/messages/${currentChat?._id}`);
        setMessages(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const message = {
      sender: tableId,
      text: newMessage,
      conversationId: currentChat._id,
    };

    try {
      const res = await axios.post("/api/chat/new-message", message);
      setMessages([...messages, res.data]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {currentChat ? (
        <>
          {/* Component Start */}
          <div className="flex flex-col flex-grow w-full max-w-xl bg-white shadow-xl rounded-lg overflow-hidden h-screen">
            <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
              {messages?.map((message) => (
                <div ref={scrollRef}>
                  <MessageUser
                    message={message}
                    ownMessage={message.sender === tableId}
                  />
                </div>
              ))}
            </div>
            <div className="bg-gray-300 p-4">
              <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
                <div className="flex-grow ml-4">
                  <div className="relative w-full">
                    <input
                      type="text"
                      onChange={(e) => setNewMessage(e.target.value)}
                      value={newMessage}
                      className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                    />
                    <button className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600"></button>
                  </div>
                </div>
                <div className="ml-4">
                  <button
                    onClick={handleSubmit}
                    className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                  >
                    <span>Send</span>
                    <span className="ml-2">
                      <svg
                        className="w-4 h-4 transform rotate-45 -mt-px"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Component End  */}
        </>
      ) : (
        <UserLayout>
          {" "}
          <div>
            {/* <section className="flex flex-col justify-center antialiased bg-gray-50 text-gray-600 min-h-screen p-4"> */}
            <div className="h-full">
              {/* Card */}
              <div className="relative max-w-screen mx-auto h-full bg-white  rounded-lg">
                {/* Card body */}
                <div className="py-3 px-5 h-full">
                  <h3 className="text-xs font-semibold uppercase text-gray-400 mb-1">
                    Chats
                  </h3>
                  {/* Chat list */}
                  <div className="divide-y divide-gray-200">
                    {/* User */}
                    {conversations.map((c, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          setCurrentChat(c);
                        }}
                      >
                        <UserChatList conversation={c} tableId={tableId} />
                      </div>
                    ))}
                    <hr />
                  </div>
                </div>
                {/* Bottom right button */}
              </div>
            </div>
            {/* </section> */}
            <button className="absolute bottom-15 right-5 inline-flex items-center text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 rounded-full text-center px-3 py-2 shadow-lg focus:outline-none focus-visible:ring-2">
              <svg
                className="w-3 h-3 fill-current text-indigo-300 flex-shrink-0 mr-2"
                viewBox="0 0 12 12"
              >
                <path d="M11.866.146a.5.5 0 0 0-.437-.139c-.26.044-6.393 1.1-8.2 2.913a4.145 4.145 0 0 0-.617 5.062L.305 10.293a1 1 0 1 0 1.414 1.414L7.426 6l-2 3.923c.242.048.487.074.733.077a4.122 4.122 0 0 0 2.933-1.215c1.81-1.809 2.87-7.94 2.913-8.2a.5.5 0 0 0-.139-.439Z" />
              </svg>
              <span>New Chat</span>
            </button>
          </div>
        </UserLayout>
      )}
    </>
  );
}

export default ChatLayout;
