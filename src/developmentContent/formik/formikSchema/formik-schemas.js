import * as Yup from "yup";

export const profileSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters")
    .required("First name is required"),
  lastName: Yup.string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters")
    .required("Last name is required"),
  // email: Yup.string()
  //   .email("Invalid email format")
  //   .required("Email is required"),
  phoneNumber: Yup.string()
    .matches(/^\+?[0-9]{10,15}$/, "Phone number is not valid")
    .optional(),
}); 