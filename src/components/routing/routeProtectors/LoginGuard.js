import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

const LoginGuard = ({ loggedInUser, guestOnly, children }) => {
  if (guestOnly && loggedInUser) {
    return <Navigate to="/" />;
  } else if (!guestOnly && !loggedInUser) {
    return <Navigate to="/login" />;
  }

  return children;
};

LoginGuard.propTypes = {
  loggedInUser: PropTypes.object,
  guestOnly: PropTypes.bool,
  children: PropTypes.node,
};

const mapStateToProps = (state) => ({
  loggedInUser: state.users.loggedInUser,
});

export default connect(mapStateToProps)(LoginGuard);