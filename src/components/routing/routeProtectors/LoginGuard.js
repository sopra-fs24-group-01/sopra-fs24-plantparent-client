import React from "react";
import PropTypes from "prop-types";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../../hooks";
import { selectLoggedInUser } from "../../../store/userSlice";

export const LoginGuard = () => {
  const loggedInUser = useAppSelector(selectLoggedInUser);
  if (loggedInUser) {
    return <Outlet />;
  }

  return <Navigate to="/login" replace />;
};

LoginGuard.propTypes = {
  children: PropTypes.node,
};