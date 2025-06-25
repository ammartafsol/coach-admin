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
import { useDispatch, useSelector } from "react-redux";
import classes from "./LoginTemplate.module.css";
import Cookies from "js-cookie";
import { handleEncrypt } from "@/resources/utils/helper";
import Image from "next/image";

export default function LoginTemplate() {
  const { Post } = useAxios();
  const router = useRouter();
  const dispatch = useDispatch();
  // const userData =useSelector(state=>state.authReducer.user);
  const [loading, setLoading] = useState(""); // submitLogin
  
  const expiryDate = new Date(new Date().getTime() + 10 * 60 * 1000);
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
      route: "auth/admin/login",
       data: {
        email: values.email,
        password: values.password,
      },
    });
    if (response) {
      Cookies.set("_xpdx", handleEncrypt(response?.data?.token), {
        expires: 90,
      });
      dispatch(saveLoginUserData(response?.data));
      // console.log("reducer:",userData);
      RenderToast({
        type: "success",
        message: "Login Successfully",
      });
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
          <div className={classes.loginFormDiv}>
            <div className={classes.headingDiv}>
              <h2>Login</h2>
              {/* <p>
                Welcome back! Log in to access your dashboard and take the next
                step.
              </p> */}
            </div>
            <Input
              type={"email"}
              label="Email"
              // leftIcon={<MdEmail color="#B0B7C3" fontSize={20} />}
              placeholder={"Email address"}
              value={LoginFormik.values.email}
              // setter={LoginFormik.handleChange("email")}
              onChange={LoginFormik.handleChange("email")}
              errorText={LoginFormik.touched.email && LoginFormik.errors.email}
              mainContClassName={"mb-0"}
              inputBoxStyle={classes.inputColor}
              labelStyle={classes.labelColor}
            />
            <Input
              type={"password"}
              label="Password"
              // leftIcon={<FaLock color="#B0B7C3" fontSize={16} />}
              placeholder={"Password"}
              value={LoginFormik.values.password} 
              // setter={LoginFormik.handleChange("password")}
              onChange={LoginFormik.handleChange("password")}
              errorText={
                LoginFormik.touched.password && LoginFormik.errors.password
              }
              mainContClassName={"mb-0"}
              inputBoxStyle={classes.inputColor}
              labelStyle={classes.labelColor}
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
              onClick={LoginFormik.handleSubmit}
              disabled={loading == "submitLogin"} type={"submit"}
            />
            {/* <div className={classes.newAccount}>
              <p
                onClick={() => {
                  router.push("/forget-password");
                }}
                className="white fs-18"
              >
                Don’t Have Account?
              </p>
              <p className="dullWhite fs-14">
                Don't have an account? Sign up now and start your learning with
                Coach Huddle!
              </p>
            </div> */}
          </div>
        </div>
      </Container>
    </LayoutWrapper>
  );
}
