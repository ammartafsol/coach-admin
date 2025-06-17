export const LOGIN_FORM_VALUES = {
  email: "",
  password: "",
};

export const SIGNUP_FORM_VALUES = {
  clinicName: "",
  email: "",
  password: "",
  confirmPassword: "",
  city: "",
  state: "",
  country: "",
  address: "",
  latitude: "",
  longitude: "",
  phoneNumber: "",
  callingCode: "",
};

export const FORGET_PASSWORD_FORM_VALUES = {
  email: "",
};

export const RESET_PASSWORD_FORM_VALUES = {
  newPassword: "",
  confirmPassword: "",
};

export const ADD_EDIT_PATIENT_FORM_VALUES = {
  //Demographics
  patientNo: "", // input
  firstName: "", // input
  lastName: "", // input
  email: "", // input
  password: "", // input
  confirmPassword: "", // input
  medicalCondition: "", // input
  usefulInformation: "", // input
  organDonor: "", //dropdown
  bloodType: "", //dropdown
  gender: "", //dropdown
  dateOfBirth: "", //calendar
  doctorName: "", // input
  phoneNumber: "", // phone input
  callingCode: "", // phone input
  emergencyContact: "", // phone input
  emergencyCallingCode: "", // phone input
  pesel: "", // input
  education: "", // input
  job: "", // input
  civilStatus: "", //dropdown
  familyHistoryOfDementia: "", //dropdown
  economicStatus: "", // input -> dropdown
  //Physical Characteristics
  height: "", // number
  weight: "", // number
  bmi: "", // number
  waistCircumference: "", // number
  bloodPressure: "", // number -> input
  heartRate: "", // number
  // Disease Status / Comorbidities
  hyperTension: "", //input -> dropdown
  diabetes: "", //input -> dropdown
  heartDisease: "", //input -> dropdown
  liverDisease: "", //input -> dropdown
  renalDisease: "", //input -> dropdown
  obesity: "", //input -> dropdown
  mentalIllness: "", //input -> dropdown
  others: "", //input
  medicationTaken: "", //input
  // Lifestyle Factors
  smoking: "", // number
  alcoholConsumption: "", // number
  physicalExercise: "", // number
  dietAdequacy: "", //input
  sleepDuration: "", // number
  cognitiveStimulation: "", //input -> dropdown
  relaxationTechniques: "", //input
  waterConsumption: "", // number
  timeSpentAlone: "", // input
  useOfElectronicDevice: "", //dropdown
};

export const CATEGORY_MODAL_FORM_VALUES = {
  name: "",
  type: "",
  image: "",
};