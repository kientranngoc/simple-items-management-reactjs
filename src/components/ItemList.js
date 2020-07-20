import React from "react";
import PropTypes from "prop-types";
import Item from "./Item";

const ItemList = ({ items, currentUserId, onEditClick, onDeleteClick }) => {
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
            isOwner={currentUserId === item.user_id}
            onEditClick={onEditClick}
            onDeleteClick={onDeleteClick}
          />
        ))}
      </div>
    );
  } else {
    return null;
  }
};

ItemList.propTypes = {
  items: PropTypes.array,
  currentUserId: PropTypes.number,
  onEditClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

export default ItemList;
