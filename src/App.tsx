import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/views/Login";
import { LoginGuard } from "./components/routing/routeProtectors/LoginGuard";
import { AuthGuard } from "./components/routing/routeProtectors/AuthGuard";
import SignUp from "./components/views/SignUp";
import Home from "./components/views/Home";
import CreatePlant from "./components/views/CreatePlant";
import EditPlant from "components/views/EditPlant";
import EditSchedule from "components/views/EditSchedule";
import { useAppSelector } from "./hooks";
import { getLoggedInDate, logOutUser } from "./store/appSlice";


function App() {
  const date = new Date();
  const loggedInDate = useAppSelector(getLoggedInDate);
  // log out if more than 7 days have passed since the user logged in
  if (loggedInDate && (date.getTime() - loggedInDate.getTime() > (1000 * 60 * 60 * 24 * 7))) {
    useAppSelector(logOutUser);
  }
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

        <Route path="/createPlant" element={<LoginGuard/>}>
          <Route path="/createPlant" element={<CreatePlant/>} />
        </Route>

        <Route path="/editPlant/:plantId" element={<LoginGuard/>}>
          <Route path="/editPlant/:plantId" element={<EditPlant/>} />
        </Route>

        <Route path="/editSchedule/:plantId" element={<LoginGuard/>}>
          <Route path="/editSchedule/:plantId" element={<EditSchedule/>} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
