import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const UserPanel = ({ isLoggedIn, name, onLogoutClick }) => (
  <div>
    {isLoggedIn ? (
      <div>
        <span>
          Name:
          {name}
        </span>
        <button type="button" onClick={onLogoutClick}>
          Logout
        </button>
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

UserPanel.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  name: PropTypes.string,
  onLogoutClick: PropTypes.func.isRequired,
};

UserPanel.defaultProps = {
  name: '',
};

export default UserPanel;
