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

        {/*<Route path="/login" element={<LoginGuard />}>*/}
          <Route path="/login" element={<Login />} />
        {/*</Route>*/}

        {/* TODO: Add login guard */}
        <Route path="/" element={<Home/>}/>
        <Route path="/signUp" element={<SignUp/>}/>
        <Route path="/plantCreation" element={<CreatePlant/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
