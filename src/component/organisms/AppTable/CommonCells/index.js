import moment from "moment";
import classes from "./CommonCells.module.css";
import { capitalizeFirstLetter, mergeClass } from "@/resources/utils/helper";
import Image from "next/image";
import { mediaUrl } from "@/resources/utils/helper";
import clsx from "clsx";
import { GoDotFill } from "react-icons/go";
import Rating from "@mui/material/Rating";
import { useRouter } from "next/navigation";

const statusClassMap = {
  true: "statusFalse",
  false: "statusTrue",
  approved: "statusApproved",
  pending: "statusPending",
  rejected: "statusRejected",
  paid: "statusPaid",
  unpaid: "statusUnpaid",
  active: "statusTrue",
  canceled: "statusFalse",
};

export const RenderTextCell = ({ cellValue: item , rowItem}) => {
  return (
    <span className={mergeClass("maxLine1 t-t-c")}>
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

export const RenderImageCell = ({ cellValue }) => {
  const imageSrc = mediaUrl(cellValue);

  return imageSrc ? (
    <Image
      src={imageSrc}
      alt="Category"
      width={50}
      height={50}
      objectFit="contain"
      className={classes.image}
    />
  ) : (
    <span className="text-muted">No Image</span>
  );
};


export const RenderStatusCell = ({ cellValue: item, checkAsItIs = false }) => {
  const isBoolean = typeof item === "boolean";
  const displayValue = isBoolean ? checkAsItIs ? (item ? "Active" : "Inactive") : (!item ? "Active" : "Inactive") : item;

  let normalized = String(item).toLowerCase();
  if (normalized === "paid leaves") {
    normalized = "paid"; 
  } else if (normalized === "unpaid") {
    normalized = "unpaid"; 
  }

  const statusClass = checkAsItIs ? item ? 'statusTrue' : 'statusFalse' : statusClassMap[normalized];

  const shouldShowDot =
    normalized !== "paid" &&
    normalized !== "unpaid" 

    return (
      <span
        className={clsx(
          classes.status,
          "fs-14 fw-500 lh-18 text-capitalize",
          statusClass && classes[statusClass]
        )}
      >
        {shouldShowDot && (
          <GoDotFill className={clsx(classes.dotIcon, classes[`${statusClass}Icon`])} />
        )}
        <span className={clsx(classes.text, classes[`${statusClass}Text`])}>
          {displayValue}
        </span>
      </span>
    );
};


export const RenderUserDataCell = ({ fullName, photo, slug = "" }) => {
  const router = useRouter();
  const defaultAvatar = "/images/app-images/user-avatars.png";
  if (!fullName && ! photo) return null;

  const resolvedImage = photo ? mediaUrl(photo) : defaultAvatar;

  return (
    <div className={mergeClass(classes.userDataCell, slug && classes.pointer)} onClick={() => {slug && router.push(`/coach/${slug}`)}}>
      <div className={classes.avatarDiv}>
        <Image
          src={resolvedImage}
          alt={fullName || "User"}
          width={30}
          height={30}
          objectFit="contain"
          className={classes.userAvatar}
        />
      </div>
      <div className={classes.userInfo}>
        <div className={classes.userName}>{fullName}</div>
      </div>
    </div>
  );
};

export const RenderNumberCell = ({ cellValue }) => {
  if (cellValue === null || cellValue === undefined) return "-";

  return (
    <div className={classes.numberCell}>
      {Number(cellValue).toLocaleString()} {/* adds comma separators */}
    </div>
  );
};


export const RenderRatingCell = ({ cellValue }) => {
  return (
    <div className={classes.ratingCell}>
      <Rating
        value={Number(cellValue) || 0}
        readOnly
        precision={1}
        size="medium"
        sx={{
          color: "var(--slate-950)",
          fontSize: 24,
          "& .MuiRating-iconEmpty": {
            color: "var(--slate-950)", 
          },
        }}
      />
    </div>
  );
};

export const RenderSportsCell = ({ cellValue: item }) => {
  if (!Array.isArray(item) || item.length === 0) {
    return "-";
  }

  const firstSportName = item[0]?.name ?? "-";
  const extraCount = item.length - 1;

  return (
    <div className={classes.sportsCell}>
      <span className={classes.sportLabel}>{firstSportName}</span>
      {extraCount > 0 && (
        <span className={classes.countBadge}>+{extraCount}</span>
      )}
    </div>
  );
};


