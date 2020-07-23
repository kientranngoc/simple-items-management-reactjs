import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import SignupForm from './SignupForm';
import { signup } from '../actions/user';
import { setToken } from '../libs/utils/auth';

class SignupFormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };
  }

  // Class Properties , required for binding bind a function to a component instance
  onSubmit = (event) => {
    event.preventDefault();
    this.resetMessage();
    const { props } = this;
    props
      .signup({
        name: event.target.name.value,
        email: event.target.email.value,
        username: event.target.username.value,
        password: event.target.password.value,
      })
      .then((response) => {
        if (response.success) {
          // Store data to localStorage
          const token = response.result.data.access_token;
          setToken(token);
        } else {
          const { error } = response;
          if (
            error
            && error.response
            && error.response.data
            && error.response.data.message
          ) {
            const messages = Object.values(error.response.data.message).map(
              (value) => value[0],
            );
            this.setState({ message: messages.join(' ') });
          } else {
            this.setState({ message: 'Something went wrong' });
          }
        }
      });
  };

  onChange = () => {
    this.resetMessage();
  };

  resetMessage() {
    this.setState({ message: '' });
  }

  render() {
    const { message } = this.state;
    return (
      <SignupForm
        message={message}
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
