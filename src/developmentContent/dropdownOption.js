import { CiStar } from "react-icons/ci";
import { AiFillStar } from "react-icons/ai";

export const CATEGORY_TYPE_OPTIONS = [
  { label: "Sport", value: "sport" },
  { label: "Feed", value: "feed" },
];

export const STATUS_OPTIONS = [
  { label: "All", value: "all" },
  { label: "Active", value: true },
  { label: "Inactive", value: false },
];

export const CATEGORY_ACTION_OPTIONS = [
  { label: "Edit", value: "edit" },
  { label: "Delete", value: "delete" },
];

export const CATEGORY_STATUS_OPTIONS = [
  { label: "Active", value: true },
  { label: "Inactive", value: false },
];

export const FAQ_ACTION_OPTIONS = [
  { label: "Edit", value: "edit" },
  { label: "Delete", value: "delete" },
];

export const FAQ_STATUS_OPTIONS = [
  { label: "Active", value: true },
  { label: "Inactive", value: false },
];

export const FAQ_TYPE_OPTIONS = [
  { label: "User", value: "user" },
  { label: "Admin", value: "admin" },
];

export const USER_ACTION_OPTIONS = (item) => [
  { label: "View Details", value: "viewDetails" },
  { label: "Status", value: "status" },
  ...(item === "pending" ? [{ label: "Accept", value: "accept" },{ label: "Reject", value: "reject" }] : []),
 
];

export const USER_STATUS_OPTIONS = [
  { label: "All", value: "all" },
  { label: "Active", value: true },
  { label: "Deactive", value: false },
];

export const COACH_STATUS_OPTIONS = [
  { label: "All", value: "all" },
  { label: "Approved", value: "approved" },
  { label: "Pending", value: "pending" },
  { label: "Rejected", value: "rejected" },
];
export const COACH_ACTION_OPTIONS = [
  { label: "View Details", value: "viewDetails" },
  { label: "Status", value: "status" },
];


export const SPORTS_OPTIONS = [
  { label: "All", value: "all" },
  { label: "Cricket", value: "cricket" },
  { label: "Football", value: "football" },
  { label: "Tennis", value: "tennis" },
  { label: "Basketball", value: "basketball" },
];

export const COACH_RATING_OPTIONS = [
  { label: "All", value: "all" },
  { label: "⭐", value: 1 },
  { label: "⭐⭐", value: 2 },
  { label: "⭐⭐⭐", value: 3 },
  { label: "⭐⭐⭐⭐", value: 4 },
  { label: "⭐⭐⭐⭐⭐", value: 5 },
];
export const CATEGORY_FILTER_OPTIONS = [
  { label: "All", value: "all" },
  { label: "Sport", value: "sport" },
  { label: "Feed", value: "feed" },
];
export const TRANSACTION_STATUS_OPTIONS = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Sent", value: "sent" },
  { label: "Received", value: "received" },
];
