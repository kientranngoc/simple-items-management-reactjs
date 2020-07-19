import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import SignupForm from "./SignupForm";
import { signup } from "../actions/user";
import { setToken } from "../libs/utils/auth";

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
    this.props
      .signup({
        name: event.target.name.value,
        email: event.target.email.value,
        username: event.target.username.value,
        password: event.target.password.value,
      })
      .then((response) => {
        if (response.success) {
          console.log(response);
          // Store data to localStorage
          const token = response.result.data.access_token;
          console.log(token);
          setToken(token);
        } else {
          const error = response.error;
          if (
            error &&
            error.response &&
            error.response.data &&
            error.response.data.message
          ) {
            const messages = Object.values(error.response.data.message).map(
              (value) => value[0]
            );
            this.setState({ message: messages.join(" ") });
          } else {
            this.setState({ message: "Something went wrong" });
          }
        }
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
