import { CiStar } from "react-icons/ci";
import { AiFillStar } from "react-icons/ai";

export const CATEGORY_TYPE_OPTIONS = [
  { label: "Sport", value: "sport" },
  // { label: "Feed", value: "feed" },
];

export const DURATION_OPTIONS = [
  { label: "1 week", value: 1 },
  { label: "2 week", value: 2 },
  { label: "3 week", value: 3 },
  { label: "4 week", value: 4 },
  { label: "5 week", value: 5 },
  { label: "6 week", value: 6 },
  { label: "7 week", value: 7 },
  { label: "8 week", value: 8 },
  { label: "9 week", value: 9 },
  { label: "10 week", value: 10 },
  { label: "11 week", value: 11 },
  { label: "12 week", value: 12 },
  { label: "13 week", value: 13 },
  { label: "14 week", value: 14 },
  { label: "15 week", value: 15 },
  { label: "16 week", value: 16 },
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
  { label: "Coach", value: "coach" },
];

export const USER_ACTION_OPTIONS = (item) => [
  { label: "View Details", value: "viewDetails" },
  { 
    label: "Status", 
    value: "status",
    disabled: item?.status === "pending"
  },
];

export const EDIT_COMMISSION_OPTIONS = (item) => [
  { label: "Edit", value: "edit" },
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
  // { label: "Rejected", value: "rejected" },
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

export const TRANSACTION_TYPE_OPTIONS = [
  { label: "Subscription", value: "subscription" },
  { label: "Withdrawal", value: "withdrawal" },
];

export const FEED_STATUS_OPTIONS = [
  { label: "All", value: "all" },
  { label: "Active", value: true },
  { label: "Inactive", value: false },
];

export const FEED_ARCHIVED_OPTIONS = [
  { label: "Unarchived", value: false },
  { label: "Archived", value: true },
];

export const SUBSCRIBER_STATUS_OPTIONS = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Canceled", value: "canceled" },
];

export const SORT_TYPE_OPTIONS = [
  { label: "Created Date", value: "createdAt" },
  { label: "Number of Subscribers", value: "noOfSubscribers" },
];

export const SORT_BY_OPTIONS = [
  { label: "Descending", value: "desc" },
  { label: "Ascending", value: "asc" },
];
