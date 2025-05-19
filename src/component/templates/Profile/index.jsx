"use client";

import Button from "@/component/atoms/Button";
import { Input } from "@/component/atoms/Input";
import RenderToast from "@/component/atoms/RenderToast";
import { Patch } from "@/interceptor/axios-functions";
import { CreateFormData, mediaUrl, mergeClass } from "@/resources/utils/helper";
import { UpdateUser } from "@/store/auth/authSlice";
import { useFormik } from "formik";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { IoMdAdd } from "react-icons/io";
import classes from "./Profile.module.css";
import { TextArea } from "@/component/atoms/TextArea/TextArea";
import { profileSchema } from "@/developmentContent/formik/formikSchema/formik-schemas";
import BorderWrapper from "@/component/atoms/BorderWrapper";

const ProfileTemplate = () => {
  const [image, setImage] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState("");
  const { user } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const profileFormik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
    },
    validationSchema: profileSchema,
    onSubmit: (values) => {
      submitProfile(values);
    },
  });

  const submitProfile = async (values) => {
    const obj = {
      firstName: values.firstName,
      lastName: values.lastName,
      // photo: file ?? user?.photo,
    };
    setLoading("loading");
    const response = await Patch({
      route: "users/updateMe",
      data: obj,
    });
    if (response?.data?.status === 200) {
      dispatch(UpdateUser(response?.data?.data?.data?.user));
      RenderToast({
        type: "success",
        message: "Profile Updated Successfully",
      });
    }
    setLoading("");
  };

  useEffect(() => {
    if (user) {
      profileFormik.setValues({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        email: user?.email || "",
      });
      const userImage = mediaUrl(user?.photo);
      setProfileImage(userImage);
      setImage(userImage);
    }
  }, [user]);

  return (
    <div className="main">
      <BorderWrapper>
        <div className={classes.wrapper}>
          <div className={classes.profile}>
            {/* // image ||
        // profileImage || */}
            <Image
              src={"/Images/app-images/web-image/avatar.png"}
              alt="profile"
              fill
              objectFit="cover"
              className={classes?.profileImage}
            />
            {/* <div className={classes.CTA}>
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              id="fileInput"
              onChange={handleImageChange}
            />
            <label htmlFor="fileInput">
              <div className={classes?.addIcon}>
                <IoMdAdd color="var(--white-color)" size={25} />
              </div>
            </label>
          </div> */}
          </div>
          <Row>
            <Col xs="12">
              <Input
                label={"First Name"}
                type={"text"}
                value={profileFormik.values.firstName}
                setter={(e) => {
                  profileFormik.setFieldValue("firstName", e);
                }}
                errorText={
                  profileFormik.touched.firstName &&
                  profileFormik.errors.firstName
                }
                placeholder={"Enter your First Name"}
              />
            </Col>
            <Col xs="12">
              <Input
                label={"Last  Name"}
                value={profileFormik.values.lastName}
                setter={(e) => {
                  profileFormik.setFieldValue("lastName", e);
                }}
                errorText={
                  profileFormik.touched.lastName &&
                  profileFormik.errors.lastName
                }
                type={"text"}
                placeholder={"Enter your Last Name"}
              />
            </Col>
            <Col xs="12">
              <Input
                label={"Email"}
                value={profileFormik.values.email}
                type={"text"}
                placeholder={"Enter your Email"}
                disabled={true}
              />
            </Col>
          </Row>
          <div
            onClick={() => {
              router.push("/updatePassword");
            }}
            className={mergeClass("mt-3", "textBlodLeft")}
          >
            Update Password?
          </div>
          <div className="btnRight">
            <Button
              onClick={profileFormik.handleSubmit}
              disabled={loading === "loading"}
              label={loading === "loading" ? "loading..." : "Update Profile"}
            />
          </div>
        </div>
      </BorderWrapper>
    </div>
  );
};

export default ProfileTemplate;
