import { ImSearch } from "react-icons/im";
import classes from "./noData.module.css";

function NoData({ text = "No Data Found", className ,iconColor }) {
  return (
    <div
      className={[classes.noDataContainer, className && className].join(" ")}
    >
      <ImSearch size={60}  color={iconColor || "var(--Black)"} />
      <p>{text}</p>
    </div>
  );
}

export default NoData;
