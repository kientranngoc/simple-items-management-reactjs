import React from 'react';
import PropTypes from 'prop-types';
import Category from './Category';

const CategoryList = ({ categories }) => {
  if (categories) {
    return (
      <div>
        <h2>Category List</h2>
        {categories.map((category) => (
          <Category
            key={category.id}
            url={`/categories/${category.id}`}
            name={category.name}
            description={category.description}
            created={category.created}
            updated={category.updated}
          />
        ))}
      </div>
    );
  }
  return null;
};

CategoryList.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      created: PropTypes.string.isRequired,
      updated: PropTypes.string.isRequired,
    }),
  ),
};

CategoryList.defaultProps = {
  categories: [],
};

export default CategoryList;
