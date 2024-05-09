import React from "react";
import PropTypes from "prop-types";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../../hooks";
import { getLoggedInDate, logOutUser, selectLoggedInUser } from "../../../store/appSlice";

export const LoginGuard = () => {
  const loggedInUser = useAppSelector(selectLoggedInUser);
  if (loggedInUser) {
    const date = new Date();
    const loggedInDate = useAppSelector(getLoggedInDate);    // log out if more than 7 days have passed since the user logged in
    if (loggedInDate && (date.getTime() - loggedInDate.getTime() > (1000 * 60 * 60 * 24 * 7))) {
      useAppSelector(logOutUser);
      
      return <Navigate to="/login" replace />;
    }
    
    return <Outlet />;
  }
  
  return <Navigate to="/login" replace />;
};

LoginGuard.propTypes = {
  children: PropTypes.node,
};