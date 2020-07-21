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
};

CategoryList.propTypes = {
  categories: PropTypes.array,
};

export default CategoryList;
