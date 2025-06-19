"use client";
import { useFormik } from "formik";
import Modal from "@/component/molecules/Modal/ModalSkeleton/Modal";
import Button from "@/component/atoms/Button";
import { Input } from "@/component/atoms/Input";
import { USER_MODAL_FORM_VALUES } from "@/formik/formikInitialValues/form-initial-values";
import { UserModalSchema } from "@/formik/formikSchema/formik-schemas";
import classes from "./AddUser.module.css";
import { useEffect } from "react";
import DropDown from "../../DropDown/DropDown";
import { USER_STATUS_OPTIONS } from "@/developmentContent/dropdownOption";
import { Row, Col } from "react-bootstrap";
import clsx from "clsx";

const AddUserModal = ({
  show,
  setShow,
  itemData,
  handleAddEditUser,
  loading,
  setLoading,
}) => {
  const userFormik = useFormik({
    initialValues: USER_MODAL_FORM_VALUES(itemData),
    validationSchema: UserModalSchema,
    onSubmit: (values) => {
      setLoading("loading");
      handleAddEditUser(values);
    },
  });

  useEffect(() => {
    userFormik.setValues(USER_MODAL_FORM_VALUES(itemData));
  }, [itemData]);

  return (
    <Modal
      setShow={setShow}
      show={show}
      showCloseIcon={true}
      modalBodyClass={classes.modal}
      heading={`Edit User`}
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
                  : "Update User"
              }
              type="submit"
              disabled={loading !== ""}
              onClick={() => userFormik.handleSubmit()}
            />
          </div>
        </Col>
      }
    >
      <div className={classes.container}>
        <Row>
          <Col md={6}>
            <Input
              label="First Name"
              type="text"
              name="firstName"
              placeholder="Enter First Name"
              value={userFormik.values.firstName}
              onChange={userFormik.handleChange}
              onBlur={userFormik.handleBlur}
              errorText={
                userFormik.touched.firstName && userFormik.errors.firstName
              }
            />
          </Col>
          <Col md={6}>
            <Input
              label="Last Name"
              type="text"
              name="lastName"
              placeholder="Enter Last Name"
              value={userFormik.values.lastName}
              onChange={userFormik.handleChange}
              onBlur={userFormik.handleBlur}
              errorText={
                userFormik.touched.lastName && userFormik.errors.lastName
              }
            />
          </Col>
          <Col md={12}>
            <Input
              label="Email"
              type="email"
              name="email"
              placeholder="Enter Email"
              value={userFormik.values.email}
              onChange={userFormik.handleChange}
              onBlur={userFormik.handleBlur}
              errorText={
                userFormik.touched.email && userFormik.errors.email
              }
            />
          </Col>
          <Col md={6}>
            <Input
              label="Phone Number"
              type="text"
              name="phoneNumber"
              placeholder="Enter Phone Number"
              value={userFormik.values.phoneNumber}
              onChange={userFormik.handleChange}
              onBlur={userFormik.handleBlur}
              errorText={
                userFormik.touched.phoneNumber && userFormik.errors.phoneNumber
              }
            />
          </Col>
          <Col md={6}>
            <Input
              label="Location"
              type="text"
              name="location"
              placeholder="Enter Location"
              value={userFormik.values.location}
              onChange={userFormik.handleChange}
              onBlur={userFormik.handleBlur}
              errorText={
                userFormik.touched.location && userFormik.errors.location
              }
            />
          </Col>
          <Col md={12}>
            <DropDown
              label="Status"
              name="isActive"
              options={USER_STATUS_OPTIONS}
              value={userFormik.values.isActive}
              setValue={(option) => userFormik.setFieldValue("isActive", option)}
              onBlur={userFormik.handleBlur}
              errorText={
                userFormik.touched.isActive && userFormik.errors.isActive
              }
            />
          </Col>
        </Row>
      </div>
    </Modal>
  );
};

export default AddUserModal; 