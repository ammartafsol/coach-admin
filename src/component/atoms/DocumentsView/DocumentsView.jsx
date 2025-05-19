import React from "react";
import classes from "./DocumentsView.module.css";
import { IoCloseOutline } from "react-icons/io5";
import { FaFileContract } from "react-icons/fa";

const DocumentsView = () => {
  return (
    <div className={classes?.fileItem}>
      <div className={classes.filePreview}>
        <span className={classes.previewIcon}>
          <FaFileContract
            size={35}
            color="var(--secondary-text)"
          />
        </span>
      </div>
    </div>
  );
};

export default DocumentsView;
