import React, { useState } from 'react';
import Modal from "@/component/molecules/Modal/ModalSkeleton/Modal";
import Button from "@/component/atoms/Button";
import { Input } from "@/component/atoms/Input";
import classes from "./EditCommissionModal.module.css";

export default function EditCommissionModal({
  show,
  setShow,
  currentCommission,
  coachSlug,
  onSave,
  loading = false
}) {
  const [newCommission, setNewCommission] = useState('');

  const handleSave = () => {
    if (newCommission && newCommission !== currentCommission) {
      onSave(coachSlug, parseFloat(newCommission));
    }
  };

  const handleCancel = () => {
    setNewCommission('');
    setShow(false);
  };

  return (
    <Modal
      setShow={setShow}
      show={show}
      showCloseIcon={true}
      heading="Edit Commission"
      subheading="Update the commission for this coach"
      size="md"
      modalBodyClass={classes.modalBody}
    >
      <div className={classes.modalContent}>
        <div className={classes.inputContainer}>
          <Input
            label="Current Commission"
            value={currentCommission}
            disabled={true}
            type="number"
            placeholder="Current commission"
            customStyle={classes.disabledInput}
          />
        </div>
        
        <div className={classes.inputContainer}>
          <Input
            label="New Commission"
            value={newCommission}
            setValue={setNewCommission}
            type="number"
            placeholder="Enter new commission"
            errorText={newCommission && parseFloat(newCommission) < 0 ? "Commission cannot be negative" : ""}
          />
        </div>

        <div className={classes.buttonContainer}>
          <Button
            label="Cancel"
            variant="secondary"
            onClick={handleCancel}
            disabled={loading}
          />
          <Button
            label={loading ? "Saving..." : "Save"}
            variant="primary"
            onClick={handleSave}
            disabled={loading || !newCommission || parseFloat(newCommission) < 0 || newCommission === currentCommission?.toString()}
          />
        </div>
      </div>
    </Modal>
  );
}
