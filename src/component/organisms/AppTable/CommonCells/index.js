import moment from "moment";
import classes from "./CommonCells.module.css";
import { capitalizeFirstLetter, mergeClass } from "@/resources/utils/helper";

export const RenderTextCell = ({ cellValue: item }) => {
  return (
    <span className={mergeClass("maxLine2 t-t-c")}>
      {item ? capitalizeFirstLetter(item) : "-"}
    </span>
  );
};

export const RenderCategoryCell = ({ cellValue: { item } }) => {
  return (
    <span title={item} className={mergeClass("maxLine2 t-t-c")}>
      {item ? capitalizeFirstLetter(item) : "-"}
    </span>
  );
};

export const RenderDateCell = ({ cellValue: item }) => {
  return (
    <span className={mergeClass(classes?.date, "text-dark")}>
      {moment(item).format("ll")}
    </span>
  );
};

export const IconButton = ({ icon, onClick }) => {
  return (
    <div className={classes?.iconButton} onClick={onClick}>
      {icon}
    </div>
  );
};
