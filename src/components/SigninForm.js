import React from 'react';
import PropTypes from 'prop-types';

const SigninForm = ({ message, onChange, onSubmit }) => (
  <div>
    <span>{message}</span>
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input id="username" type="text" onChange={onChange} />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" type="password" onChange={onChange} />
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>
);

SigninForm.propTypes = {
  message: PropTypes.string,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
};

export default SigninForm;
