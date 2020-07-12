import React from "react";
import PropTypes from "prop-types";

const SignupForm = ({ message, onChange, onSubmit }) => {
  return (
    <div>
      <span>{message}</span>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input id="name" type="text" onChange={onChange} />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" onChange={onChange} />
        </div>
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
};

SignupForm.propTypes = {
  message: PropTypes.string,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
};

export default SignupForm;
