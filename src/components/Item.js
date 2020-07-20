import React from "react";
import PropTypes from "prop-types";

const Item = ({
  key,
  name,
  description,
  price,
  isOwner,
  created,
  updated,
  onEditClick,
  onDeleteClick,
}) => {
  const onEditClickHandler = () => {
    onEditClick(key);
  };
  const onDeleteClickHandler = () => {
    onDeleteClick(key);
  };
  return (
    <div>
      <h2>{name}</h2>
      <span>{description}</span>
      <br />
      <span>{price}</span>
      <br />
      <span>{created}</span>
      <br />
      <span>{updated}</span>
      <br />
      {isOwner ? (
        <>
          <button onClick={onEditClickHandler}>Edit</button>
          <button onClick={onDeleteClickHandler}>Delete</button>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

Item.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  created: PropTypes.string.isRequired,
  updated: PropTypes.string.isRequired,
  isOwner: PropTypes.bool.isRequired,
  onEditClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

export default Item;
