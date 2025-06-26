import { HiOutlineUser , HiOutlineDocumentCurrencyDollar} from "react-icons/hi2";
import { TbUsers , TbCategory , TbCategory2 } from "react-icons/tb";
import { TfiCommentAlt } from "react-icons/tfi";
import { GoDiscussionDuplicate } from "react-icons/go";




export const AFTER_LOGIN_NAV_DATA = [
  { title: "Dashboard", route: "/clinic/dashboard" },
  { title: "Patient Management", route: "/clinic/patient" },
  // { title: "Profile", route: "/profile" },
];

export const FOOTER_LINKS = [
  { title: "Home", route: "/" },
  { title: "How it works", route: "/how-it-works" },
  { title: "Contact Us", route: "/contact-us" },
  { title: "Help", route: "/help" },
  { title: "Privacy", route: "/privacy" },
  { title: "Term & Conditions", route: "/term-and-condition" },
];

export const bloodTypesData = [
  { label: "A+", value: "A+" },
  { label: "A-", value: "A-" },
  { label: "B+", value: "B+" },
  { label: "B-", value: "B-" },
  { label: "AB+", value: "AB+" },
  { label: "AB-", value: "AB-" },
  { label: "O+", value: "O+" },
  { label: "O-", value: "O-" },
];
export const genderData = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
];
export const civilData = [
  { label: "Single", value: "single" },
  { label: "Married", value: "married" },
  { label: "Divorced", value: "divorced" },
  { label: "Widowed", value: "widowed" },
  { label: "Separated", value: "separated" },
];
export const yesNoData = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" },
];
export const cognitiveStimulationData = [
  { label: "Low", value: "low" },
  { label: "Moderate", value: "moderate" },
  { label: "High", value: "high" },
];


export const mediaTypeData = [
  { id: 1, label: 'MRI', value: 'mri' },
  { id: 2, label: 'CT Scan', value: 'ct_scan' },
  { id: 3, label: 'X-Ray', value: 'x_ray' },
  { id: 4, label: 'Ultrasound', value: 'ultrasound' },
  { id: 5, label: 'Blood Test', value: 'blood_test' },
  { id: 6, label: 'ECG', value: 'ecg' },
  { id: 7, label: 'Medical Reports', value: 'medical_reports' },
  { id: 8, label: 'Prescription', value: 'prescription' },
  { id: 9, label: 'Surgical History', value: 'surgical_history' },
  { id: 10, label: 'Lab Results', value: 'lab_results' },
  { id: 11, label: 'Immunization Records', value: 'immunization_records' },
  { id: 12, label: 'Medical Certificates', value: 'medical_certificates' },
  { id: 13, label: 'Discharge Summary', value: 'discharge_summary' },
  { id: 14, label: 'Pathology Report', value: 'pathology_report' },
  { id: 15, label: 'Radiology Reports', value: 'radiology_reports' },
  { id: 16, label: 'Physical Examination', value: 'physical_examination' },
];
export const NAV_DATA = [
  { label: "Dashboard", path: "/", icon: <TbCategory />},
  { label: "Subscribers", path: "/subscriber" , icon:<HiOutlineUser /> },
  { label: "Coaches", path: "/coach" , icon:<TbUsers /> },
  { label: "Feeds", path: "/feed" , icon:<TfiCommentAlt /> },
  { label: "Categories", path: "/category" , icon:  <TbCategory2 /> },
  { label: "Faqs", path: "/faq" , icon:<GoDiscussionDuplicate /> },
  {label:"transaction", path:"/transaction", icon:<HiOutlineDocumentCurrencyDollar />},
];