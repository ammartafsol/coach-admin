"use client";
import { useFormik } from "formik";
import Modal from "@/component/molecules/Modal/Modal";
import Button from "@/component/atoms/Button";
import { Input } from "@/component/atoms/Input";
import { CATEGORY_MODAL_FORM_VALUES } from "@/formik/formikInitialValues/form-initial-values";
import { CategoryModalSchema } from "@/formik/formikSchema/formik-schemas";
import classes from "./AddCategory.module.css";
import { useState } from "react";
import useAxios from "@/interceptor/axiosInterceptor";
import UploadImageBox from "@/component/atoms/UploadImagebox";
// import MultiFileUpload from "@/component/molecules/MultiFileUpload/MultiFileUpload";

const AddCategoryModal = ({ isOpen, onClose, itemData }) => {
  const { Post } = useAxios();
  const [loading, setLoading] = useState(""); // addOrUpdate
  const [categoryImage, setCategoryImage] = useState(null); // Add state for category image

  const categoryFormik = useFormik({
    initialValues: {
      ...CATEGORY_MODAL_FORM_VALUES,
      ...itemData, // itemData may contain name, type, etc.
      image: "", // file inputs must always start empty
    },
    validationSchema: CategoryModalSchema,
    onSubmit: (values) => {
      console.log("🚀 ~ values:", values);
      addCategory(values);
    },
  });
  console.log("🚀 ~ categoryFormik:", categoryFormik.values);
  const addCategory = async (values) => {
    const response = await Post({
      route: "admin/categories",
      data: values,
    });
    console.log("🚀 ~ addCategory ~ response:", response);
  };
  const handleImageChange = async (e) => {
    const response = await Post({
      route: "media/upload",
      data: {
        file: e.target.files[0],
      },
      isFormData: true,
    });
    if (response) {
      setCategoryImage(response.data.media);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      customModalContent={classes.customModalContent}
      heading={`${itemData?.slug ? "Edit" : "Add New"} Category`}
    >
      <div className={classes.container}>
        <form onSubmit={categoryFormik.handleSubmit} className={classes.form}>
          <Input
            label="Category Name"
            type="text"
            name="name"
            value={categoryFormik.values.name}
            onChange={categoryFormik.handleChange}
            onBlur={categoryFormik.handleBlur}
            errorText={
              categoryFormik.touched.name && categoryFormik.errors.name
            }
          />

          <Input
            label="Category Type"
            type="text"
            name="type"
            value={categoryFormik.values.type}
            onChange={categoryFormik.handleChange}
            onBlur={categoryFormik.handleBlur}
            errorText={
              categoryFormik.touched.type && categoryFormik.errors.type
            }
          />

          <UploadImageBox
            state={categoryImage}
            setter={setCategoryImage}
            label="Category Image"
            edit={false}
            onEdit={handleImageChange}
          />

          <div className={classes.buttonContainer}>
            <Button
              type="submit"
              label={
                loading === "loading"
                  ? "Please Wait..."
                  : itemData?.slug
                  ? "Edit Category"
                  : "Add Category"
              }
              loading={loading}
            />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddCategoryModal;
