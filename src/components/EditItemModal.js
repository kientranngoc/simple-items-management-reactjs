import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import EditItemFormContainer from './EditItemFormContainer';

const EditItemModal = ({
  activeModal,
  onClose,
  onUpdateItemSuccess,
  categoryId,
  itemId,
  name,
  description,
  price,
}) => {
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  const modalName = 'editItemModal';
  const onUpdateItemSuccessHandler = (item) => {
    // Close modal
    onClose();
    onUpdateItemSuccess(item);
  };
  return (
    <Modal
      isOpen={activeModal === modalName}
      onClose={onClose}
      style={customStyles}
      contentLabel="Edit An Item Modal"
    >
      <button type="button" onClick={onClose}>
        close
      </button>
      <EditItemFormContainer
        onUpdateItemSuccess={onUpdateItemSuccessHandler}
        categoryId={categoryId}
        itemId={itemId}
        name={name}
        description={description}
        price={price}
      />
    </Modal>
  );
};

EditItemModal.propTypes = {
  activeModal: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  onUpdateItemSuccess: PropTypes.func.isRequired,
  categoryId: PropTypes.number.isRequired,
  itemId: PropTypes.number,
  name: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.number,
};

EditItemModal.defaultProps = {
  activeModal: null,
  itemId: null,
  name: '',
  description: '',
  price: 0,
};

export default EditItemModal;
