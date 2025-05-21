"use client";
import Button from "@/component/atoms/Button";
import { Input } from "@/component/atoms/Input";
import RenderToast from "@/component/atoms/RenderToast";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import classes from "./UpdatePassword.module.css";
import BorderWrapper from "@/component/atoms/BorderWrapper";
import * as Yup from "yup";

const updatePasswordSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Current password is required"),
  newPassword: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const UpdatePasswordTemplate = () => {
  const router = useRouter();
  const [loading, setLoading] = useState("");

  const passwordFormik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: updatePasswordSchema,
    onSubmit: (values) => {
      setLoading("loading");
      setTimeout(() => {
        RenderToast({
          type: "success",
          message: "Password Updated Successfully",
        });
        setLoading("");
        router.push("/profile");
      }, 1000);
    },
  });

  return (
    <div className="main">
      <BorderWrapper>
        <div className={classes.wrapper}>
          <Row>
            <Col xs="12">
              <Input
                label={"Current Password"}
                value={passwordFormik.values.currentPassword}
                setter={(e) => {
                  passwordFormik.setFieldValue("currentPassword", e);
                }}
                errorText={
                  passwordFormik.touched.currentPassword &&
                  passwordFormik.errors.currentPassword
                }
                type={"password"}
                placeholder={"Enter your current password"}
              />
            </Col>
            <Col xs="12">
              <Input
                label={"New Password"}
                value={passwordFormik.values.newPassword}
                setter={(e) => {
                  passwordFormik.setFieldValue("newPassword", e);
                }}
                errorText={
                  passwordFormik.touched.newPassword &&
                  passwordFormik.errors.newPassword
                }
                type={"password"}
                placeholder={"Enter your new password"}
              />
            </Col>
            <Col xs="12">
              <Input
                label={"Confirm Password"}
                value={passwordFormik.values.confirmPassword}
                setter={(e) => {
                  passwordFormik.setFieldValue("confirmPassword", e);
                }}
                errorText={
                  passwordFormik.touched.confirmPassword &&
                  passwordFormik.errors.confirmPassword
                }
                type={"password"}
                placeholder={"Confirm your new password"}
              />
            </Col>
          </Row>
          <div className="btnRight">
            <Button
              className={classes.btn}
              onClick={passwordFormik.handleSubmit}
              disabled={loading === "loading"}
              label={loading === "loading" ? "loading..." : "Update Password"}
            />
          </div>
        </div>
      </BorderWrapper>
    </div>
  );
};

export default UpdatePasswordTemplate;
