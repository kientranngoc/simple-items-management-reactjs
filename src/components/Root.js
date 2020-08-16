import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import Home from './Home';
import Signup from './Signup';
import Signin from './Signin';
import CategoryDetail from './CategoryDetail';

export const Root = ({ isLoggedIn }) => (
  <Router>
    <Switch>
      <Route exact path="/signup">
        {isLoggedIn ? <Redirect to="/" /> : <Signup />}
      </Route>
      <Route exact path="/signin">
        {isLoggedIn ? <Redirect to="/" /> : <Signin />}
      </Route>
      <Route exact path="/categories/:id" component={CategoryDetail} />
      <Route exact path="/" component={Home} />
      <Route render={() => <Redirect to="/" />} />
    </Switch>
  </Router>
);

Root.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ user }) => ({
  isLoggedIn: user.isLoggedIn,
});

export default connect(mapStateToProps)(Root);
