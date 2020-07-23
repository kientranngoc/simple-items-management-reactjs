import React from 'react';
import PropTypes from 'prop-types';
import Item from './Item';

const ItemList = ({
  items, userId, onEditClick, onDeleteClick,
}) => {
  if (items) {
    return (
      <div>
        <h2>Item List</h2>
        {items.map((item) => (
          <Item
            key={item.id}
            id={item.id}
            name={item.name}
            description={item.description}
            price={item.price}
            created={item.created}
            updated={item.updated}
            isOwner={userId === item.user_id}
            onEditClick={onEditClick}
            onDeleteClick={onDeleteClick}
          />
        ))}
      </div>
    );
  }
  return null;
};

ItemList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      created: PropTypes.string.isRequired,
      updated: PropTypes.string.isRequired,
      user_id: PropTypes.number.isRequired,
    }),
  ),
  userId: PropTypes.number,
  onEditClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

ItemList.defaultProps = {
  items: [],
  userId: null,
};

export default ItemList;
