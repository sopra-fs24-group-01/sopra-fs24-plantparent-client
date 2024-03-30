import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/views/Login";
import LoginGuard from "./components/routing/routeProtectors/LoginGuard";
import SignUp from "./components/views/SignUp";
import Home from "./components/views/Home";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/*<Route path="/login" element={<LoginGuard />}>*/}
          <Route path="/login" element={<Login />} />
        {/*</Route>*/}

        {/* TODO: Add login guard */}
        <Route path="/" element={<Home/>}/>
        <Route path="/signUp" element={<SignUp/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
