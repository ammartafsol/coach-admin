import Image from "next/image";
import { useRef } from "react";
import { MdClose, MdModeEdit, MdUpload } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import classes from "./UploadImageBox.module.css";
import { mediaUrl } from "@/resources/utils/helper";
import RenderToast from "@/component/atoms/RenderToast";
import { FiUploadCloud } from "react-icons/fi";
import clsx from "clsx";

function UploadImageBox({
  state,
  setter,
  label,
  edit = true,
  onDelete,
  onClose,
  isCloseable,
  hideDeleteIcon = false,
  imgClass,
  containerClass = "",
  onEdit,
  fallBackIcon,
  height,
  acceptedTypes = "*",
  uploadBoxStyle = {},
  imageStyle = {},
  loading = false,
}) {
  const inputRef = useRef(null);
  return (
    <>
      {label && <label className={classes.label}>{label}</label>}

      <div
        className={`${classes.box} ${containerClass}`}
        style={{
          height: height,
        }}
      >
        <div className={classes.uploadImageBox} style={uploadBoxStyle}>
          {/* Close Icon */}
          {isCloseable && (
            <span className={classes.closeIcon} onClick={onClose}>
              <MdClose />
            </span>
          )}
          {state?.name || typeof state == "string" ? (
            <div className={classes.imageUploaded}>
              <Image
                src={
                  typeof state == "object"
                    ? URL.createObjectURL(state)
                    : mediaUrl(state)
                }
                className={imgClass ? imgClass : ""}
                layout="fill"
                alt=""
                style={imageStyle}
              />
              <div className={classes.editAndDelete}>
                {edit && (
                  <>
                    {hideDeleteIcon && (
                      <div className={classes.icon} onClick={onDelete}>
                        <RiDeleteBinLine />
                      </div>
                    )}
                    <div
                      className={classes.icon}
                      onClick={() => {
                        if (!loading) {
                          inputRef.current.click();
                          if (onEdit) {
                            onEdit();
                          }
                        }
                      }}
                    >
                      {loading ? (
                        <div className={classes.loadingSpinner}></div>
                      ) : (
                        <MdModeEdit />
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className={classes.uploadBox}>
              {loading ? (
                <div className={classes.loadingSpinner}></div>
              ) : fallBackIcon ? (
                fallBackIcon
              ) : (
                <>
                  <div
                    className={classes.uploadIcon}
                    onClick={() => inputRef.current.click()}
                  >
                    <FiUploadCloud />
                  </div>
                  <div className={classes.textDiv}>
                    <span className={clsx("fs-12 fw-400", classes.imgDiv)}>
                      <h3 className="fs-12 fw-600 heading-color">
                        Click to upload an image
                      </h3>
                      or drag and drop
                    </span>
                    <p className="fs-12 fw-400">PNG , JPG , JPEG</p>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
        {/* Input For Image Upload */}
        <input
          hidden
          type={"file"}
          ref={inputRef}
          onChange={(e) => {
            const fileType = e.target.files[0].type;
            if (
              acceptedTypes === "*" ||
              fileType.match(
                acceptedTypes.replace(".", "\\.").replace(",", "|")
              )
            ) {
              setter(e.target.files[0]);
            } else {
              RenderToast({
                type: "warn",
                message: `Invalid file type.`,
              });
            }
          }}
        />
      </div>
    </>
  );
}

export default UploadImageBox;
