import React from "react";
import PropTypes from "prop-types";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../../hooks";
import { selectLoggedInUser } from "../../../store/userSlice";

export const AuthGuard = () => {
  const loggedInUser = useAppSelector(selectLoggedInUser);
  if (loggedInUser) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

AuthGuard.propTypes = {
  children: PropTypes.node,
};
