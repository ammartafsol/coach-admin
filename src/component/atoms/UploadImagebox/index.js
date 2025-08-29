import Image from "next/image";
import { useRef, useState } from "react";
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
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = (file) => {
    if (!file) return;

    const fileType = file.type;
    if (
      acceptedTypes === "*" ||
      fileType.match(acceptedTypes.replace(".", "\\.").replace(",", "|"))
    ) {
      setIsUploading(true);
      // Simulate upload delay - replace with actual upload logic
      setTimeout(() => {
        setter(file);
        setIsUploading(false);
      }, 1000);
    } else {
      RenderToast({
        type: "warn",
        message: `Invalid file type.`,
      });
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFileUpload(file);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    handleFileUpload(file);
  };

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
                        if (!loading && !isUploading) {
                          inputRef.current.click();
                          if (onEdit) {
                            onEdit();
                          }
                        }
                      }}
                    >
                      {loading || isUploading ? (
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
            <div
              className={`${classes.uploadBox} ${
                isDragOver ? classes.dragOver : ""
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {loading || isUploading ? (
                <div className={classes.uploadLoadingContainer}>
                  <div className={classes.loadingSpinner}></div>
                  <p className={classes.uploadingText}>Uploading image...</p>
                </div>
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
          onChange={handleFileInputChange}
          accept={acceptedTypes === "*" ? "image/*" : acceptedTypes}
        />
      </div>
    </>
  );
}

export default UploadImageBox;
