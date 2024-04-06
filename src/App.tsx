import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/views/Login";
import { LoginGuard } from "./components/routing/routeProtectors/LoginGuard";
import { AuthGuard } from "./components/routing/routeProtectors/AuthGuard";
import SignUp from "./components/views/SignUp";
import Home from "./components/views/Home";
import CreatePlant from "./components/views/CreatePlant";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* The login/signup view is only accessible by guests, e.g. unauthenticated users */}
        <Route path="/login" element={<AuthGuard/>}>
          <Route path="/login" element={<Login/>} />
        </Route>

        <Route path="/signUp" element={<AuthGuard/>}>
          <Route path="/signUp" element={<SignUp/>} />
        </Route>

        {/* All other views are only accessible by authenticated users */}
        <Route path="/" element={<LoginGuard/>}>
          <Route path="/" element={<Home/>} />
        </Route>

        <Route path="/plantCreation" element={<LoginGuard/>}>
          <Route path="/plantCreation" element={<CreatePlant/>} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
