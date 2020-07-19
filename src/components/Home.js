import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import UserPanelContainer from "./UserPanelContainer";
import CategoryList from "./CategoryList";
import { getCurrentUser } from "../actions/user";
import { fetchCategories } from "../actions/category";
import { storeCurrentUser } from "../libs/utils/auth";

class Home extends React.Component {
  state = {
    categories: [],
  };
  componentDidMount() {
    if (this.props.accessToken) {
      this.props.getCurrentUser(this.props.accessToken).then((response) => {
        if (response.success) {
          storeCurrentUser(response.result.data);
        }
      });
    }
    // TODO: Pagination
    this.props.fetchCategories({ offset: 0, limit: 100 }).then((response) => {
      this.setState({ categories: response.result.data.categories });
    });
  }
  render() {
    return (
      <div>
        <UserPanelContainer />
        <h1>Home page</h1>
        <CategoryList categories={this.state.categories} />
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
export default connect(mapStateToProps, { getCurrentUser, fetchCategories })(
  Home
);
