import React from 'react';
import PropTypes from 'prop-types';

const SignupForm = ({ message, onChange, onSubmit }) => (
  <div>
    <span>{message}</span>
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="name">
          Name
          <input id="name" type="text" onChange={onChange} />
        </label>
      </div>
      <div>
        <label htmlFor="email">
          Email
          <input id="email" type="email" onChange={onChange} />
        </label>
      </div>
      <div>
        <label htmlFor="username">
          Username
          <input id="username" type="text" onChange={onChange} />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          Password
          <input id="password" type="password" onChange={onChange} />
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>
);

SignupForm.propTypes = {
  message: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

SignupForm.defaultProps = {
  message: '',
};

export default SignupForm;
