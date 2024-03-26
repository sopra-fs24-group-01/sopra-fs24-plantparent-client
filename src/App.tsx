import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/views/Login";
import LoginGuard from "./components/routing/routeProtectors/LoginGuard";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/*<Route path="/login" element={<LoginGuard />}>*/}
        {/*  <Route path="/login" element={<Login />} />*/}
        {/*</Route>*/}

        <Route path="/" element={<Login/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
