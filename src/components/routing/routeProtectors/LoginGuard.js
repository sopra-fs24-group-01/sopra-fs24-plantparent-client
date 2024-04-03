import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

const LoginGuard = ({ loggedInUser, children }) => {
  if (!loggedInUser) {
    return <Navigate to="/login" />;
  }

  return children;
};

const mapStateToProps = (state) => ({
  loggedInUser: state.users.loggedInUser,
});

export default connect(mapStateToProps)(LoginGuard);