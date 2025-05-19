"use client";

import Button from "@/component/atoms/Button";
import { Input } from "@/component/atoms/Input";
import LayoutWrapper from "@/component/atoms/LayoutWrapper";
import RenderToast from "@/component/atoms/RenderToast";
import { RESET_PASSWORD_FORM_VALUES } from "@/formik/formikInitialValues/form-initial-values";
import { ResetPasswordSchema } from "@/formik/formikSchema/formik-schemas";
import useAxios from "@/interceptor/axiosInterceptor";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Container } from "react-bootstrap";
import { FaLock } from "react-icons/fa";
import classes from "./ResetPassword.module.css";

const ResetPassword = () => {
  const router = useRouter();
  const { Post } = useAxios();
  const [loading, setLoading] = useState("");

  const formikResetPassword = useFormik({
    initialValues: RESET_PASSWORD_FORM_VALUES,
    validationSchema: ResetPasswordSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (values) => {
    setLoading("loading");
    const obj = {
      email: Cookies.get("email"),
      otpCode: Cookies.get("otpCode"),
      password: values?.newPassword,
      confirmPassword: values?.confirmPassword,
    };
    const response = await Post({ route: "users/resetPasswordDone", data: obj });
    if (response) {
      RenderToast({ type: "success", message: "Password Reset Successfully" });
      router.push("/");
    }
    setLoading("");
  };

  return (
    <LayoutWrapper>
      <Container>
        <div className={classes.loginContainer}>
          <div className={classes.headingDiv}>
            <h2>Reset Password</h2>
            <p>Please type something you'll remember</p>
          </div>
          <div className={classes.formContainer}>
            <div className={classes.inputGroup}>
              <Input
                type={"password"}
                leftIcon={<FaLock color="#B0B7C3" fontSize={16} />}
                placeholder={"New Password"}
                setter={(e) => {
                  formikResetPassword.setFieldValue("newPassword", e);
                }}
                value={formikResetPassword.values.newPassword}
                errorText={
                  formikResetPassword.touched.newPassword &&
                  formikResetPassword.errors.newPassword
                }
              />
              <Input
                type={"password"}
                leftIcon={<FaLock color="#B0B7C3" fontSize={16} />}
                placeholder={"Confirm Password"}
                setter={(e) => {
                  formikResetPassword.setFieldValue("confirmPassword", e);
                }}
                value={formikResetPassword.values.confirmPassword}
                errorText={
                  formikResetPassword.touched.confirmPassword &&
                  formikResetPassword.errors.confirmPassword
                }
              />
            </div>
            <Button
              disabled={loading === "loading"}
              onClick={formikResetPassword.handleSubmit}
              variant={"gradient"}
              label={loading === "loading" ? "loading..." : "Reset Password"}
            />
          </div>
        </div>
      </Container>
    </LayoutWrapper>
  );
};

export default ResetPassword;
