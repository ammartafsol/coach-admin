import {
  RenderTextCell,
  RenderImageCell,
  RenderDateCell,
  RenderStatusCell,
  RenderUserDataCell,
  RenderNumberCell,
  RenderSportsCell,
  RenderTextNumber,
} from "@/component/organisms/AppTable/CommonCells";
import { getFormattedParams, mediaUrl } from "@/resources/utils/helper";
import { AiTwotoneEdit } from "react-icons/ai";

export const tableHeaders = [
  {
    title: "Coach Name",
    key: "coachName",
    style: { width: "20%" },
    renderValue: (cellValue, rowItem) => (
      <RenderUserDataCell
        fullName={rowItem?.coachName}
        photo={rowItem?.photo}
        slug={rowItem?.slug}
      />
    ),
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
    title: "Country",
    key: "city",
    style: { width: "12%" },
    renderValue: (cellValue) => <RenderTextCell {...{ cellValue }} />,
  },
  {
    title: "Total Subscriber",
    key: "totalSubscriber",
    style: { width: "15%" },
    renderValue: (cellValue) => <RenderNumberCell {...{ cellValue }} />,
  },
];

export const tableUserHeaders = [
  {
    title: "Username",
    key: "fullName",
    style: { width: "15%" },
    renderValue: (_, rowData) => (
      <RenderUserDataCell fullName={rowData.fullName} photo={rowData.photo} />
    ),
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
    title: "Subscribed Coach",
    key: "coaches",
    style: { width: "10%" },
    renderValue: (cellValue, rowItem) => {
      const coachesCount = rowItem?.coaches?.length || 0;
      return <RenderNumberCell cellValue={coachesCount} />;
    },
  },
  {
    title: "Location",
    key: "country",
    style: { width: "15%" },
    renderValue: (cellValue) => <RenderTextCell {...{ cellValue }} />,
  },

  {
    title: "Status",
    key: "isBlockedByAdmin",
    style: { width: "10%" },
    renderValue: (cellValue) => <RenderStatusCell {...{ cellValue }} />,
  },
  { title: "", key: "action", width: "15%" },
];

export const tableHeadersData = [
  {
    title: "Coach Name",
    key: "fullName",
    style: { width: "15%" },
    renderValue: (_, rowData) => (
      <RenderUserDataCell
        fullName={rowData.fullName}
        photo={mediaUrl(rowData.photo)}
      />
    ),
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
    title: "Country",
    key: "country",
    style: { width: "10%" },
    renderValue: (cellValue) => <RenderTextCell {...{ cellValue }} justifyCenter />,
  },
  {
    title: "Sports",
    key: "categories",
    style: { width: "10%" },

    renderValue: (cellValue) => <RenderSportsCell {...{ cellValue }} />,
  },
  {
    title: "Account Status",
    key: "status",
    style: { width: "12%" },
    renderValue: (cellValue) => <RenderStatusCell {...{ cellValue }} justifyCenter/>,
  },
  {
    title: "Access",
    key: "isBlockedByAdmin",
    style: { width: "10%" },
    renderValue: (cellValue) => <RenderStatusCell {...{ cellValue }} />,
  },
    {
    title: "Total Subscriber",
    key: "noOfSubscribers",
    style: { width: "15%" },
    renderValue: (cellValue) => <RenderNumberCell {...{ cellValue }} justifyCenter/>,
  },
  { title: "", key: "action", width: "5%" },
];


export const tableHeadersCommissiosData = [
  {
    title: "Coach Name",
    key: "fullName",
    style: { width: "20%" },
    renderValue: (cellValue) => <RenderTextCell {...{ cellValue }} />,
  },
  {
    title: "Email",
    key: "email",
    style: { width: "25%" },
    renderValue: (cellValue) => <RenderTextCell {...{ cellValue }} />,
  },
  {
    title: "Current Commission",
    key: "coachCommission",
    style: { width: "15%" },
    renderValue: (cellValue) => <RenderNumberCell {...{ cellValue }} justifyCenter/>,
  },
  {
    title: "Total Earning",
    key: "totalTransactionAmount",
    style: { width: "15%" },
    renderValue: (cellValue) => <RenderNumberCell {...{ cellValue }} justifyCenter/>,
  },
    {
    title: "Last Updated On",
    key: "createdAt",
    style: { width: "20%" },
    renderValue: (cellValue) => <RenderDateCell {...{ cellValue }} justifyCenter/>,
  },
  { title: "", key: "action", width: "5%" },
];

export const coachtableHeaders = [
  {
    title: "User Name",
    key: "fullName",
    style: { width: "15%" },
    renderValue: (cellValue, rowItem) => (
      <RenderUserDataCell
        fullName={rowItem?.subscriber?.fullName}
        photo={rowItem?.subscriber?.photo}
      />
    ),
  },
  {
    title: "Email",
    key: "",
    style: { width: "15%" },
    renderValue: (cellValue, rowItem) => (
      <RenderTextCell cellValue={rowItem?.subscriber?.email} />
    ),
  },
  {
    title: "Number",
    key: "phoneNumber",
    style: { width: "15%" },
    renderValue: (cellValue, rowItem) => (
      <RenderTextCell cellValue={rowItem?.subscriber?.phoneNumber} />
    ),
  },
  {
    title: "Date",
    key: "date",
    style: { width: "10%" },
    renderValue: (cellValue, rowItem) => (
      <RenderDateCell cellValue={rowItem?.subscriber?.createdAt} />
    ),
  },
  {
    title: "Status",
    key: "status",
    style: { width: "15%" },
    renderValue: (cellValue) => <RenderStatusCell {...{ cellValue }} />,
  },
  {
    title: "Location",
    key: "location",
    style: { width: "15%" },
    renderValue: (cellValue, rowItem) => (
      <RenderTextCell cellValue={rowItem?.subscriber?.country} />
    ),
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
  {
    title: "Category Image",
    key: "image",
    width: "15%",
    renderValue: (cellValue) => <RenderImageCell {...{ cellValue }} />,
  },
  {
    title: "Last Updated",
    key: "updatedAt",
    width: "15%",
    renderValue: (cellValue) => <RenderDateCell {...{ cellValue }} />,
  },
  {
    title: "Status",
    key: "isActive",
    width: "15%",
    renderValue: (cellValue) => (
      <RenderStatusCell {...{ cellValue, checkAsItIs: true }} />
    ),
  },
  { title: "", key: "action", width: "15%" },
];

export const faqTableHeaders = [
  {
    title: "Question",
    key: "title",
    style: { width: "25%" },
    renderValue: (cellValue) => <RenderTextCell {...{ cellValue }} />,
  },
  {
    title: "Answer",
    key: "description",
    style: { width: "30%" },
    renderValue: (cellValue) => <RenderTextCell {...{ cellValue }} />,
  },
  {
    title: "Order",
    key: "order",
    style: { width: "10%" },
    renderValue: (cellValue) => <RenderTextNumber {...{ cellValue }} />,
  },
  {
    title: "Last Updated",
    key: "updatedAt",
    width: "15%",
    renderValue: (cellValue) => <RenderDateCell {...{ cellValue }} />,
  },
  {
    title: "Status",
    key: "isActive",
    width: "10%",
    renderValue: (cellValue) => (
      <RenderStatusCell {...{ cellValue, checkAsItIs: true }} />
    ),
  },
  { title: "", key: "action", width: "10%" },
];

export const CmsTableHeader = [
  {
    title: "S.No",
    key: "sno",
    style: { width: "10%" },
  },
  {
    title: "Name",
    key: "pageName",
    style: { width: "50%", textTransform: "capitalize" },
    renderValue: (cellValue, rowItem) =>
      getFormattedParams(rowItem.pageName) || "-",
  },
  {
    title: "Actions",
    key: "action",
    style: { width: "20%" },
  },
];
