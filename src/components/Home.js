import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import UserPanelContainer from './UserPanelContainer';
import CategoryList from './CategoryList';
import { getCurrentUser } from '../actions/user';
import { fetchCategories } from '../actions/category';
import { storeCurrentUser } from '../libs/utils/auth';

export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    const { props } = this;
    if (props.accessToken) {
      props.getCurrentUser(props.accessToken).then((response) => {
        if (response.success) {
          storeCurrentUser(response.result.data);
        }
      });
    }
    // TODO: Pagination
    props.fetchCategories({ offset: 0, limit: 100 }).then((response) => {
      if (response.success) {
        this.setState({ categories: response.result.data.categories });
      }
    });
  }

  render() {
    const { categories } = this.state;
    return (
      <div>
        <UserPanelContainer />
        <h1>Home page</h1>
        <CategoryList categories={categories} />
      </div>
    );
  }
}

Home.propTypes = {
  accessToken: PropTypes.string,
  getCurrentUser: PropTypes.func.isRequired,
  fetchCategories: PropTypes.func.isRequired,
};

Home.defaultProps = {
  accessToken: null,
};

const mapStateToProps = ({ user }) => ({
  accessToken: user.accessToken,
});
export default connect(mapStateToProps, { getCurrentUser, fetchCategories })(
  Home,
);
