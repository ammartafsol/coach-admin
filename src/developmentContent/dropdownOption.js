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
  { label: "Blocked", value: true },
  { label: "Unblocked", value: false },
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
  { label: "1 +", value: 1 },
  { label: "2 +", value: 2 },
  { label: "3 +", value: 3 },
  { label: "4 +", value: 4 },
  { label: "5 +", value: 5 },
];
