"use client";
import Button from "@/component/atoms/Button";
import { Input } from "@/component/atoms/Input";
import LayoutWrapper from "@/component/atoms/LayoutWrapper";
import RenderToast from "@/component/atoms/RenderToast";
import { LOGIN_FORM_VALUES } from "@/formik/formikInitialValues/form-initial-values";
import { LoginSchema } from "@/formik/formikSchema/formik-schemas";
import useAxios from "@/interceptor/axiosInterceptor";
import { saveLoginUserData } from "@/store/auth/authSlice";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Col, Container } from "react-bootstrap";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useDispatch } from "react-redux";
import classes from "./LoginTemplate.module.css";
import Cookies from "js-cookie";
import { handleEncrypt } from "@/resources/utils/helper";

export default function LoginTemplate() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { Post } = useAxios();
  const [loading, setLoading] = useState(""); // submitLogin
  // LoginFormik
  const LoginFormik = useFormik({
    initialValues: LOGIN_FORM_VALUES,
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });
  // handleSubmit
  const handleSubmit = async (values) => {
    setLoading("submitLogin");

    const { response } = await Post({
      route: "users/clinic/login",
      data: values,
    });
    if (response) {
      Cookies.set("_xpdx", handleEncrypt(response?.data?.token), {
        expires: 90,
      });
      Cookies.set("_xpdx_rf", handleEncrypt(response?.data?.refreshToken), {
        expires: 90,
      });
      Cookies.set("_xpdx_ur", handleEncrypt(response?.data?.user?.role), {
        expires: 90,
      });
      dispatch(saveLoginUserData(response?.data));
      RenderToast({
        type: "success",
        message: "Login Successfully",
      });
      router.push("/clinic/patient");
      // router.push("/clinic/dashboard");
    }
    setLoading("");
  };
  return (
    <LayoutWrapper>
      <Container>
        <div className={classes.loginContainer}>
          <Col md={12} className={classes.loginFormDiv}>
            <div className={classes.headingDiv}>
              <h2>Login</h2>
              <p>
                Welcome back! Log in to access your dashboard and take the next
                step.
              </p>
            </div>
            <Input
              type={"email"}
              leftIcon={<MdEmail color="#B0B7C3" fontSize={20} />}
              placeholder={"Email address"}
              value={LoginFormik.values.email}
              setter={LoginFormik.handleChange("email")}
              errorText={LoginFormik.touched.email && LoginFormik.errors.email}
              mainContClassName={"mb-0"}
            />
            <Input
              type={"password"}
              leftIcon={<FaLock color="#B0B7C3" fontSize={16} />}
              placeholder={"Password"}
              value={LoginFormik.values.password}
              setter={LoginFormik.handleChange("password")}
              errorText={
                LoginFormik.touched.password && LoginFormik.errors.password
              }
              mainContClassName={"mb-0"}
            />
            <p
              onClick={() => {
                router.push("/forget-password");
              }}
              className={classes.forgetPassword}
            >
              Forgot Password?
            </p>
            <Button
              label={loading == "submitLogin" ? "Please Wait..." : "Login"}
              variant={"gradient"}
              onClick={LoginFormik.handleSubmit}
              disabled={loading == "submitLogin"}
            />
          </Col>
        </div>
      </Container>
    </LayoutWrapper>
  );
}
