"use client";

import Button from "@/component/atoms/Button";
import { Input } from "@/component/atoms/Input";
import RenderToast from "@/component/atoms/RenderToast";
import { mediaUrl, CreateFormData } from "@/resources/utils/helper";
import { useFormik } from "formik";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import { Col, Row } from "react-bootstrap";
import { IoMdAdd } from "react-icons/io";
import classes from "./Profile.module.css";
import { profileSchema } from "@/developmentContent/formik/formikSchema/formik-schemas";
import BorderWrapper from "@/component/atoms/BorderWrapper";
import useAxios from '@/interceptor/axiosInterceptor';
import { useSelector, useDispatch } from "react-redux";
import { updateUserData } from "@/store/auth/authSlice";
import UploadImageBox from "@/component/atoms/UploadImagebox";

const ProfileTemplate = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadedImageKey, setUploadedImageKey] = useState(null);
  const [imageUploadLoading, setImageUploadLoading] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState("");
  const { Patch, Post } = useAxios();
  const userData = useSelector(state => state.authReducer.user);
  const dispatch = useDispatch();
  const fileInputRef = useRef();

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
      setUploadedImageKey(response?.data?.media[0]?.key);
      profileFormik.setFieldValue('photo', response?.data?.media[0]?.key);
    }
    setLoading("");
  };

  const profileFormik = useFormik({
    initialValues: {
      firstName: userData?.firstName || "",
      lastName: userData?.lastName || "",
      phoneNumber: userData?.phoneNumber || "",
      photo: userData?.photo || "",
    },
    validationSchema: profileSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      setLoading("loading");
      editProfile(values);
    },
  });
  console.log(profileFormik.values)

  const editProfile = async (values) => {
    const updateData = {
      firstName: values.firstName,
      lastName: values.lastName,
      phoneNumber: values.phoneNumber,
    };

    // Only include photo if it's been updated
    if (uploadedImageKey) {
      updateData.photo = uploadedImageKey;
    }

    const { response } = await Patch({
      route: `/users/update/me`,
      body: updateData,
    });

    if (response) {
      RenderToast({
        type: "success",
        message: "Profile Updated Successfully",
      });
      
      // Update the user data in Redux store
      const updatedUserData = {
        ...userData,
        ...updateData,
      };
      dispatch(updateUserData(updatedUserData));
      
      // Reset the image states
      setImagePreview(null);
      setUploadedImageKey(null);
    }
    
    setLoading("");
  };

  const getProfileImageSrc = () => {
    if (imagePreview) return imagePreview;
    if (uploadedImageKey) return mediaUrl(uploadedImageKey);
    if (userData?.photo) return mediaUrl(userData.photo);
    return "/images/dummy-images/user.png"; // fallback image
  };

  return (
    <div className="main">
      <BorderWrapper>
        <div className={classes.wrapper}>
          <div className={classes.profile}>
            <div className={classes.profileImageContainer}>
              <Image
                src={getProfileImageSrc()}
                alt="profile"
                width={200}
                height={200}
                className={classes.profileImage}
              />
              <div className={classes.CTA}>
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  id="fileInput"
                  ref={fileInputRef}
                  onChange={(e) => handleImageChange(e.target.files[0])}
                  disabled={loading === "uploadImage"}
                />
                <label htmlFor="fileInput">
                  <div className={classes.addIcon}>
                    {loading === "uploadImage" ? (
                      <div className={classes.loadingSpinner}></div>
                    ) : (
                      <IoMdAdd color="#fff" size={25} />
                    )}
                  </div>
                </label>
              </div>
            </div>
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
                value={userData?.email || ""}
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
              disabled={loading === "loading" || loading === "uploadImage"}
              label={loading === "loading" ? "Updating..." : "Update Profile"}
            />
          </div>
        </div>
      </BorderWrapper>
    </div>
  );
};

export default ProfileTemplate;
