import * as Yup from "yup";

export const LoginSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required."),
  password: Yup.string().required("Password is required."),
});

export const signUpSchema = Yup.object().shape({
  clinicName: Yup.string().required("Clinic Name is required."),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required."),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long.")
    .required("Password is required."),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required."),
  city: Yup.string().optional(),
  state: Yup.string().optional(),
  country: Yup.string().optional(),
  address: Yup.string().optional(),
  latitute: Yup.string().optional(),
  longitute: Yup.string().optional(),
  phoneNumber: Yup.string()
    .matches(/^\+?[0-9]{10,15}$/, "Phone number is not valid")
    .optional(),
  callingCode: Yup.string().optional(),
});

export const ForgetPasswordSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email field is required"),
});

export const ResetPasswordSchema = Yup.object({
  newPassword: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Confirm password is required"),
});

export const profileSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  // phoneNumber: Yup.number("Invalid").required("Phone number name is required"),
});

export const updatePasswordSchema = Yup.object({
  oldPassword: Yup.string().required("Old password is required"),
  newPassword: Yup.string().required("New password is required"),
  reEnterNewPassword: Yup.string()
    .required("Re-enter new password is required")
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
});
export const getAddPatientValidationSchema = (slug) => {
  const baseSchema = {
    // Demographics
    patientNo: Yup.string().required("Patient No is required."),
    firstName: Yup.string().required("First Name is required."),
    lastName: Yup.string().required("Last Name is required."),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required."),
    medicalCondition: Yup.string().optional(),
    usefulInformation: Yup.string().optional(),
    organDonor: Yup.object().optional(),
    bloodType: Yup.object().optional(),
    gender: Yup.object().required("Gender is required."),
    dateOfBirth: Yup.date().required("Date of Birth is required."),
    doctorName: Yup.string().required("Doctor full name is required."),
    phoneNumber: Yup.string().required("Phone number is required."),
    callingCode: Yup.string().optional(),
    emergencyContact: Yup.string().required(
      "Emergency contact number is required."
    ),
    emergencyCallingCode: Yup.string().optional(),
    pesel: Yup.string().required("Pesel is required."),
    education: Yup.string().optional(),
    job: Yup.string().optional(),
    civilStatus: Yup.object().required("Civil status is required."),
    familyHistoryOfDementia: Yup.object().required(
      "Family history of dementia is required."
    ),
    economicStatus: Yup.object().optional(),

    // Physical Characteristics
    height: Yup.string().required("Height is required."),
    weight: Yup.string().required("Weight is required."),
    bmi: Yup.string().optional(),
    waistCircumference: Yup.string().optional(),
    bloodPressure: Yup.string().required("Blood pressure is required."),
    heartRate: Yup.string().required("Heart rate is required."),

    // Disease Status / Comorbidities
    hyperTension: Yup.object().required("Hypertension status is required."),
    diabetes: Yup.object().required("Diabetes status is required."),
    heartDisease: Yup.object().required("Heart disease status is required."),
    liverDisease: Yup.object().optional(),
    renalDisease: Yup.object().optional(),
    obesity: Yup.object().optional(),
    mentalIllness: Yup.object().required("Mental illness status is required."),
    others: Yup.string().optional(),
    medicationTaken: Yup.string().required("Medication taken is required."),

    // Lifestyle Factors
    smoking: Yup.string().required("Smoking status is required."),
    alcoholConsumption: Yup.string().required(
      "Alcohol consumption status is required."
    ),
    physicalExercise: Yup.string().required(
      "Physical exercise status is required."
    ),
    dietAdequacy: Yup.string().optional(),
    sleepDuration: Yup.string().required("Sleep duration is required."),
    cognitiveStimulation: Yup.object().optional(),
    relaxationTechniques: Yup.string().optional(),
    waterConsumption: Yup.string().optional(),
    timeSpentAlone: Yup.string().optional(),
    useOfElectronicDevice: Yup.object().optional(),
  };

  if (!slug) {
    baseSchema.password = Yup.string()
      .min(8, "Password must be at least 8 characters long.")
      .required("Password is required.");

    baseSchema.confirmPassword = Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required.");
  }

  return Yup.object().shape(baseSchema);
};
export const CategoryModalSchema = Yup.object({
  name: Yup.string().required("Category name is required"),
  type: Yup.object()
    .nullable()
    .required("At least one category type is required")
    .test(
      "has-category-type",
      "At least one category type is required",
      (value) => value && Object.keys(value).length > 0
    ),
  image: Yup.string().required("Image is required"),
  isActive  : Yup.object()
    .nullable()
    .required("Status is required")
    .test(
      "has-category-status",
      "Status is required",
      (value) => value && Object.keys(value).length > 0
    ),
});

export const FaqModalSchema = Yup.object({
  title: Yup.string().required("Question is required"),
  description: Yup.string().required("Answer is required"),
  isActive: Yup.object()
    .nullable()
    .required("Status is required")
    .test(
      "has-faq-status",
      "Status is required",
      (value) => value && Object.keys(value).length > 0
    ),
  type: Yup.object()
    .nullable()
    .required("FAQ type is required")
    .test(
      "has-faq-type",
      "FAQ type is required",
      (value) => value && Object.keys(value).length > 0
    ),
});

export const UserModalSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phoneNumber: Yup.string().optional(),
  location: Yup.string().optional(),
  isActive: Yup.object()
    .nullable()
    .required("Status is required")
    .test(
      "has-user-status",
      "Status is required",
      (value) => value && Object.keys(value).length > 0
    ),
    city: Yup.string().optional(),
    state: Yup.string().optional(),
    country: Yup.object()
    .shape({
      label: Yup.string().required(),
      value: Yup.string().required("Country is required."),
    })
});
export const RejectionReasonSchema = Yup.object({
  rejectReason: Yup.string().required("Rejection Reason is required"),
});