import React from "react";
import SignupForm from "./SignupForm";

class SignupFormContainer extends React.Component {
  onSubmit = (event) => {
    event.preventDefault();
    console.log(event);
  };
  onChange = (event) => {
    console.log(event);
  };
  render() {
    return <SignupForm onChange={this.onChange} onSubmit={this.onSubmit} />;
  }
}

export default SignupFormContainer;
