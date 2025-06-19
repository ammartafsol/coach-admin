"use client";
import { Modal } from "react-bootstrap";
import { AiOutlineClose } from "react-icons/ai";
import clsx from "clsx";
import { useEffect, useState } from "react";
import classes from "./Modal.module.css";

export default function ModalSkeleton({
  size = "md",
  show,
  setShow,
  heading,
  subheading,
  children,
  modalBodyClass,
  showCloseIcon,
  headerClass,
  modalMainClass,
  footerData = null,
}) {
  const [animationClass, setAnimationClass] = useState("");

  useEffect(() => {
    if (show) {
      setAnimationClass(classes.modalEnter);
    } else if (animationClass === classes.modalEnter) {
      setAnimationClass(classes.modalExit);
    }
  }, [show]);

  const handleClose = () => {
    setAnimationClass(classes.modalExit);
    setTimeout(() => setShow(false), 400); // Match the CSS animation duration
  };

  return (
    <Modal
      size={size}
      show={show}
      onHide={handleClose}
      centered
      dialogClassName={clsx(
        classes.modalDialog,
        animationClass,
        modalMainClass
      )}
      backdropClassName="custom-backdrop"
    >
      {(heading || subheading) && (
        <div className={clsx(classes.headingBox, headerClass)}>
          {heading && (
            <h2
              className={clsx(
                "fs-16 fw-600 heading-color lh-20",
                classes.heading
              )}
            >
              {heading}
            </h2>
          )}
          {showCloseIcon && (
            <div className={classes.iconBox} onClick={handleClose}>
              <AiOutlineClose size={15} className={classes.icon} />
            </div>
          )}
        </div>
      )}
      <Modal.Body className={clsx(classes.body, modalBodyClass)}>
        {children}
      </Modal.Body>
      <Modal.Footer className={classes.footer}>{footerData}</Modal.Footer>
    </Modal>
  );
}
