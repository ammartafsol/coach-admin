"use client";
import Button from "@/component/atoms/Button";
import { Input } from "@/component/atoms/Input";
import RenderToast from "@/component/atoms/RenderToast";
import Wrapper from "@/component/atoms/wrapper";
import { Patch } from "@/interceptor/axios-functions";
import { handleEncrypt } from "@/resources/utils/helper";
import { updatePasswordSchema } from "@/schema/forgetPasswordSchema";
import { saveToken } from "@/store/auth/authSlice";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import classes from "./UpdatePassword.module.css";

const UpdatePasswordTemplate = () => {
  const [loading, setLoading] = useState("");
  const updatePasswordFormik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      reEnterNewPassword: "",
    },
    validationSchema: updatePasswordSchema,
    onSubmit: (values, { resetForm }) => {
      handleSubmit(values, { resetForm });
    },
  });

  const handleSubmit = async (values, { resetForm }) => {
    setLoading("loading");
    const obj = {
      currentPassword: values.oldPassword,
      password: values.newPassword,
      confirmPassword: values.reEnterNewPassword,
    };
    const response = await Patch({ route: "auth/update/password", data: obj });
    if (response) {
      saveToken(response?.data?.data?.token);
      Cookies.set("_xpdx", handleEncrypt(response?.data?.data?.token));
      RenderToast({
        type: "success",
        message: "Password Updated Successfully",
      });
      resetForm();
    }
    setLoading("");
  };

  return (
    <Wrapper>
      <div className={classes.Wrapper}>
        <h5 className={`${"heading1"} ${classes.passwordText}`}>
          Update Password
        </h5>
        <Row>
          <Col xs="12">
            <Input
              label={"Old Password"}
              setter={(e) =>
                updatePasswordFormik.setFieldValue("oldPassword", e)
              }
              errorText={
                updatePasswordFormik.touched.oldPassword &&
                updatePasswordFormik.errors.oldPassword
              }
              value={updatePasswordFormik.values.oldPassword}
              type={"password"}
              placeholder={"*****"}
            />
          </Col>
          <Col xs="12">
            <Input
              label={"New Password"}
              setter={(e) =>
                updatePasswordFormik.setFieldValue("newPassword", e)
              }
              errorText={
                updatePasswordFormik.touched.newPassword &&
                updatePasswordFormik.errors.newPassword
              }
              value={updatePasswordFormik.values.newPassword}
              type={"password"}
              placeholder={"*****"}
            />
          </Col>
          <Col xs="12">
            <Input
              label={"Re-enter New Password"}
              setter={(e) =>
                updatePasswordFormik.setFieldValue("reEnterNewPassword", e)
              }
              errorText={
                updatePasswordFormik.touched.reEnterNewPassword &&
                updatePasswordFormik.errors.reEnterNewPassword
              }
              value={updatePasswordFormik.values.reEnterNewPassword}
              type={"password"}
              placeholder={"*****"}
            />
          </Col>
        </Row>
        <div className="btnRight">
          <Button
            onClick={updatePasswordFormik.handleSubmit}
            disabled={loading === "loading"}
            label={loading === "loading" ? "loading..." : "Update Password"}
          />
        </div>
      </div>
    </Wrapper>
  );
};

export default UpdatePasswordTemplate;
