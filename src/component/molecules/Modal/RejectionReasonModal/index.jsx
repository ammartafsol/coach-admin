"use client";

import React, { useState } from "react";
import Modal from "@/component/molecules/Modal/ModalSkeleton/Modal";
import Button from "@/component/atoms/Button";
import { TextArea } from "@/component/atoms/TextArea/TextArea";
import { MdWarning } from "react-icons/md";
import classes from "./RejectionReasonModal.module.css";
import { useFormik } from "formik";
import { RejectionReasonSchema } from "@/formik/formikSchema/formik-schemas";

export default function RejectionReasonModal({
  show,
  setShow,
  onConfirm,
  heading = "⚠️ Rejection Reason",
  subheading = "Please provide a reason for rejecting this request.",
}) {
  const [loading, setLoading] = useState("");

  const rejectionReasonFormik = useFormik({
    initialValues: {
      rejectReason: "",
    },
    validationSchema: RejectionReasonSchema,
    onSubmit: (values) => {
      setLoading("loading")
      onConfirm(values);
    },
  });
  const handleCancel = () => {
    setShow(false);
    rejectionReasonFormik.resetForm();
  };

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

        <div className={classes.reasonInputContainer}>
        <TextArea
              label="Rejection Reason"
              placeholder="Enter Rejection Reason"
              name="rejectReason"
              value={rejectionReasonFormik.values.rejectReason}
              setter={(value) => rejectionReasonFormik.setFieldValue("rejectReason", value)}
              errorText={
                rejectionReasonFormik.touched.rejectReason&& rejectionReasonFormik.errors.rejectReason
              }
              rows={4}
            />
        </div>

        <div className={classes.buttonContainer}>
          <Button
            label="Cancel"
            variant="green-outlined"
            onClick={handleCancel}
          />
          <Button
            label="Submit Rejection"
            variant="danger"
            onClick={rejectionReasonFormik.handleSubmit}
            loading={loading === "loading"}
            disabled={loading === "loading"}
          />
        </div>
      </div>
    </Modal>
  );
}
