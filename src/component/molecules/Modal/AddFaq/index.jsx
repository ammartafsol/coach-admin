"use client";
import { useFormik } from "formik";
import Modal from "@/component/molecules/Modal/ModalSkeleton/Modal";
import Button from "@/component/atoms/Button";
import { Input } from "@/component/atoms/Input";
import { TextArea } from "@/component/atoms/TextArea/TextArea";
import { FAQ_MODAL_FORM_VALUES } from "@/formik/formikInitialValues/form-initial-values";
import { FaqModalSchema } from "@/formik/formikSchema/formik-schemas";
import classes from "./AddFaq.module.css";
  import { useEffect } from "react";
import DropDown from "../../DropDown/DropDown";
import { FAQ_STATUS_OPTIONS, FAQ_TYPE_OPTIONS } from "@/developmentContent/dropdownOption";
import { Row, Col } from "react-bootstrap";
import clsx from "clsx";

const AddFaqModal = ({
  show,
  setShow,
  itemData,
  handleAddEditFaq,
  loading,
  setLoading,
}) => {
  const faqFormik = useFormik({
    initialValues: FAQ_MODAL_FORM_VALUES(itemData),
    validationSchema: FaqModalSchema,
    onSubmit: (values) => {
      setLoading("loading");
      handleAddEditFaq(values);
    },
  });

  useEffect(() => {
    faqFormik.setValues(FAQ_MODAL_FORM_VALUES(itemData));
  }, [itemData]);

  return (
    <Modal
      setShow={setShow}
      show={show}
      showCloseIcon={true}
      modalBodyClass={classes.modal}
      heading={`${itemData?.slug ? "Edit" : "Add New"} FAQ`}
      footerData={
        <Col md={12} className={classes?.formCol}>
          <div className={clsx(classes?.buttonContainer)}>
            <Button
              variant="green-outlined"
              label="Cancel"
              onClick={() => setShow(false)}
              type="button"
            />
            <Button
              label={
                loading === "loading"
                  ? "Please Wait..."
                  : itemData?.slug
                  ? "Edit FAQ"
                  : "Add FAQ"
              }
              type="submit"
              disabled={loading !== ""}
              onClick={() => faqFormik.handleSubmit()}
            />
          </div>
        </Col>
      }
    >
      <div className={classes.container}>
        <Row>
          <Col md={12}>
            <Input
              label="Question"
              type="text"
              name="title"
              placeholder="Enter FAQ Question"
              value={faqFormik.values.title}
              // setter={(value) => faqFormik.setFieldValue("title", value)}
              onChange={(e) => faqFormik.setFieldValue("title", e.target.value)}
              errorText={
                faqFormik.touched.title && faqFormik.errors.title
              }
            />
          </Col>
          <Col md={12}>
            <TextArea
              label="Answer"
              placeholder="Enter FAQ Answer"
              value={faqFormik.values.description}
              setter={(value) => faqFormik.setFieldValue("description", value)}
              errorText={
                faqFormik.touched.description && faqFormik.errors.description
              }
              rows={4}
            />
          </Col>
          <Col md={12}>
            <DropDown
              label="FAQ Type"
              name="type"
              options={FAQ_TYPE_OPTIONS}
              value={faqFormik.values.type}
              setValue={(option) => faqFormik.setFieldValue("type", option)}
              errorText={
                faqFormik.touched.type && faqFormik.errors.type
              }
            />
          </Col>
          <Col md={12}>
            <DropDown
              label="Status"
              name="isActive"
              options={FAQ_STATUS_OPTIONS}
              value={faqFormik.values.isActive}
              setValue={(option) => faqFormik.setFieldValue("isActive", option)}
              errorText={
                faqFormik.touched.isActive && faqFormik.errors.isActive
              }
            />
          </Col>
        </Row>
      </div>
    </Modal>
  );
};

export default AddFaqModal; 