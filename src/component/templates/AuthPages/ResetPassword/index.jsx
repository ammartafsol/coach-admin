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
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Container } from "react-bootstrap";
import classes from "./ResetPassword.module.css";

const ResetPassword = () => {
  const router = useRouter();
  const { Post } = useAxios();
  const [loading, setLoading] = useState("");

  const email = Cookies.get("email");
  const code = Cookies.get("code");

  const formikResetPassword = useFormik({
    initialValues: RESET_PASSWORD_FORM_VALUES,
    validationSchema: ResetPasswordSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (values) => {
    setLoading("loading");
    const body = {
      email: email,
      code: code,
      password: values?.newPassword,
      confirmPassword: values?.confirmPassword,
    };
    const { response } = await Post({
      route: "auth/reset/password",
      data: body,
    });
    if (response) {
      RenderToast({ type: "success", message: "Password Reset Successfully" });
      Cookies.remove("_xpdx_ver");
      Cookies.remove("email");
      Cookies.remove("code");
      router.push("/");
    }
    setLoading("");
  };

  return (
    <LayoutWrapper>
      <Container>
        <div className={classes.loginContainer}>
          <Image
            src={"/images/app-images/logo.png"}
            alt="logo"
            width={130}
            height={50}
          />
          <div className={classes.formContainer}>
            <div className={classes.headingDiv}>
              <h2>Reset Password</h2>
              <p className="fs-16 dullGrey fw-400">
                Please type something you'll remember
              </p>
            </div>
            <div className={classes.inputGroup}>
              <Input
                type={"password"}
                label="Password"
                // leftIcon={<FaLock color="#B0B7C3" fontSize={16} />}
                placeholder={"New Password"}
                setter={(e) => {
                  formikResetPassword.setFieldValue("newPassword", e);
                }}
                value={formikResetPassword.values.newPassword}
                errorText={
                  formikResetPassword.touched.newPassword &&
                  formikResetPassword.errors.newPassword
                }
                inputBoxStyle={classes.inputColor}
                labelStyle={classes.labelColor}
              />
              <Input
                type={"password"}
                label="Confirm Password"
                // leftIcon={<FaLock color="#B0B7C3" fontSize={16} />}
                placeholder={"Confirm Password"}
                setter={(e) => {
                  formikResetPassword.setFieldValue("confirmPassword", e);
                }}
                value={formikResetPassword.values.confirmPassword}
                errorText={
                  formikResetPassword.touched.confirmPassword &&
                  formikResetPassword.errors.confirmPassword
                }
                inputBoxStyle={classes.inputColor}
                labelStyle={classes.labelColor}
              />
            </div>
            <Button
              disabled={loading === "loading"}
              onClick={formikResetPassword.handleSubmit}
              label={loading === "loading" ? "loading..." : "Reset Password"}
            />
          </div>
        </div>
      </Container>
    </LayoutWrapper>
  );
};

export default ResetPassword;
