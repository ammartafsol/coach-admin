"use client";

import { useState, useRef } from "react";
import { MdModeEdit, MdDelete } from "react-icons/md";
import styles from "./FileUpload.module.css";
import { mediaUrl } from "@/resources/utils/helper";

export default function FileUpload({
  onFilesChange,
  acceptedTypes = "*",
  isLoading = false,
  uploadIcon,
  fileTypes = "PNG, JPG, GIF, MP4, PDF, DOC up to 10MB",
  state,
  onDelete,
  edit = true,
}) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      onFilesChange(files);
    }
    // Clear the file input to allow re-uploading the same file
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      onFilesChange(files);
    }
    // Clear the file input to allow re-uploading the same file
    e.target.value = "";
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div
      className={`${styles.fileUploadArea} ${
        isDragging ? styles.dragging : ""
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {state ? (
        <div className={styles.videoUploaded}>
          <video
            src={mediaUrl(state)}
            className={styles.videoPreview}
            controls
            muted
          />
          <div className={styles.editAndDelete}>
            {edit && (
              <>
                {onDelete && (
                  <div className={styles.icon} onClick={onDelete}>
                    <MdDelete />
                  </div>
                )}
                <div
                  className={styles.icon}
                  onClick={() => {
                    if (!isLoading) {
                      handleUploadClick();
                    }
                  }}
                >
                  {isLoading ? (
                    <div className={styles.loadingSpinner}></div>
                  ) : (
                    <MdModeEdit />
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        <div onClick={handleUploadClick}>
          <div className={styles.uploadIcon}>
            {uploadIcon ? (
              uploadIcon
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
            )}
          </div>
          {!isLoading ? (
            <p className={styles.uploadText}>
              <span className={styles.orangeColor}>Upload a file</span> or drag
              and drop
            </p>
          ) : (
            <p className={styles.orangeColor}>Uploading...</p>
          )}
          <p className={styles.fileTypes}>{fileTypes}</p>
        </div>
      )}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={acceptedTypes}
        className={styles.hiddenFileInput}
        multiple
      />
    </div>
  );
}
