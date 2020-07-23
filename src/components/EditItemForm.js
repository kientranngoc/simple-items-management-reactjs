import React from 'react';
import PropTypes from 'prop-types';

const EditItemForm = ({
  message,
  onChange,
  onSubmit,
  name,
  description,
  price,
}) => (
  <div>
    <h2>Edit an item</h2>
    <span>{message}</span>
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="name">
          Name
          <input
            id="name"
            type="text"
            defaultValue={name || ''}
            onChange={onChange}
          />
        </label>
      </div>
      <div>
        <label htmlFor="description">
          Description
          <input
            id="description"
            type="text"
            defaultValue={description || ''}
            onChange={onChange}
          />
        </label>
      </div>
      <div>
        <label htmlFor="price">
          Price ($)
          <input
            id="price"
            type="text"
            defaultValue={price || ''}
            onChange={onChange}
          />
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>
);

EditItemForm.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.number,
  message: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

EditItemForm.defaultProps = {
  name: '',
  description: '',
  price: 0,
  message: '',
};

export default EditItemForm;
