import React from "react";
import PropTypes from "prop-types";

const AddItemForm = ({ message, onChange, onSubmit }) => {
  return (
    <div>
      <span>{message}</span>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="name">Username</label>
          <input id="name" type="text" onChange={onChange} />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input id="description" type="text" onChange={onChange} />
        </div>
        <div>
          <label htmlFor="price">Price ($)</label>
          <input id="price" type="text" onChange={onChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

AddItemForm.propTypes = {
  message: PropTypes.string,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
};

export default AddItemForm;