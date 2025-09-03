# 🧠 Assistly Chat App

**Assistly** is a minimal, intelligent chat assistant built with React and Node.js. It features secure authentication, persistent multi-chat support, and dynamic AI responses powered by the Gemini API. Inspired by DeepSeek’s clean design language, Assistly delivers a focused, responsive user experience for real-world productivity.

---

## 🚀 Features

- 🔮 **Gemini API Integration**  
  Fetches intelligent, context-aware responses from Google's Gemini API.

- 🔐 **JWT Authentication & Role-Based Authorization**  
  Secure login/logout flow with protected routes and role-specific access.

- 🍪 **Cookie Management with `js-cookie`**  
  Stores JWT tokens and user preferences securely for persistent sessions.

- 🧵 **Multi-Chat Support**  
  Create, switch, and delete conversation threads with localStorage sync.

- 🎨 **Minimal UI Inspired by DeepSeek**  
  Clean sidebar navigation, responsive layout, and distraction-free chat interface.

---

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/Vrinda2403/Assistly-chat-AI.git
cd Assistly-chat-AI
```
---
### 2. Install backend dependencies
```
cd server
npm install

```
---
### 3. Install frontend dependencies
```
bash
cd ../client
npm install

```
---
### 4. Set up environment variables
Create a .env file in the root directory:
```
env
GEMINI_API_KEY=your_gemini_api_key
JWT_SECRET=your_jwt_secret
MONGO_URI=your_mongodb_connection_string
```
---
### 5. Run the app
```
bash
npm run dev

```
---
### 📁 Folder Structure
```
Assistly-chat-AI/
├── client/              # React frontend
│   ├── components/      # Sidebar, Prompts, Chat UI
│   ├── utils/           # Cookie helpers, API handlers
│   └── App.jsx
├── server/              # Express backend
│   ├── routes/          # Auth, chat, Gemini proxy
│   ├── middleware/      # JWT auth, role checks
│   └── server.js
├── .env
└── README.md

```
---
### 💬 Chatbot Experience
Assistly delivers a seamless AI-powered conversation flow:

Context-aware responses via Gemini API

Persistent chat threads with localStorage

Secure sessions using JWT and cookies

Responsive layout with custom loaders and markdown rendering

Built for rapid iteration and modular expansion

---
### 🧪 Future Enhancements
🔄 Streaming Gemini responses

🧑‍💼 Admin dashboard for chat analytics

🧩 Plugin-style prompt templates

📊 Chat usage metrics
git clone https://github.com/Vrinda2403/Assistly-chat-AI.git
cd Assistly-chat-AI
