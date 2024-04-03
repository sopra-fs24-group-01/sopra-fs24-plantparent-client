import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

const LoginGuard = ({ loggedInUser, guestOnly, children }) => {
  if (guestOnly && loggedInUser) {
    return <Navigate to="/" />;
  } else if (!guestOnly && !loggedInUser) {
    return <Navigate to="/login" />;
  }

  return children;
};

const mapStateToProps = (state) => ({
  loggedInUser: state.users.loggedInUser,
});

export default connect(mapStateToProps)(LoginGuard);