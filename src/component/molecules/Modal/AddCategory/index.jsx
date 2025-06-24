"use client";
import { useFormik } from "formik";
import Modal from "@/component/molecules/Modal/ModalSkeleton/Modal";
import Button from "@/component/atoms/Button";
import { Input } from "@/component/atoms/Input";
import { CATEGORY_MODAL_FORM_VALUES } from "@/formik/formikInitialValues/form-initial-values";
import { CategoryModalSchema } from "@/formik/formikSchema/formik-schemas";
import classes from "./AddCategory.module.css";
import { useEffect } from "react";
import UploadImageBox from "@/component/atoms/UploadImagebox";
import DropDown from "../../DropDown/DropDown";
import { CATEGORY_STATUS_OPTIONS, CATEGORY_TYPE_OPTIONS } from "@/developmentContent/dropdownOption";
import { Row, Col } from "react-bootstrap";
import clsx from "clsx";

const AddCategoryModal = ({
  show,
  setShow,
  itemData,
  handleImageChange,
  handleAddEditCategory,
  loading,

}) => {
  const categoryFormik = useFormik({
    initialValues: CATEGORY_MODAL_FORM_VALUES(itemData),
    validationSchema: CategoryModalSchema(itemData?.isActive),
    onSubmit: (values) => {
      handleAddEditCategory(values);
    },
  });


  useEffect(() => {
    if(itemData){
      categoryFormik.setValues(CATEGORY_MODAL_FORM_VALUES(itemData));
    }
  }, [itemData]);

  return (
    <Modal
      setShow={setShow}
      show={show}
      showCloseIcon={true}
      modalBodyClass={classes.modal}
      heading={`${itemData?.slug ? "Edit" : "Add New"} Category`}
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
                  ? "Edit Category"
                  : "Add Category"
              }
              type="submit"
              disabled={loading !== ""}
              onClick={() => categoryFormik.handleSubmit()}
            />
          </div>
        </Col>
      }
    >
      <div className={classes.container}>
        <Row>
          <Col md={12}>
            <Input
              label="Category Name"
              type="text"
              name="name"
              placeholder="Enter Category Name"
              value={categoryFormik.values.name}
              onChange={categoryFormik.handleChange}
              onBlur={categoryFormik.handleBlur}
              errorText={
                categoryFormik.touched.name && categoryFormik.errors.name
              }
            />
          </Col>
          <Col md={12}>
            <DropDown
              label="Category Type"
              name="type"
              options={CATEGORY_TYPE_OPTIONS}
              value={categoryFormik.values.type}
              setValue={(value) => categoryFormik.setFieldValue("type", value)}
              onBlur={categoryFormik.handleBlur}
              errorText={
                categoryFormik.touched.type && categoryFormik.errors.type
              }
            />
          </Col>
          <Col md={12}>
            <UploadImageBox
              label="Category Image"
              state={categoryFormik.values.image}
              setter={(value) => {
                handleImageChange(value);
              }}
              onBlur={categoryFormik.handleBlur}
              errorText={
                categoryFormik.touched.image && categoryFormik.errors.image
              }
            />
          </Col>
         {itemData && <Col md={12}>
            <DropDown
              label="Status"
              name="isActive"
              options={CATEGORY_STATUS_OPTIONS}
              value={categoryFormik.values.isActive}
              setValue={(option) => categoryFormik.setFieldValue("isActive", option)}
              onBlur={categoryFormik.handleBlur}
              errorText={
                categoryFormik.touched.isActive && categoryFormik.errors.isActive
              }
            />
          </Col>}
        </Row>
      </div>
    </Modal>
  );
};

export default AddCategoryModal;
