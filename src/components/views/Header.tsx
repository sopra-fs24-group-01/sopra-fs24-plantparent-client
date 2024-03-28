import React from "react";
import PropTypes from "prop-types";

const Header = props => (
  <div className="header container" style={{height: props.height}}>
    <h1 className="header title">PlantParent</h1>
  </div>
);

Header.propTypes = {
  height: PropTypes.string,
};

/**
 * Don't forget to export your component!
 */
export default Header;
