import React from 'react';
import PropTypes from 'prop-types';

const Item = ({
  id,
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
    onEditClick(id);
  };
  const onDeleteClickHandler = () => {
    onDeleteClick(id);
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
        ''
      )}
    </div>
  );
};

Item.propTypes = {
  id: PropTypes.number.isRequired,
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
