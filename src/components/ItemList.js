import React from "react";
import PropTypes from "prop-types";
import Item from "./Item";

const ItemList = ({ items, currentUserId, onEditClick, onDeleteClick }) => {
  if (items) {
    return items.map((item) => (
      <Item
        key={item.id}
        name={item.name}
        description={item.description}
        created={item.created}
        updated={item.updated}
        isOwner={currentUserId === item.user_id}
        onEditClick={onEditClick}
        onDeleteClick={onDeleteClick}
      />
    ));
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
