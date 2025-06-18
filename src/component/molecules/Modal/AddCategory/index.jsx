"use client";
import { useFormik } from "formik";
import Modal from "@/component/molecules/Modal/Modal";
import Button from "@/component/atoms/Button";
import { Input } from "@/component/atoms/Input";
import { CATEGORY_MODAL_FORM_VALUES } from "@/formik/formikInitialValues/form-initial-values";
import { CategoryModalSchema } from "@/formik/formikSchema/formik-schemas";
import classes from "./AddCategory.module.css";
import { useEffect, useState } from "react";
import useAxios from "@/interceptor/axiosInterceptor";
import UploadImageBox from "@/component/atoms/UploadImagebox";
import RenderToast from "@/component/atoms/RenderToast";
import DropDown from "../../DropDown/DropDown";
import { CATEGORY_TYPE_OPTIONS } from "@/developmentContent/dropdownOption";
import { CreateFormData } from "@/resources/utils/helper";
import { Row, Col } from "react-bootstrap";
import clsx from "clsx";

const AddCategoryModal = ({ show, setShow, itemData }) => {
  const { Post, Patch } = useAxios();
  const [loading, setLoading] = useState("");

  const categoryFormik = useFormik({
    initialValues: CATEGORY_MODAL_FORM_VALUES,
    validationSchema: CategoryModalSchema,
    onSubmit: (values) => {
      handleAddEditCategory(values);
    },
  });
  const handleAddEditCategory = async (values) => {
    setLoading("loading");

    const payload = {
      ...values,
      type: values.type?.value,
    };

    const route = itemData?._id
      ? `admin/categories/${itemData.slug}`
      : "admin/categories";
    const responseHandler = itemData?.slug ? Patch : Post;

    console.log("🚀 ~ vroute:", route);
    const { response } = await responseHandler({
      route,
      data: payload,
    });

    if (response) {
      RenderToast({
        message: response.message,
        type: response.status,
      });
      setLoading("");
    }
  };
  const handleImageChange = async (file) => {
    console.log("🚀 ~ file:", file);
    const data = {
      media: file,
    };

    const formData = CreateFormData(data);

    const { response } = await Post({
      route: "media/upload",
      data: formData,
      isFormData: true,
    });
    console.log("🚀 ~ response:", response);
    if (response) {
      console.log(response);

      categoryFormik.setFieldValue("image", response.data?.media[0].key);
    }
  };
  useEffect(() => {
    if (itemData?.image) {
      categoryFormik.setFieldValue("image", itemData.image);
    }
    if (itemData?.type) {
      categoryFormik.setFieldValue("type", itemData.type);
    }
    if (itemData?.name) {
      categoryFormik.setFieldValue("name", itemData.name);
    }
  }, [itemData]);

  return (
    <Modal
      setShow={setShow}
      show={show}
      showCloseIcon={true}
      modalBodyClass={classes.modal}
      heading={`${itemData?.slug ? "Edit" : "Add New"} Category`}
      footerData={
        <Col md={12} className={classes?.formCol}>
          <div className={clsx(classes?.buttonContainer)}>
            <Button
              variant="green-outlined"
              label="Cancel"
              onClick={() => setShow(false)}
              type="button"
            />
            <Button
              label={
                loading === "loading"
                  ? "Please Wait..."
                  : itemData?.slug
                  ? "Edit Category"
                  : "Add Category"
              }
              type="submit"
              disabled={loading !== ""}
              onClick={() => categoryFormik.handleSubmit()}
            />
          </div>
        </Col>
      }
    >
      <div className={classes.container}>
        {/* <form onSubmit={categoryFormik.handleSubmit} className={classes.form}> */}
          <Row>
            <Col md={12}>
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
            </Col>
            <Col md={12}>
              <DropDown
                label="Category Type"
                name="type"
                options={CATEGORY_TYPE_OPTIONS}
                value={categoryFormik.values.type}
                setValue={(value) =>
                  categoryFormik.setFieldValue("type", value)
                }
                onBlur={categoryFormik.handleBlur}
                errorText={
                  categoryFormik.touched.type && categoryFormik.errors.type
                }
              />
            </Col>
            <Col md={12}>
              <UploadImageBox
                label="Category Image"
                state={categoryFormik.values.image}
                setter={(value) => {
                  handleImageChange(value);
                }}
                onBlur={categoryFormik.handleBlur}
                errorText={
                  categoryFormik.touched.image && categoryFormik.errors.image
                }
              />
            </Col>
          </Row>

          {/* <div className={classes.buttonContainer}>
            <Button
              type="submit"
              label={
                loading === "loading"
                  ? "Please Wait..."
                  : itemData?.slug
                  ? "Edit Category"
                  : "Add Category"
              }
            />
          </div> */}
        {/* </form> */}
      </div>
    </Modal>
  );
};

export default AddCategoryModal;
