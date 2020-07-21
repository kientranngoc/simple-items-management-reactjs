import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import UserPanel from './UserPanel';
import { logout } from '../actions/user';
import { removeAuth } from '../libs/utils/auth';

class UserPanelContainer extends React.Component {
  // Class Properties , required for binding bind a function to a component instance
  onLogoutClick = (event) => {
    event.preventDefault();
    removeAuth();
    this.props.logout();
  };

  render() {
    return (
      <UserPanel
        isLoggedIn={this.props.isLoggedIn}
        name={this.props.info ? this.props.info.name : ''}
        onLogoutClick={this.onLogoutClick}
      />
    );
  }
}

UserPanelContainer.propTypes = {
  info: PropTypes.object,
  isLoggedIn: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = ({ user }) => ({
  info: user.info,
  isLoggedIn: user.isLoggedIn,
});

export default connect(mapStateToProps, { logout })(UserPanelContainer);
