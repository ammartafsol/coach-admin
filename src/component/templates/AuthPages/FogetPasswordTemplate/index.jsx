"use client";

import Button from "@/component/atoms/Button";
import { Input } from "@/component/atoms/Input";
import LayoutWrapper from "@/component/atoms/LayoutWrapper";
import RenderToast from "@/component/atoms/RenderToast";
import { FORGET_PASSWORD_FORM_VALUES } from "@/formik/formikInitialValues/form-initial-values";
import { ForgetPasswordSchema } from "@/formik/formikSchema/formik-schemas";
import useAxios from "@/interceptor/axiosInterceptor";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Container } from "react-bootstrap";
import { MdEmail } from "react-icons/md";
import classes from "./FogetPasswordTemplate.module.css";
import Image from "next/image";

const ForgetPasswordTemplate = () => {
  const router = useRouter();
  const { Post } = useAxios();
  const [loading, setLoading] = useState("");

  const formikForgetPassword = useFormik({
    initialValues: FORGET_PASSWORD_FORM_VALUES,
    validationSchema: ForgetPasswordSchema,
    onSubmit: (values) => {
      handleSignUp(values);
    },
  });

  const handleSignUp = async (values) => {
    setLoading("loading");
    const obj = {
      email: values?.email,
    };
    const response = await Post({ route: "auth/forgot/password", data: obj });
    if (response) {
      console.log(response);
      Cookies.set("email", obj.email);
      RenderToast({ type: "success", message: "success" });
      router.push("/otp");
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

          <div className={classes.loginFormDiv}>
            <div className={classes.headingDiv}>
              <h2>Forgot Password</h2>
              <p className="fs-16 dullGrey fw-400">
                Enter the email address associated with your account, and we'll
                email you a link to reset your password.
              </p>
            </div>
            <Input
              type={"email"}
              label="Email"
              // leftIcon={<MdEmail color="#B0B7C3" fontSize={20} />}
              placeholder={"Email"}
              setter={(e) => {
                formikForgetPassword.setFieldValue("email", e);
              }}
              value={formikForgetPassword.values.email}
              errorText={
                formikForgetPassword.touched.email &&
                formikForgetPassword.errors.email
              }
              inputBoxStyle={classes.inputColor}
              labelStyle={classes.labelColor}
            />
            <Button
              disabled={loading === "loading"}
              onClick={() => {
                formikForgetPassword.handleSubmit();
              }}
              label={loading === "loading" ? "loading..." : "Send"}
            />
          </div>
        </div>
      </Container>
    </LayoutWrapper>
  );
};

export default ForgetPasswordTemplate;
