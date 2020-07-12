import React from "react";
import SignupForm from "./SignupForm";

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

export default SignupFormContainer;
