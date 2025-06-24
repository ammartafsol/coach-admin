import React from "react";
import Modal from "@/component/molecules/Modal/ModalSkeleton/Modal";
import Button from "@/component/atoms/Button";
import { MdWarning } from "react-icons/md";
import classes from "./AreYouSureModal.module.css";

export default function AreYouSureModal({
  show,
  setShow,
  onConfirm,
  heading ,
  subheading,
  confirmButtonLabel,
  cancelButtonLabel,
  confirmButtonVariant,
  cancelButtonVariant,
}) {
 
  return (
    <Modal
      setShow={setShow}
      show={show}
      showCloseIcon={false}
      heading={heading}
      subheading={subheading}
      size="md"
      modalBodyClass={classes.modalBody}
    >
      <div className={classes.modalContent}>
        <div className={classes.iconContainer}>
          <MdWarning className={classes.warningIcon} />
        </div>
        <div className={classes.buttonContainer}>
          <Button
            label={cancelButtonLabel}
            variant={cancelButtonVariant}
            onClick={() => setShow("")}
          />
          <Button
            label={confirmButtonLabel}
            variant={confirmButtonVariant}
            onClick={onConfirm}
          />
        </div>
      </div>
    </Modal>
  );
}
