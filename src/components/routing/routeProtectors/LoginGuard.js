import React from "react";
import PropTypes from "prop-types";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../../hooks";
import { store } from "../../../store";
import { getLoggedInDate, logOutUser, selectLoggedInUser } from "../../../store/appSlice";

export const LoginGuard = () => {
  const loggedInUser = useAppSelector(selectLoggedInUser);
  const date = new Date();
  const loggedInDate = useAppSelector(getLoggedInDate);
  if (loggedInUser) {
    // log out if more than 7 days have passed since the user logged in
    if (loggedInDate && (date.getTime() - loggedInDate.getTime() > (1000 * 60 * 60 * 24 * 7))) {
      useAppSelector(logOutUser);
      return <Navigate to="/login" replace />;
    }
    return <Outlet />;
  }
};

LoginGuard.propTypes = {
  children: PropTypes.node,
};