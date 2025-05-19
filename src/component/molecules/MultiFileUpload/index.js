"use client";
import LottieLoader from "@/component/atoms/LottieLoader/LottieLoader";
import RenderToast from "@/component/atoms/RenderToast";
import {
  getMediaType,
  getSupportedImageTypes,
} from "@/resources/utils/mediaUpload";
import Image from "next/image";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { BsFillPlusSquareFill } from "react-icons/bs";
import { FaFileContract } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";
import classes from "./MultiFileUpload.module.css";
import { MdOutlineCloudDone } from "react-icons/md";
import { MediaUrl } from "@/resources/utils/helper";

const MultiFileUpload = ({
  label,
  uploadText = "Upload File",
  customTextClass,
  fileSize,
  supportedFiles = "File formats pdf and Word Doc",
  uploadImage,
  files,
  uploadIcon,
  setFiles,
  errorText,
  disable = false,
  extraStyles = {},
  acceptedFiles = getSupportedImageTypes("all"),
  removeFileCb,
  maxFileCount = 5,
  Delete,
}) => {
  const [isDeleteApiCalling, setIsDeleteApiCalling] = useState(false);
  let containerStyleObject = {
    ...(errorText && { border: "1px solid red" }),
    ...extraStyles,
  };

  console.log("files", files);
  // onDrop
  const onDrop = (_acceptedFiles) => {
    // validate
    if (_acceptedFiles.length > maxFileCount) {
      return RenderToast({
        message: `You can upload maximum ${maxFileCount} file${
          maxFileCount > 1 ? "s" : ""
        } at a time`,
        type: "error",
      });
    }

    setFiles([...files, ..._acceptedFiles]);
  };

  // removeFile
  const removeFile = async (key) => {
    setIsDeleteApiCalling(true);
    const response = await Delete({
      route: `users/delete/${key}`,
    });
    if (response) {
      removeFileCb(key);
      RenderToast({ type: "success", message: "File deleted successfully" });
    }
    setIsDeleteApiCalling(false);
  };

  const renderFileComponent = (file) => {
    console.log("file", file);
    const isFileObject = typeof file === "object";
    const fileType = getMediaType(
      isFileObject ? file?.type : file?.split(".").pop()
    );
    console.log("fileType", fileType);
    if (["images", "photos"].includes(fileType)) {
      console.log("not enter");
      return (
        <div className={classes?.imageContainer}>
          <img
            src={isFileObject ? URL.createObjectURL(file) : MediaUrl(file)}
            alt={file.name || "Image"}
          />
        </div>
      );
    }
    // else if (fileType === "video") {
    //   console.log("else if ")
    //   return (
    //     <ReactPlayer url={URL.createObjectURL(file)} playing={false} controls />
    //   );
    // }
    else {
      return (
        <div className={classes.filePreview}>
          <span className={classes.previewIcon}>
            <FaFileContract
              title="View File"
              size={35}
              color="var(--secondary-text)"
              onClick={() =>
                // window.open(
                //   isFileObject ? URL.createObjectURL(file) : MediaUrl(file),
                //   "_blank"
                // )
                window.open(MediaUrl(file), "_blank")
              }
            />
          </span>
        </div>
      );
      // } else {
      //   return (
      //     <div className={classes.filePreview}>
      //       <p className={classes?.previewIcon}>{file.name}</p>
      //     </div>
      //   );
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: acceptedFiles,
    multiple: true,
    maxFiles: 5,
    onDropRejected: (files) => {
      if (files?.length > maxFileCount) {
        return RenderToast({
          message: `You can upload maximum ${maxFileCount} file${
            maxFileCount > 1 ? "s" : ""
          } at a time`,
          type: "error",
        });
      }
    },
  });

  return (
    <>
      {label && <p className={`fs-13 mt-3 ${classes.labelStyle}`}>{label}</p>}

      {files && (
        <div className={classes.filePreviewList}>
          {files?.map((file, index) => {
            return (
              <div key={index}>
                <div  className={classes.fileItem}>
                  <span
                    className={classes.removeFile}
                    onClick={() => removeFile(file?.key || "")}
                  >
                    <IoCloseOutline color="var(--white)" size={22} />
                  </span>
                  {renderFileComponent(file)}
                </div>
                <div>{file.fileName.slice(-14)}</div>
              </div>
            );
          })}
          <div
            className={`${classes.fileInputDiv} ${
              disable && classes?.disabledFile
            } ${files.length === 2 && classes?.hidden} `}
            style={{
              ...(containerStyleObject && { ...containerStyleObject }),
            }}
          >
            <div {...getRootProps({ className: "dropzone" })}>
              <input disabled={disable} {...getInputProps()} />
              <div className={classes.fileDesc}>
                {uploadIcon ? uploadIcon : <MdOutlineCloudDone size={25} />}
                <p className={`${customTextClass} ${classes.text}`}>
                  {uploadText}
                </p>
                <BsFillPlusSquareFill color="var(--primary-bg)" size={20} />
                {fileSize ||
                  (supportedFiles && (
                    <div>
                      <p className={classes.desc}>{fileSize}</p>
                      {/* <p className={classes.desc}>{supportedFiles}</p> */}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {errorText && <p className={`${classes.error}`}>{errorText}</p>}

      {isDeleteApiCalling && <LottieLoader />}
    </>
  );
};

export default MultiFileUpload;
