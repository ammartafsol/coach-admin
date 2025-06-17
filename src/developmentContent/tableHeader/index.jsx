import { RenderTextCell } from "@/component/organisms/AppTable/CommonCells";

export const tableHeaders = [
  {
    title: "Coach Name",
    key: "coachName",
    style: { width: "20%" },
  },
  {
    title: "Email",
    key: "email",
    style: { width: "23%" },
    renderValue: (cellValue) => <RenderTextCell {...{ cellValue }} />,
  },
  {
    title: "Phone Number",
    key: "phoneNumber",
    style: { width: "20%" },
    renderValue: (cellValue) => <RenderTextCell {...{ cellValue }} />,
  },
  {
    title: "City",
    key: "city",
    style: { width: "12%" },
    renderValue: (cellValue) => <RenderTextCell {...{ cellValue }} />,
  },
  {
    title: "Total Subscriber",
    key: "totalSubscriber",
    style: { width: "15%" },
    renderValue: (cellValue) => <RenderTextCell {...{ cellValue }} />,
  },
  { title: "", key: "action", width: "10%" },
];

export const tableUserHeaders = [
  {
    title: "Username",
    key: "username",
    style: { width: "15%" },
  },
  {
    title: "Email",
    key: "email",
    style: { width: "20%" },
    renderValue: (cellValue) => <RenderTextCell {...{ cellValue }} />,
  },
  {
    title: "Number",
    key: "phoneNumber",
    style: { width: "20%" },
    renderValue: (cellValue) => <RenderTextCell {...{ cellValue }} />,
  },
  {
    title: "Subscriber",
    key: "subscriber",
    style: { width: "10%" },
    renderValue: (cellValue) => <RenderTextCell {...{ cellValue }} />,
  },
  {
    title: "Location",
    key: "location",
    style: { width: "20%" },
    renderValue: (cellValue) => <RenderTextCell {...{ cellValue }} />,
  },
  { title: "", key: "action", width: "15%" },
];

export const tableHeadersData = [
  {
    title: "Coach Name",
    key: "coachName",
    style: { width: "15%" },
  },
  {
    title: "Email",
    key: "email",
    style: { width: "15%" },
    renderValue: (cellValue) => <RenderTextCell {...{ cellValue }} />,
  },
  {
    title: "Phone Number",
    key: "phoneNumber",
    style: { width: "15%" },
    renderValue: (cellValue) => <RenderTextCell {...{ cellValue }} />,
  },
  {
    title: "City",
    key: "city",
    style: { width: "10%" },
    renderValue: (cellValue) => <RenderTextCell {...{ cellValue }} />,
  },
  {
    title: "Sports",
    key: "sports",
    style: { width: "15%" },
  },
  {
    title: "Total Subscriber",
    key: "totalSubscriber",
    style: { width: "15%" },
    renderValue: (cellValue) => <RenderTextCell {...{ cellValue }} />,
  },
  { title: "", key: "action", width: "15%" },
];

export const coachtableHeaders = [
  {
    title: "User Name",
    key: "username",
    style: { width: "15%" },
  },
  {
    title: "Email",
    key: "email",
    style: { width: "15%" },
    renderValue: (cellValue) => <RenderTextCell {...{ cellValue }} />,
  },
  {
    title: "Number",
    key: "phoneNumber",
    style: { width: "15%" },
    renderValue: (cellValue) => <RenderTextCell {...{ cellValue }} />,
  },
  {
    title: "Date",
    key: "date",
    style: { width: "10%" },
    renderValue: (cellValue) => <RenderTextCell {...{ cellValue }} />,
  },
  {
    title: "Status",
    key: "status",
    style: { width: "15%" },
  },
  {
    title: "Location",
    key: "location",
    style: { width: "15%" },
  },
  { title: "", key: "action", width: "15%" },
];

export const categoryTableHeaders = [
  {
    title: "Category Name",
    key: "name",
    style: { width: "15%" },
    renderValue: (cellValue) => <RenderTextCell {...{ cellValue }} />,
  },
  {
    title: "Category Type",
    key: "type",
    style: { width: "15%" },
    renderValue: (cellValue) => <RenderTextCell {...{ cellValue }} />,
  },
  { title: "Category Image", key: "image", width: "15%" },
  { title: "Last Updated", key: "updatedAt", width: "15%" },

  { title: "Status", key: "action", width: "15%" },
];
