"use client";

import Button from "@/component/atoms/Button";
import { Input } from "@/component/atoms/Input";
import RenderToast from "@/component/atoms/RenderToast";
import { mediaUrl } from "@/resources/utils/helper";
import { useFormik } from "formik";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { IoMdAdd } from "react-icons/io";
import classes from "./Profile.module.css";
import { profileSchema } from "@/developmentContent/formik/formikSchema/formik-schemas";
import BorderWrapper from "@/component/atoms/BorderWrapper";
import useAxios from '@/interceptor/axiosInterceptor';
import { useSelector } from "react-redux";


const ProfileTemplate = () => {
  const [image, setImage] = useState(null);
  const router = useRouter();
  const [loading, setLoading] = useState("");
  const { Patch } = useAxios();
   const userData =useSelector(state=>state.authReducer.user);
console.log(userData)
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
      photo: "",
      phoneNumber:"",
    },
    validationSchema: profileSchema,
    onSubmit: (values) => {
      setLoading("loading");
      editProfile(values);
    },
  });

const editProfile = async (values) => {
  const { response } = await Patch({
    route: `/users/update/me`,
    body: {
      photo: values.photo,
    },
  });
  console.log("response", response);
  if (response) {
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
          <div className={classes.profile}>
            <div className={classes.profileImageContainer}>
              <Image
                src={image || mediaUrl(userData?.photo)}
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
                value={userData?.email}
                type={"email"}
                placeholder={"Enter your Email"}
                disabled={true}
              />
            </Col>
            <Col xs="12">
              <Input
                label={"Phone Number"}
                value={userData?.phoneNumber}
                type={"number"}
                placeholder={"Enter your Phone Number"}
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
