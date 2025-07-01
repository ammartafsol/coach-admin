"use client";

import Button from "@/component/atoms/Button";
import { Input } from "@/component/atoms/Input";
import RenderToast from "@/component/atoms/RenderToast";
import { CreateFormData } from "@/resources/utils/helper";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import classes from "./Profile.module.css";
import { profileSchema } from "@/developmentContent/formik/formikSchema/formik-schemas";
import BorderWrapper from "@/component/atoms/BorderWrapper";
import useAxios from '@/interceptor/axiosInterceptor';
import { useSelector, useDispatch } from "react-redux";
import { updateUserData } from "@/store/auth/authSlice";
import UploadImageBox from "@/component/atoms/UploadImagebox";
import { PROFILE_FORM_VALUES } from "@/formik/formikInitialValues/form-initial-values";

const ProfileTemplate = () => {
  const { Patch, Post } = useAxios();
  const router = useRouter();
  const dispatch = useDispatch();
  const userData = useSelector(state => state.authReducer.user);
  const [loading, setLoading] = useState("");

  const handleImageChange = async (file) => {
    if (!file) return;

    const data = {
      media: file,
    };

    const formData = CreateFormData(data);

    setLoading("uploadImage");

    const { response } = await Post({
      route: "media/upload",
      data: formData,
      isFormData: true,
    });

    if (response) {
      profileFormik.setFieldValue('photo', response?.data?.media[0]?.key);
    }
    setLoading("");
  };

  const profileFormik = useFormik({
    initialValues: PROFILE_FORM_VALUES(userData),
    validationSchema: profileSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      setLoading("loading");
      editProfile(values);
    },
  });

  const editProfile = async (values) => {
    const updateData = {
      firstName: values?.firstName,
      lastName: values?.lastName,
      phoneNumber: values?.phoneNumber,
      ...(values?.photo && values?.photo !== userData?.photo && { photo: values?.photo }),
    };

    const { response } = await Patch({
      route: `users/update/me`,
      data: updateData,
    });

    if (response) {
      dispatch(updateUserData(response?.data))
      RenderToast({
        type: "success",
        message: "Profile Updated Successfully",
      });
    }
    
    setLoading("");
  };

  return (
    <div className="main">
      <BorderWrapper>
        <div className={classes.wrapper}>
            <div className={classes.profileImageContainer}>
              <UploadImageBox
                state={profileFormik.values.photo}
                setter={handleImageChange}  
                loading={loading === "uploadImage"}
                uploadBoxStyle={{
                  borderRadius: "50%",
                }}
                imageUploadedStyle={{
                  objectFit: "fill",
                }}
              />
          </div>
          
          <Row>
            <Col xs="12" md="6">
              <Input
                label={"First Name"}
                name="firstName"
                value={profileFormik.values.firstName}
                setValue={(value) => profileFormik.setFieldValue("firstName", value)}
                onBlur={profileFormik.handleBlur}
                type={"text"}
                placeholder={"Enter your First Name"}
                errorText={
                  profileFormik.touched.firstName && profileFormik.errors.firstName
                }
              />
            </Col>
            <Col xs="12" md="6">
              <Input
                label={"Last Name"}
                name="lastName"
                value={profileFormik.values.lastName}
                setValue={(value) => profileFormik.setFieldValue("lastName", value)}
                onBlur={profileFormik.handleBlur}
                type={"text"}
                placeholder={"Enter your Last Name"}
                errorText={
                  profileFormik.touched.lastName && profileFormik.errors.lastName
                }
              />
            </Col>
            <Col xs="12">
              <Input
                label={"Email"}
                value={userData?.email }
                type={"email"}
                placeholder={"Enter your Email"}
                disabled={true}
              />
            </Col>
            <Col xs="12">
              <Input
                label={"Phone Number"}
                name="phoneNumber"
                value={profileFormik.values.phoneNumber}
                setValue={(value) => profileFormik.setFieldValue("phoneNumber", value)}
                onBlur={profileFormik.handleBlur}
                type={"tel"}
                disabled={["uploadMedia", "submitData"].includes(loading)}
                placeholder={"Enter your Phone Number"}
                errorText={
                  profileFormik.touched.phoneNumber && profileFormik.errors.phoneNumber
                }
              />
            </Col>
          </Row>
          
          <div
            onClick={() => {
              router.push("/update-Password");
            }}
            className={classes?.textBlodLeft}
          >
            Update Password?
          </div>
          
          <div className="btnRight">
            <Button
              className={classes.btn}
              onClick={profileFormik.handleSubmit}
              disabled={["uploadImage", "loading"].includes(loading)}
              label={loading === "loading" ? "Updating..." : "Update Profile"}
            />
          </div>
        </div>
      </BorderWrapper>
    </div>
  );
};

export default ProfileTemplate;
