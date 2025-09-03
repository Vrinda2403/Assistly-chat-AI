import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Prompts from "./Prompts";

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentChat, setCurrentChat] = useState(null);
  const [chats, setChats] = useState(
    JSON.parse(localStorage.getItem("chats")) || []
  );

  // Update localStorage when chats change
  useEffect(() => {
    localStorage.setItem("chats", JSON.stringify(chats));
  }, [chats]);

  return (
    <div className="flex flex-col sm:flex-row min-h-screen bg-[#1e1e1e] text-white">
      {/* Sidebar */}
      <div
        className={`sm:w-64 w-full sm:transition-all duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"
        }`}
      >
        <Sidebar
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
          currentChat={currentChat}
          setCurrentChat={setCurrentChat}
          chats={chats}
          setChats={setChats}
        />
      </div>

      {/* Main Page */}
      <div className="flex flex-col w-full flex-1">
        <Prompts currentChat={currentChat} setCurrentChat={setCurrentChat} />
      </div>
    </div>
  );
};

export default Home;
