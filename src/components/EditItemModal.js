import React from "react";
import Modal from "react-modal";
import EditItemFormContainer from "./EditItemFormContainer";

const EditItemModal = ({
  activeModal,
  onClose,
  onUpdateItemSuccess,
  ...rest
}) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  const modalName = "editItemModal";
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
      <button onClick={onClose}>close</button>
      <EditItemFormContainer
        onUpdateItemSuccess={onUpdateItemSuccessHandler}
        {...rest}
      />
    </Modal>
  );
};

export default EditItemModal;
