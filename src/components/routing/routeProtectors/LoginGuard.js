import React from "react";
import PropTypes from "prop-types";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../../hooks";
import { selectLoggedInUser } from "../../../store/userSlice";
import { store } from "../../../store";
import { fetchPlantOfUser } from "../../../store/plantSlice";

export const LoginGuard = () => {
  const loggedInUser = useAppSelector(selectLoggedInUser);
  if (loggedInUser) {
    store.dispatch(fetchPlantOfUser(loggedInUser.id));
    return <Outlet />;
  }

  return <Navigate to="/login" replace />;
};

LoginGuard.propTypes = {
  children: PropTypes.node,
};