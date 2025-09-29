import React, { useState } from 'react';
import Modal from "@/component/molecules/Modal/ModalSkeleton/Modal";
import Button from "@/component/atoms/Button";
import { Input } from "@/component/atoms/Input";
import RenderToast from "@/component/atoms/RenderToast";
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
      if (parseFloat(newCommission) < 0) {
        RenderToast({
          type: "error",
          message: "Commission cannot be negative"
        });
        return;
      }
      onSave(coachSlug, parseFloat(newCommission));
    } else if (newCommission === currentCommission?.toString()) {
      RenderToast({
        type: "warning",
        message: "Please enter a different commission value"
      });
    } else if (!newCommission) {
      RenderToast({
        type: "warning",
        message: "Please enter a commission value"
      });
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
            variant="outlined"
            onClick={handleCancel}
            disabled={loading}
          />
          <Button
            label={loading ? "Saving..." : "Save"}
            variant="primary"
            onClick={handleSave}
            disabled={loading}
          />
        </div>
      </div>
    </Modal>
  );
}
