import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import { useAuth } from "./context/AuthProvider";

function App() {
  const [authUser] = useAuth();
  console.log(authUser);
  return (
    <>
      <div>
        <Routes>
          <Route
            path="/"
            element={authUser ? <Home /> : <Navigate to={"/login"} />}
          />
         <Route
  path="/login"
  element={!authUser || authUser === "undefined" ? <Login /> : <Navigate to="/" />}
/>

          <Route
            path="/signup"
            element={authUser ? <Navigate to={"/"} /> : <Signup />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;