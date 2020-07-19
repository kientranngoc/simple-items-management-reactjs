import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import SigninForm from "./SigninForm";
import { signin } from "../actions/user";
import { setToken } from "../libs/utils/auth";

class SigninFormContainer extends React.Component {
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
      .signin({
        username: event.target.username.value,
        password: event.target.password.value,
      })
      .then((response) => {
        if (response.success) {
          // Store data to localStorage
          const token = response.result.data.access_token;
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
      <SigninForm
        message={this.state.message}
        onChange={this.onChange}
        onSubmit={this.onSubmit}
      />
    );
  }
}

SigninFormContainer.propTypes = {
  signin: PropTypes.func.isRequired,
};

export default connect(null, { signin })(SigninFormContainer);
