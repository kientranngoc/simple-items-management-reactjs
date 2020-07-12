import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { PropTypes } from "prop-types";
import Home from "./Home";
import Signup from "./Signin";
import Signin from "./Signin";
import CategoryDetail from "./CategoryDetail";

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Route path="/" component={Home} />
      <Route path="/signup" component={Signup} />
      <Route path="/signin" component={Signin} />
      <Route path="/category/:id" component={CategoryDetail} />
    </Router>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;
