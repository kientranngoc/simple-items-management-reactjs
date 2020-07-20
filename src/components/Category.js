import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Category = ({ name, description, url, created, updated }) => {
  return (
    <div>
      <h2>
        <Link to={url}>{name}</Link>
      </h2>
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
  url: PropTypes.string.isRequired,
  created: PropTypes.string.isRequired,
  updated: PropTypes.string.isRequired,
};

export default Category;
