import React, { useState, useEffect, useRef } from "react";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/solid";
import {
  RocketLaunchIcon,
  GlobeAltIcon,
  PaperClipIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import logo from "../assets/Logo.svg";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow as codeTheme } from "react-syntax-highlighter/dist/esm/styles/prism";

const Prompts = () => {
  const User = JSON.parse(localStorage.getItem("user"));

  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");
  const [prompt, setPrompt] = useState([]);
  const [loading, setLoading] = useState(false);
  const promptEndRef = useRef();

  // Auto-scroll
  useEffect(() => {
    promptEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [prompt, loading]);

  const Send = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    setMessage(trimmed);
    setInput("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/vl/gemini/prompt`, {
    content: trimmed,
}, {
    headers: {
        Authorization: `Bearer ${token}`
    },
          withCredentials: true,
        }
      );

      setPrompt((prev) => [
        ...prev,
        { role: "user", content: trimmed },
        { role: "assistant", content: res.data.reply },
      ]);
    } catch (error) {
      console.error("Prompt error:", error.response?.data || error.message);

      setPrompt((prev) => [
        ...prev,
        { role: "user", content: trimmed },
        { role: "assistant", content: " Something went wrong." },
      ]);
    } finally {
      setLoading(false);
      setMessage(null);
    }
  };

  const EnterKey = (e) => {
    if (e.key === "Enter") {
      Send();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full overflow-y-auto mx-auto flex-1 w-full px-4 pb-4">
      {/*  Hello Section */}
      {prompt.length === 0 && (
        <div className="text-center flex flex-col items-center justify-center h-full w-full">
          <div className="flex items-center justify-center gap-2">
            <img src={logo} alt="Logo_Image" className="h-8" />
            <h1 className="text-3xl text-blue-100 font-semibold mb-2">
              Hello{" "}
              <span className="bg-gradient-to-r from-red-400 to-blue-500 text-transparent bg-clip-text">
                {User ? User.firstName : "User"}
              </span>
            </h1>
          </div>
          <div className="text-gray-400 text-base mt-2 flex justify-center items-center">
            <ChatBubbleOvalLeftEllipsisIcon className="w-6 h-6 text-white mr-1" />
            How can I help you?
          </div>
        </div>
      )}


      {/*  Chat Section */}
      <div className="w-full max-w-5xl  overflow-y-auto mt-24 mb-4 space-y-4 max-h-[62vh] px-1 ">
        {prompt.map((msg, index) => (
          <div
            key={index}
            className={`w-full flex ${msg.role === "user" ? "justify-end" : "justify-start"
              }`}
          >
            <div
              className={`px-4 py-3 rounded-xl text-md whitespace-pre-wrap max-w-[70%] ${msg.role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-[#2f2f2f] text-gray-200 w-full"
                }`}
            >
              {msg.role === "assistant" ? (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    code({ inline, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || "");
                      return !inline && match ? (
                        <SyntaxHighlighter
                          style={codeTheme}
                          language={match[1]}
                          PreTag="div"
                          className="rounded-lg mt-2"
                          {...props}
                        >
                          {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                      ) : (
                        <code
                          className="bg-gray-800 px-1 py-0.5 rounded"
                          {...props}
                        >
                          {children}
                        </code>
                      );
                    },
                  }}
                >
                  {msg.content}
                </ReactMarkdown>
              ) : (
                msg.content
              )}
            </div>
          </div>
        ))}

        {/* User bubble while waiting */}
        {loading && message && (
          <div className="w-full flex justify-end">
            <div className="px-4 py-3 rounded-xl text-sm bg-blue-600 text-white max-w-[70%]">
              {message}
            </div>
          </div>
        )}

        {/* Typing indicator */}
        {loading && (
          <div className="w-full flex justify-start">
            <div className="px-4 py-3 rounded-xl text-sm bg-[#2f2f2f] text-gray-200 animate-pulse">
              Thinking...
            </div>
          </div>
        )}

        <div ref={promptEndRef} />
      </div>

      {/* 📝 Input Box */}
      <div className="w-full max-w-5xl relative mx-auto mt-auto">
        <div className="bg-[#2f2f2f] rounded-[2rem] px-6 py-8 shadow-md">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={EnterKey}
            placeholder="Enter your message"
            className="bg-transparent w-full text-white placeholder-gray-400 text-lg outline-none"
          />

          <div className="flex items-center justify-between mt-4 gap-4">
            <div className="flex gap-2">
              <button className="flex items-center border border-gray-500 gap-2 text-white text-base px-3 py-2 rounded-full hover:bg-gray-600 transition">
                <RocketLaunchIcon className="w-5 h-5" /> Deep Search
              </button>
              <button className="flex items-center border border-gray-500 gap-2 text-white text-base px-3 py-2 rounded-full hover:bg-gray-600 transition">
                <GlobeAltIcon className="w-5 h-5" /> Search
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button className="text-gray-400 hover:text-white transition">
                <PaperClipIcon className="w-6 h-6" />
              </button>
              <button
                onClick={Send}
                className="bg-gray-500 hover:bg-blue-900 p-2 rounded-full text-white transition"
              >
                <ArrowUpIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prompts;
