import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import UserPanelContainer from "./UserPanelContainer";
import { getCurrentUser } from "../actions/user";
import { storeCurrentUser } from "../libs/utils/auth";

class Home extends React.Component {
  componentDidMount() {
    if (this.props.accessToken) {
      this.props.getCurrentUser(this.props.accessToken).then((response) => {
        if (response.success) {
          storeCurrentUser(response.result.data);
        }
      });
    }
  }
  render() {
    return (
      <div>
        <UserPanelContainer />
        <span>Home page</span>
      </div>
    );
  }
}

Home.propTypes = {
  accessToken: PropTypes.string,
  getCurrentUser: PropTypes.func.isRequired,
};

const mapStateToProps = ({ user }) => ({
  accessToken: user.accessToken,
});
export default connect(mapStateToProps, { getCurrentUser })(Home);
