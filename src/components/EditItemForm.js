import React from "react";
import PropTypes from "prop-types";

const EditItemForm = ({
  message,
  onChange,
  onSubmit,
  name,
  description,
  price,
}) => {
  return (
    <div>
      <h2>Edit an item</h2>
      <span>{message}</span>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            defaultValue={name ? name : ""}
            onChange={onChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input
            id="description"
            type="text"
            defaultValue={description ? description : ""}
            onChange={onChange}
          />
        </div>
        <div>
          <label htmlFor="price">Price ($)</label>
          <input
            id="price"
            type="text"
            defaultValue={price ? price : ""}
            onChange={onChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

EditItemForm.propTypes = {
  message: PropTypes.string,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
};

export default EditItemForm;
