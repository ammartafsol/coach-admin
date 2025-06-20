import moment from "moment";
import classes from "./CommonCells.module.css";
import { capitalizeFirstLetter, mergeClass } from "@/resources/utils/helper";
import Image from "next/image";
import { mediaUrl } from "@/resources/utils/helper";

export const RenderTextCell = ({ cellValue: item }) => {
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

export const RenderStatusCell = ({ cellValue }) => {
  const isBoolean = typeof cellValue === "boolean";
  const displayValue = isBoolean ? (cellValue ? "Active" : "Inactive") : String(cellValue);

  return (
    <span className="fs-12 fw-500 lh-18 text-capitalize">
      {displayValue}
    </span>
  );
};
// export const RenderUserDataCell = ({ cellValue }) => {
//   if (!cellValue) return null;
//   const { name, avatar, id } = cellValue;
//   return (
//     <div className={classes.userDataCell}>
//       <div className={classes.avatarDiv}>
//         <img src={avatar} alt={name} className={classes.userAvatar} />
//       </div>
//       <div className={classes.userInfo}>
//         <div className={classes.userName}>{name}</div>
//         <div className={classes.userId}>{id}</div>
//       </div>
//     </div>
//   );
// };


export const RenderUserDataCell = ({ fullName, photo }) => {
  const defaultAvatar = "/images/app-images/user-avatar.png";
  if (!fullName && ! photo) return null;

  const resolvedImage = photo ? mediaUrl(photo) : defaultAvatar;

  return (
    <div className={classes.userDataCell}>
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

