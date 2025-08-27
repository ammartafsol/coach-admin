import React, { useEffect } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import classes from "./CMSQuill.module.css";
import useDebounce from "@/resources/hooks/useDebounce";

function CMSQuill({
  value,
  setValue,
  quillClass = "",
  placeholder = "",
  label,
  isLoading,
}) {
  const [v, setV] = React.useState(value);

  useEffect(() => {
    if (!isLoading) {
      setV(value);
    }
  }, [isLoading, value]);

  const d = useDebounce(v, 1000);
  useEffect(() => {
    if (d !== value) {
      setValue(d);
    }
  }, [d]);

  return (
    <>
      {label && <label className={classes.label}>{label}</label>}
      <div className={classes.CMSQuill}>
        <ReactQuill
          className={`${classes.quill} ${quillClass}`}
          placeholder={placeholder}
          value={v}
          onChange={(e) => setV(e)}
          modules={modules}
        />
      </div>
    </>
  );
}

export default CMSQuill;

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
    [
      {
        color: [
          "white",
          "black",
          "red",
          "blue",
          "skyblue",
          "teal",
          "brown",
          "green",
          "orange",
          "pink",
          "gray",
          "purple",
          "maroon",
          "yellow",
        ],
      },
    ],
  ],
};
