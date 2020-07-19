import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const UserPanel = ({ isLoggedIn, name, onLogoutClick }) => {
  return (
    <div>
      {isLoggedIn ? (
        <div>
          <span>Name: {name}</span>
          <button onClick={onLogoutClick}>Logout</button>
        </div>
      ) : (
        <div>
          <Link to="/signup">Signup</Link>
          <br />
          <Link to="/signin">Signin</Link>
        </div>
      )}
    </div>
  );
};

UserPanel.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  onLogoutClick: PropTypes.func.isRequired,
};

export default UserPanel;
