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
import { updatePasswordSchema } from "@/formik/formikSchema/formik-schemas";
import { UPDATE_PASSWORD_FORM_VALUES } from "@/formik/formikInitialValues/form-initial-values";
import useAxios from "@/interceptor/axiosInterceptor";
import { useDispatch } from "react-redux";
import { updateUserData,updateAccessToken } from "@/store/auth/authSlice";
import { handleEncrypt } from "@/resources/utils/helper";
import Cookies from "js-cookie";

const UpdatePasswordTemplate = () => {
  const { Patch } = useAxios();
  const router = useRouter();
  const [loading, setLoading] = useState("");
  const dispatch = useDispatch();

  const passwordFormik = useFormik({
    initialValues: UPDATE_PASSWORD_FORM_VALUES,
    validationSchema: updatePasswordSchema,
    onSubmit: (values) => {
      setLoading("loading");
      editPassword(values);
    },
  });

  const editPassword = async (values) => {
    const passwordData = {
      currentPassword: values?.currentPassword,
      password: values?.newPassword,
      confirmPassword: values?.confirmPassword,
    };
    const { response } = await Patch({
      route: `auth/update/password`,
      data: passwordData,
    });

    if (response) {
      dispatch(updateAccessToken(response?.data?.token));
      dispatch(updateUserData(response?.data?.user));
      Cookies.set("_xpdx", handleEncrypt(response?.data?.token), {
        expires: 90,
      });
      RenderToast({
        type: "success",
        message: "Password Updated Successfully",
      });
      router.push("/profile");
      setLoading("");
    }
  };

  return (
    <div className="main">
      <BorderWrapper>
        <div className={classes.wrapper}>
          <Row>
            <Col xs="12">
              <Input
                label={"Current Password"}
                name="currentPassword"
                value={passwordFormik.values.currentPassword}
                onChange={passwordFormik.handleChange}
                onBlur={passwordFormik.handleBlur}
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
                name="newPassword"
                value={passwordFormik.values.newPassword}
                onChange={passwordFormik.handleChange}
                onBlur={passwordFormik.handleBlur}
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
                name="confirmPassword"
                value={passwordFormik.values.confirmPassword}
                onChange={passwordFormik.handleChange}
                onBlur={passwordFormik.handleBlur}
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
