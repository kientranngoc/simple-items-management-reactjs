import React from "react";
import PropTypes from "prop-types";

const Category = ({ name, description, created, updated }) => {
  return (
    <div>
      <h2>{name}</h2>
      <span>{description}</span>
      <br />
      <span>{created}</span>
      <br />
      <span>{updated}</span>
    </div>
  );
};

Category.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  created: PropTypes.string.isRequired,
  updated: PropTypes.string.isRequired,
};

export default Category;
