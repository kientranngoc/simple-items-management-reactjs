import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import SignupForm from "./SignupForm";
import { signup } from "../actions/user";

class SignupFormContainer extends React.Component {
  state = {
    message: "",
  };
  resetMessage() {
    this.setState({ message: "" });
  }
  // Class Properties , required for binding bind a function to a component instance
  onSubmit = (event) => {
    event.preventDefault();
    this.resetMessage();
    this.props.signup().then((data) => {
      console.log(data);
    });
  };
  onChange = () => {
    this.resetMessage();
  };
  render() {
    return (
      <SignupForm
        message={this.state.message}
        onChange={this.onChange}
        onSubmit={this.onSubmit}
      />
    );
  }
}

SignupFormContainer.propTypes = {
  signup: PropTypes.func.isRequired,
};

export default connect(null, { signup })(SignupFormContainer);
