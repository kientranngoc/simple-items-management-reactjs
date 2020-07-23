import React from 'react';
import PropTypes from 'prop-types';

const AddItemForm = ({ message, onChange, onSubmit }) => (
  <div>
    <h2>Add new item</h2>
    <span>{message}</span>
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="name">
          Name
          <input id="name" type="text" onChange={onChange} />
        </label>
      </div>
      <div>
        <label htmlFor="description">
          Description
          <input id="description" type="text" onChange={onChange} />
        </label>
      </div>
      <div>
        <label htmlFor="price">
          Price ($)
          <input id="price" type="text" onChange={onChange} />
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>
);

AddItemForm.propTypes = {
  message: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

AddItemForm.defaultProps = {
  message: '',
};

export default AddItemForm;
