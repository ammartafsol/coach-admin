import { RenderTextCell } from "@/component/organisms/AppTable/CommonCells";

export const tableHeaders = [
  {
    title: "Coach Name",
    key: "coachName",
    style: { width: "15%" },
    renderValue: (cellValue) => <RenderTextCell {...{ cellValue }} />,
  },
  {
    title: "Email",
    key: "email",
    style: { width: "20%" },
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
    style: { width: "10%" },
        renderValue: (cellValue) => <RenderTextCell {...{ cellValue }} />,
  },
  {
    title: "Total Subscriber",
    key: "totalSubscriber",
    style: { width: "20%" },
    renderValue: (cellValue) => <RenderTextCell {...{ cellValue }} />,
  },
  { title: "Action", key: "action",width:"15%", },
];
