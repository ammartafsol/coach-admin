"use client";

import { useEffect, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useFormik } from "formik";
import BorderWrapper from "@/component/atoms/BorderWrapper";
import Button from "@/component/atoms/Button";
import { Input } from "@/component/atoms/Input";
import { TextArea } from "@/component/atoms/TextArea/TextArea";
import UploadImageBox from "@/component/atoms/UploadImagebox";
import DropDown from "@/component/molecules/DropDown/DropDown";
import { COACH_PROFILE_FORM_VALUES } from "@/formik/formikInitialValues/form-initial-values";
import { CoachProfileSchema } from "@/formik/formikSchema/formik-schemas";
import useAxios from "@/interceptor/axiosInterceptor";
import { CreateFormData } from "@/resources/utils/helper";
import classes from "./EditCoachProfile.module.css";

const EditCoachProfile = ({
  userData,
  onSubmit,
  onCancel,
  loading = false,
}) => {
  const { Get, Post } = useAxios();
  const videoInputRef = useRef(null);
  const [sportCategories, setSportCategories] = useState([]);
  const [uploadLoading, setUploadLoading] = useState("");

  const formik = useFormik({
    initialValues: COACH_PROFILE_FORM_VALUES(userData),
    validationSchema: CoachProfileSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const payload = {
        firstName: values.firstName?.trim(),
        lastName: values.lastName?.trim(),
        phoneNumber: values.phoneNumber?.trim() || undefined,
        bio: values.bio?.trim() || undefined,
        queryDescription: values.queryDescription?.trim() || undefined,
        photo: values.photo || undefined,
        coverPhoto: values.coverPhoto || undefined,
        introVideo: values.introVideo || undefined,
        introVideoThumbnail: values.introVideoThumbnail || undefined,
        categories: values.categories?.map((item) => item.value) || [],
        ...(values.subscriptionCost !== "" &&
          values.subscriptionCost !== null &&
          values.subscriptionCost !== undefined && {
            subscriptionCost: Number(values.subscriptionCost),
          }),
      };

      onSubmit?.(payload);
    },
  });

  const getSportCategories = async () => {
    const { response } = await Get({
      route: "admin/categories?type=sport",
    });
    if (response) {
      setSportCategories(
        (response.data || []).map((category) => ({
          label: category.name,
          value: category._id,
        }))
      );
    }
  };

  const uploadMedia = async (file, field, loadingKey) => {
    if (!file) return;

    const formData = CreateFormData({ media: file });
    setUploadLoading(loadingKey);

    const { response } = await Post({
      route: "media/upload",
      data: formData,
      isFormData: true,
    });

    if (response) {
      formik.setFieldValue(field, response?.data?.media?.[0]?.key);
    }
    setUploadLoading("");
  };

  useEffect(() => {
    getSportCategories();
  }, []);

  const isBusy = loading || Boolean(uploadLoading);

  return (
    <BorderWrapper>
      <div className={classes.wrapper}>
        <h2 className={classes.sectionTitle}>Edit Coach Profile</h2>

        <div className={classes.mediaRow}>
          <div className={classes.mediaItem}>
            <UploadImageBox
              label="Profile Photo"
              state={formik.values.photo}
              setter={(file) => uploadMedia(file, "photo", "photo")}
              loading={uploadLoading === "photo"}
              uploadBoxStyle={{ borderRadius: "50%" }}
              imageStyle={{ objectFit: "cover", borderRadius: "50%" }}
            />
          </div>
          <div className={classes.coverItem}>
            <UploadImageBox
              label="Cover Photo"
              state={formik.values.coverPhoto}
              setter={(file) => uploadMedia(file, "coverPhoto", "coverPhoto")}
              loading={uploadLoading === "coverPhoto"}
              height="160px"
            />
          </div>
          <div className={classes.mediaItem}>
            <UploadImageBox
              label="Intro Video Thumbnail"
              state={formik.values.introVideoThumbnail}
              setter={(file) =>
                uploadMedia(file, "introVideoThumbnail", "introVideoThumbnail")
              }
              loading={uploadLoading === "introVideoThumbnail"}
              height="160px"
            />
          </div>
          <div className={`${classes.mediaItem} ${classes.videoUpload}`}>
            <label>Intro Video</label>
            <div className={classes.videoBox}>
              <p className={classes.videoName}>
                {formik.values.introVideo
                  ? typeof formik.values.introVideo === "string"
                    ? formik.values.introVideo
                    : formik.values.introVideo?.name
                  : "No video uploaded"}
              </p>
              <div className={classes.videoActions}>
                <Button
                  label={
                    uploadLoading === "introVideo"
                      ? "Uploading..."
                      : "Upload Video"
                  }
                  variant="green-outlined"
                  disabled={isBusy}
                  onClick={() => videoInputRef.current?.click()}
                />
                {formik.values.introVideo && (
                  <Button
                    label="Remove"
                    variant="outlined"
                    disabled={isBusy}
                    onClick={() => formik.setFieldValue("introVideo", null)}
                  />
                )}
              </div>
              <input
                ref={videoInputRef}
                className={classes.hiddenInput}
                type="file"
                accept="video/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    uploadMedia(file, "introVideo", "introVideo");
                  }
                  e.target.value = "";
                }}
              />
            </div>
          </div>
        </div>

        <Row>
          <Col xs="12" md="6">
            <Input
              label="First Name"
              name="firstName"
              placeholder="Enter first name"
              value={formik.values.firstName}
              setValue={(value) => formik.setFieldValue("firstName", value)}
              onBlur={formik.handleBlur}
              errorText={formik.touched.firstName && formik.errors.firstName}
              disabled={isBusy}
            />
          </Col>
          <Col xs="12" md="6">
            <Input
              label="Last Name"
              name="lastName"
              placeholder="Enter last name"
              value={formik.values.lastName}
              setValue={(value) => formik.setFieldValue("lastName", value)}
              onBlur={formik.handleBlur}
              errorText={formik.touched.lastName && formik.errors.lastName}
              disabled={isBusy}
            />
          </Col>
          <Col xs="12" md="6">
            <Input
              label="Phone Number"
              name="phoneNumber"
              placeholder="+14155552671"
              value={formik.values.phoneNumber}
              setValue={(value) => formik.setFieldValue("phoneNumber", value)}
              onBlur={formik.handleBlur}
              errorText={
                formik.touched.phoneNumber && formik.errors.phoneNumber
              }
              disabled={isBusy}
            />
          </Col>
          <Col xs="12" md="6">
            <Input
              label="Subscription Cost"
              name="subscriptionCost"
              type="number"
              placeholder="29"
              value={formik.values.subscriptionCost}
              setValue={(value) =>
                formik.setFieldValue("subscriptionCost", value)
              }
              onBlur={formik.handleBlur}
              errorText={
                formik.touched.subscriptionCost &&
                formik.errors.subscriptionCost
              }
              disabled={isBusy}
            />
          </Col>
          <Col xs="12">
            <TextArea
              label="Bio"
              placeholder="Enter bio"
              rows={4}
              value={formik.values.bio}
              setter={(value) => formik.setFieldValue("bio", value)}
              errorText={formik.touched.bio && formik.errors.bio}
              disabled={isBusy}
            />
          </Col>
          <Col xs="12">
            <TextArea
              label="Query Description"
              placeholder="Enter query description"
              rows={3}
              value={formik.values.queryDescription}
              setter={(value) =>
                formik.setFieldValue("queryDescription", value)
              }
              errorText={
                formik.touched.queryDescription &&
                formik.errors.queryDescription
              }
              disabled={isBusy}
            />
          </Col>
          <Col xs="12">
            <DropDown
              label="Sports Categories"
              placeholder="Select categories"
              isMulti
              options={sportCategories}
              value={formik.values.categories}
              setValue={(value) => formik.setFieldValue("categories", value)}
              errorText={formik.touched.categories && formik.errors.categories}
              disabled={isBusy}
            />
          </Col>
        </Row>

        <div className={classes.actions}>
          <Button
            label="Cancel"
            variant="green-outlined"
            onClick={onCancel}
            disabled={isBusy}
          />
          <Button
            label={loading ? "Saving..." : "Save Profile"}
            onClick={formik.handleSubmit}
            disabled={isBusy}
          />
        </div>
      </div>
    </BorderWrapper>
  );
};

export default EditCoachProfile;
