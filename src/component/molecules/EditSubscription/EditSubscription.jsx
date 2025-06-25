"use client";
import React from "react";
import classes from "./EditSubscription.module.css";
import BorderWrapper from "@/component/atoms/BorderWrapper";
import { Input } from "@/component/atoms/Input";
import Button from "@/component/atoms/Button";
import { useFormik } from "formik";
import { EditSubscriptionSchema } from "@/formik/formikSchema/formik-schemas";
export default function EditSubscription({editSubscription, loading, setIsEdit}) {

  const formik = useFormik({
    initialValues: {
      price: "",
    },
    onSubmit: async (values) => {
      const success = await editSubscription(values);
      if (success) {
        setIsEdit(false);
      }
    },
    validationSchema: EditSubscriptionSchema,
  });
  console.log("formik", formik.values); 
  return (
    <BorderWrapper>
      <div className={classes.main}>
        <p className={classes.title}>Edit Plan</p>
        <Input
          label={"Price"}
          placeholder={"$24"}
          mainContClassName={classes.inpMain}
          name="price"
          type="number"
          value={formik.values.price}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          errorText={
            formik.touched.price && formik.errors.price
          }
        />
        <Button 
          label={loading ? "Saving..." : "Save"} 
          className={classes.btn} 
          onClick={formik.handleSubmit} 
          disabled={loading}
        />
      </div>
    </BorderWrapper>
  );
}
