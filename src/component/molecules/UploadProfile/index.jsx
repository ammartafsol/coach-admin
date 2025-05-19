import React, { useRef, useState } from "react";
import classes from "./UploadProfile.module.css";
import { BaseURL, CreateFormData } from "@/resources/utils/helper";
import useAxios from "@/interceptor/axiosInterceptor";
import LottieLoader from "@/component/atoms/LottieLoader/LottieLoader";

const UploadProfile = ({ uploadImage, setUploadImage, readOnly = false }) => {
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef();
  const { Post } = useAxios();
  const [loading,setLoading] = useState(false);

  const handleImageChange = async (e) => {
    setLoading(true);
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
      const formData = CreateFormData({ docs: file });
      const response = await Post({
        route: "users/media/upload",
        isFormData: true,
        data: formData,
      });
      if (response) {
        setUploadImage(response?.response?.data?.docs?.at(0)?.key);
        setPreview(null);
      }
      setLoading(false);
    }
  };

  return (
    <div className={classes.wrapper}>
      <div
        className={classes.uploadImage}
        onClick={!readOnly ? () => fileInputRef.current.click() : undefined}
        style={{ cursor: readOnly ? "default" : "pointer" }}
      >
        {preview || uploadImage ? (
          <img
            src={preview || BaseURL(`users/media/fetch/${uploadImage}`)}
            alt="Profile Preview"
            className={classes.preview}
          />
        ) : (
          <span className={classes.placeholder}>+</span>
        )}
      </div>
      {!readOnly && (
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className={classes.hiddenInput}
          onChange={handleImageChange}
        />
      )}
      {loading && <LottieLoader />}
    </div>
  );
};

export default UploadProfile;
