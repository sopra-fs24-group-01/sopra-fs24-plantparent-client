import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/views/Login";
import LoginGuard from "./components/routing/routeProtectors/LoginGuard";
import SignUp from "./components/views/SignUp";
import Home from "./components/views/Home";
import CreatePlant from "./components/views/CreatePlant";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* The login view is only accessible by guests, e.g. unauthenticated users */}
        <LoginGuard guestOnly={true}>
          <Route path="/login" element={<Login/>}/>
        </LoginGuard>

        {/* All other views are only accessible by authenticated users */}
        <LoginGuard guestOnly={false}>
          <Route path="/" element={<Home/>}/>
        </LoginGuard>

        <LoginGuard guestOnly={false}>
          <Route path="/signUp" element={<SignUp/>}/>
        </LoginGuard>

        <LoginGuard guestOnly={false}>
          <Route path="/plantCreation" element={<CreatePlant/>}/>
        </LoginGuard>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
