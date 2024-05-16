import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/views/Login";
import { LoginGuard } from "./components/routing/routeProtectors/LoginGuard";
import { AuthGuard } from "./components/routing/routeProtectors/AuthGuard";
import SignUp from "./components/views/SignUp";
import Home from "./components/views/Home";
import CreatePlant from "./components/views/CreatePlant";
import EditPlant from "./components/views/EditPlant";
import EditSchedule from "./components/views/EditSchedule";
import PlantView from "./components/views/PlantView";
import MyPlants from "./components/views/MyPlants";
import UserProfile from "./components/views/UserProfile";
import EditUser from "./components/views/EditUser";
import EditPassword from "./components/views/EditPassword";
import SpacePage from "./components/views/SpacePage";


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

        <Route path="/profile" element={<LoginGuard/>}>
          <Route path="/profile" element={<UserProfile/>} />
        </Route>

        <Route path="/myPlants" element={<LoginGuard/>}>
          <Route path="/myPlants" element={<MyPlants/>} />
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

        <Route path="/plant/:plantId" element={<LoginGuard/>}>
          <Route path="/plant/:plantId" element={<PlantView/>} />
        </Route>

        <Route path="/editUser" element={<LoginGuard/>}>
          <Route path="/editUser" element={<EditUser/>} />
        </Route>

        <Route path="/editPassword" element={<LoginGuard/>}>
          <Route path="/editPassword" element={<EditPassword/>} />
        </Route>

        <Route path="/spaces/:spaceId" element={<LoginGuard/>}>
          <Route path="/spaces/:spaceId" element={<SpacePage/>} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
