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
    const { props } = this;
    props.logout();
  };

  render() {
    const { isLoggedIn, info } = this.props;
    return (
      <UserPanel
        isLoggedIn={isLoggedIn}
        name={info ? info.name : ''}
        onLogoutClick={this.onLogoutClick}
      />
    );
  }
}

UserPanelContainer.propTypes = {
  info: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
  isLoggedIn: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
};

UserPanelContainer.defaultProps = {
  info: null,
};

const mapStateToProps = ({ user }) => ({
  info: user.info,
  isLoggedIn: user.isLoggedIn,
});

export default connect(mapStateToProps, { logout })(UserPanelContainer);
