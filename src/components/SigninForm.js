import React from 'react';
import PropTypes from 'prop-types';

const SigninForm = ({ message, onChange, onSubmit }) => (
  <div>
    <span>{message}</span>
    <form onSubmit={onSubmit}>
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

SigninForm.propTypes = {
  message: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

SigninForm.defaultProps = {
  message: '',
};

export default SigninForm;
