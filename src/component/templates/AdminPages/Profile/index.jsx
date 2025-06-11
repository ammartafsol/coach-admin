"use client";

import Button from "@/component/atoms/Button";
import { Input } from "@/component/atoms/Input";
import RenderToast from "@/component/atoms/RenderToast";
import { mergeClass } from "@/resources/utils/helper";
import { useFormik } from "formik";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { IoMdAdd } from "react-icons/io";
import classes from "./Profile.module.css";
import { profileSchema } from "@/developmentContent/formik/formikSchema/formik-schemas";
import BorderWrapper from "@/component/atoms/BorderWrapper";

const ProfileTemplate = () => {
  const [image, setImage] = useState(null);
  const router = useRouter();
  const [loading, setLoading] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
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
      email: "",
      password: "",
    },
    validationSchema: profileSchema,
    onSubmit: (values) => {
      setLoading("loading");
      setTimeout(() => {
        RenderToast({
          type: "success",
          message: "Profile Updated Successfully",
        });
        setLoading("");
      }, 1000);
    },
  });

  return (
    <div className="main">
      <BorderWrapper>
        <div className={classes.wrapper}>
          <div className={classes.profile}>
            <div className={classes.profileImageContainer}>
              <Image
                src={image || "/images/cms-images/profile.png"}
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
                  onChange={handleImageChange}
                />
                <label htmlFor="fileInput">
                  <div className={classes.addIcon}>
                    <IoMdAdd color="#fff" size={25} />
                  </div>
                </label>
              </div>
            </div>
          </div>
          <Row>
            <Col xs="12">
              <Input
                label={"Email"}
                value={profileFormik.values.email}
                setter={(e) => {
                  profileFormik.setFieldValue("email", e);
                }}
                errorText={
                  profileFormik.touched.email &&
                  profileFormik.errors.email
                }
                type={"email"}
                placeholder={"Enter your Email"}
              />
            </Col>
            <Col xs="12">
              <Input
                label={"Password"}
                value={profileFormik.values.password}
                setter={(e) => {
                  profileFormik.setFieldValue("password", e);
                }}
                errorText={
                  profileFormik.touched.password &&
                  profileFormik.errors.password
                }
                type={"password"}
                placeholder={"Enter your Password"}
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
