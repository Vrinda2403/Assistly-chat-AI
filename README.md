# 🤖 Assistly Chat AI

Assistly Chat AI is a full-stack conversational assistant inspired by Gemini, designed to deliver intelligent, responsive interactions through a sleek and animated frontend. Built with React, Tailwind CSS, and Node.js, it bridges the gap between user experience and backend logic—making it ideal for showcasing both frontend finesse and backend integration.
The project is structured for clarity and scalability, with separate folders for backend controllers, middleware, and models, and a modular frontend powered by Vite. It’s optimized for deployment on platforms like Vercel and includes environment-based configuration for secure and flexible setup.
This project showcases a **full-stack implementation** of a chat assistant, integrating frontend, backend routing, and environment-based deployment.

---

## 📁 Project Structure
```
Assistly-chat-AI/
├── backend/
│ ├── controllers/ # Handles logic for API routes
│ ├── middleware/ # Authentication and error handling
│ ├── models/ # MongoDB schemas and database models
│ ├── routes/ # Express route definitions
│ ├── src/
│ │ ├── index.js # Entry point of the backend server
│ │ ├── package.json
│ │ └── package-lock.json
│ └── node_modules/
│
├── frontend/
│ ├── src/ # React components and pages
│ ├── node_modules/
│ ├── index.html # Main HTML file for the React app
│ ├── package.json
│ ├── package-lock.json
│ ├── tailwind.config.js # Tailwind CSS configuration
│ ├── eslint.config.js # Linting setup for code quality
│ ├── vercel.json # Deployment configuration for Vercel
│ └── README.md
│
```


---

## 🚀 Features

- 🌈 **Gemini-style animated chat interface**
- 🔐 **Secure environment setup** using `.env.example`
- ⚙️ **Modular backend** with Express and clean folder structure
- 🎨 **Responsive and modern UI** using React + Tailwind CSS
- 🧩 **Scalable architecture** for future AI integrations
- 📦 **Optimized for deployment** on Vercel or similar platforms

---

## 🛠️ Tech Stack

| Frontend        | Backend           |
|-----------------|-------------------|
| React + Vite    | Node.js + Express |
| Tailwind CSS    | dotenv + CORS     |

---

## 🧰 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Vrinda2403/Assistly-chat-AI.git
cd Assistly-chat-AI
```

### 2. Install Dependencies

```
# Backend
cd backend/src
npm install

# Frontend
cd ../../frontend
npm install
```

3. Configure Environment Variables
Create a .env file inside the backend/ directory
```
cd backend/.env.example backend/.env
```

### 4. Run Locally

```
# Start the backend
cd backend/src
npm start

# Start the frontend
cd ../../frontend
npm run dev
```
.

## 🙌 Contributions

Contributions, suggestions, and improvements are always welcome!
If you’d like to contribute:

- Fork the repo
- Create your feature branch (git checkout -b feature-name)
- Commit changes (git commit -m "Add new feature")
- Push to branch (git push origin feature-name)
- Open a pull request 🎉
```
│ ├── eslint.config.js # Linting setup for code quality
│ ├── vercel.json # Deployment configuration for Vercel
│ └── README.md
```
