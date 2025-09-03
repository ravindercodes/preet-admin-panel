import React from 'react';
import CommonModal from '../modalLayout/CommonModal';
import { Button } from 'react-bootstrap';

const ConfirmationModal = ({ show, setShow, title, message, onConfirm, confirmButtonText = 'Confirm', cancelButtonText = 'Cancel' }) => {
  return (
    <CommonModal show={show} setShow={setShow} title={title}>
      <div className="text-center mb-4">
        <p>{message}</p>
      </div>
      <div className="d-flex justify-content-center gap-3">
        <Button variant="secondary" onClick={() => setShow(false)}>
          {cancelButtonText}
        </Button>
        <Button variant="primary" onClick={onConfirm}>
          {confirmButtonText}
        </Button>
      </div>
    </CommonModal>
  );
};

export default ConfirmationModal;