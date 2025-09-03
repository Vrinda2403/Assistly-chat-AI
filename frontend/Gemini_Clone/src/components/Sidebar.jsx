import React, { useState, useEffect } from "react";
import {
  XMarkIcon,
  ArrowRightStartOnRectangleIcon,
  UserIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Sidebar = ({ isOpen, setIsOpen, setCurrentChat }) => {
  const [, setAuthUser] = useAuth();
  const navigate = useNavigate();

  const [chats, setChats] = useState(JSON.parse(localStorage.getItem("chats")) || []);
  const User = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    localStorage.setItem("chats", JSON.stringify(chats));
  }, [chats]);

  const handleNewChat = () => {
    const newChat = {
      id: Date.now(),
      name: `Chat ${chats.length + 1}`,
      messages: [],
    };
    setChats([newChat, ...chats]);
    setCurrentChat(newChat);
  };

  const handleSelectChat = (chat) => setCurrentChat(chat);

  const handleDeleteChat = (chatId) => {
    if (!window.confirm("Are you sure you want to delete this chat?")) return;
    const updatedChats = chats.filter((chat) => chat.id !== chatId);
    setChats(updatedChats);
    if (setCurrentChat && setCurrentChat.id === chatId) setCurrentChat(null);
  };

  const handleLogout = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/vl/user/logout", { withCredentials: true });
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setAuthUser(null);
      alert(response.data.message);
      navigate("/login");
    } catch (error) {
      alert(error?.response?.data?.errors || "Logout Failed");
    }
  };

  return (
    <>
      {/* Mobile toggle button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed top-4 left-4 bg-indigo-600 p-2 rounded-full z-50 shadow-lg"
        >
          Open
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full z-40 transition-all duration-300 flex flex-col justify-between ${
          isOpen ? "w-64 bg-[#232327]" : "w-0 overflow-hidden"
        }`}
      >
        {isOpen && (
          <>
            <div className="flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-700">
                <h2 className="text-xl font-bold text-white">Assistly</h2>
                <button onClick={() => setIsOpen(false)}>
                  <XMarkIcon className="w-6 h-6 text-gray-300" />
                </button>
              </div>

              {/* New Chat Button */}
              <button
                onClick={handleNewChat}
                className="flex items-center gap-2 justify-center bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-3 m-4 rounded-xl transition w-[calc(100%-2rem)]"
              >
                <PlusIcon className="w-5 h-5" /> New Chat
              </button>

              {/* Chat List */}
              <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
                {chats.length === 0 ? (
                  <div className="text-gray-500 text-center mt-8 text-sm">No Chat History</div>
                ) : (
                  chats.map((chat) => (
                    <div
                      key={chat.id}
                      className="flex items-center justify-between bg-gray-800 hover:bg-gray-700 rounded-xl transition"
                    >
                      <button
                        onClick={() => handleSelectChat(chat)}
                        className="text-left text-white px-4 py-2 rounded-l-xl flex-1 overflow-hidden whitespace-nowrap text-ellipsis"
                      >
                        {chat.name}
                      </button>
                      <button
                        onClick={() => handleDeleteChat(chat.id)}
                        className="px-3 py-2 text-red-400 hover:text-red-600 rounded-r-xl"
                        title="Delete Chat"
                      >
                        X
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-700 flex flex-col gap-3">
              <div className="flex items-center gap-2 px-4 cursor-pointer">
                <UserIcon className="h-8 w-8 bg-blue-900 p-1 rounded-full" />
                <span className="text-gray-300 ">{User ? User.firstName : "My Profile"}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
              >
                <ArrowRightStartOnRectangleIcon className="w-6 h-6" />
                Logout
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Sidebar;
