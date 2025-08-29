"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { FiFileText, FiImage, FiType, FiVideo } from "react-icons/fi";
import { MdAdd, MdDelete, MdRefresh, MdSave } from "react-icons/md";
import classes from "./CMSDetailTemplate.module.css";
import Button from "@/component/atoms/Button";
import { TextArea } from "@/component/atoms/TextArea/TextArea";
import { Input } from "@/component/atoms/Input";
import {
  getFormattedParams,
  getObjectDepth,
  postVideoToS3,
  returnKeyEmptyAsPerType,
  unWantedKeys,
} from "@/resources/utils/helper";
import LottieLoader from "@/component/atoms/LottieLoader/LottieLoader";
import RenderToast from "@/component/atoms/RenderToast";
import useAxios from "@/interceptor/axiosInterceptor";
import UploadImageBox from "@/component/atoms/UploadImagebox";
import CMSQuill from "@/component/atoms/CMSQuill";
import FileUpload from "@/component/atoms/FileUpload/FileUpload";

const imageFields = [
  "icon",
  "photo",
  "image",
  "image2",
  "images",
  "thumbnail",
  "logo",
  "partners",
];
const descriptionFields = ["description"];
const htmlDescription = ["htmlDescription", "content"];
const videoFields = ["video", "videos", "videoUrl", "key"];

const CMSDetailTemplate = ({ pageName }) => {
  const { Get, Post, Patch, Delete } = useAxios();
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState("");
  const [originalObjectDepth, setOriginalObjectDepth] = useState(0);
  const [videoProgress, setVideoProgress] = useState(0);
  const [hasChanges, setHasChanges] = useState(false);

  const hideActions = ["header"].includes(pageName?.toLowerCase());

  useEffect(() => {
    const fetchPageData = async () => {
      setLoading("initial");
      const { response } = await Get({ route: `cms/page/admin/${pageName}` });
      if (response) {
        const resData = structuredClone(response?.data);
        console.log("resData858", resData);
        setPageData(resData);
        setOriginalObjectDepth(getObjectDepth(resData));
        setHasChanges(false);
      }
      setLoading("");
    };
    fetchPageData();
  }, [pageName]);

  const handleSubmit = async () => {
    const dataToSend =
      originalObjectDepth === 1 ? pageData[Object.keys(pageData)[0]] : pageData;
    setLoading("submit");

    const { response } = await Patch({
      route: `cms/page/update/${pageName}`,
      data: dataToSend,
    });
    setLoading("");
    if (response) {
      RenderToast({ message: "Data saved successfully", type: "success" });
      setHasChanges(false);
    }
  };

  const getFieldIcon = (key) => {
    if (imageFields.includes(key)) {
      return key === "video" ? <FiVideo size={20} /> : <FiImage size={20} />;
    }
    if (htmlDescription.includes(key)) {
      return <FiFileText size={20} />;
    }
    return <FiType size={20} />;
  };

  const renderField = (value, path, key, onChange) => {
    const Component = getInputComponent(key);
    const isImageField = imageFields.includes(key);
    const isVideoField = videoFields.includes(key);

    return (
      <div className={classes.fieldContainer} key={path}>
        <div className={classes.fieldHeader}>
          {getFieldIcon(key)}
          <span className={classes.fieldLabel}>
            {key === "arr" ? "Data" : getFormattedParams(key)}
          </span>
        </div>
        <Component
          label={key === "arr" ? "" : getFormattedParams(key)}
          placeholder={`Enter ${key === "arr" ? "Data" : key}`}
          value={value}
          state={value}
          files={[value]}
          loading={loading === "image"}
          {...(isVideoField
            ? {
                onFilesChange: async (files) => {
                  if (files && files.length > 0) {
                    setLoading("image");

                    // Delete old media if it exists
                    if (value) {
                      await Delete({ route: `cms/delete/media/${value}` });
                    }

                    // Handle video upload
                    const { response: presignedRes } = await Post({
                      route: "media/upload",
                      data: { videoCount: 1 },
                    });

                    console.log("presignedRes858", presignedRes);

                    await postVideoToS3({
                      video: files[0],
                      url:
                        presignedRes?.data?.urls?.[0] ||
                        presignedRes?.data?.data?.urls?.[0],
                      setVideoProgress,
                    });

                    setLoading("");
                    const videoKey =
                      presignedRes?.data?.keys?.[0] ||
                      presignedRes?.data?.data?.keys?.[0];

                    onChange(videoKey);
                    setHasChanges(true);
                  }
                },
                onDelete: async () => {
                  if (value) {
                    await Delete({ route: `cms/delete/media/${value}` });
                    onChange("");
                    setHasChanges(true);
                  }
                },
                acceptedTypes: "video/*",
                fileTypes: "MP4, MOV, AVI up to 100MB",
              }
            : isImageField
            ? {
                setter: async (newValue) => {
                  if (imageFields?.includes(key)) {
                    setLoading("image");

                    // Delete old media if it exists
                    if (value) {
                      await Delete({ route: `cms/delete/media/${value}` });
                    }

                    // Handle image upload
                    const formData = new FormData();
                    formData.append("image", newValue);

                    const { response } = await Post({
                      route: "media/upload",
                      data: formData,
                      isFormData: true,
                    });

                    console.log("response858", response);

                    setLoading("");

                    const imageUrl = response?.data?.image[0]?.key;

                    onChange(imageUrl);
                  } else {
                    onChange(newValue);
                  }
                  setHasChanges(true);
                },
              }
            : {
                ...(descriptionFields.includes(key)
                  ? {
                      setter: (newValue) => {
                        onChange(newValue);
                        setHasChanges(true);
                      },
                    }
                  : {
                      setValue: (newValue) => {
                        onChange(newValue);
                        setHasChanges(true);
                      },
                    }),
              })}
        />
      </div>
    );
  };

  const renderObject = (obj, path, updateFunc) => {
    return Object.entries(obj).map(([key, val]) => {
      if (unWantedKeys.includes(key)) return null;

      if (key === "category") return null;

      const currentPath = `${path}.${key}`;

      if (Array.isArray(val)) {
        return (
          <div className={classes.contentSection} key={currentPath}>
            <div className={classes.sectionHeader}>
              <h6 className={classes.sectionTitle}>
                {getFormattedParams(key)}
              </h6>
              {!hideActions && val.length > 1 && (
                <Button
                  label="Add More"
                  leftIcon={<MdAdd size={16} />}
                  className={classes.addMoreButton}
                  onClick={() => {
                    updateFunc((prev) => {
                      let newItem;
                      if (val.length > 0) {
                        newItem = returnKeyEmptyAsPerType(val[0]);
                        if (
                          newItem &&
                          typeof newItem === "object" &&
                          newItem._id
                        ) {
                          delete newItem._id;
                        }
                      } else {
                        newItem = "";
                      }
                      return setDeepValue(prev, currentPath, [...val, newItem]);
                    });
                    setHasChanges(true);
                  }}
                />
              )}
            </div>

            {val.length === 0 ? (
              <div className={classes.emptyState}>
                <div className={classes.emptyStateIcon}>📝</div>
                <div className={classes.emptyStateText}>No items yet</div>
                <div className={classes.emptyStateSubtext}>
                  Click "Add More" to create your first item
                </div>
              </div>
            ) : (
              val?.map((item, index) => (
                <div
                  className={classes.arrayItem}
                  key={`${currentPath}.${index}`}
                >
                  <div className={classes.arrayItemHeader}>
                    <div className={classes.arrayItemIndex}>{index + 1}</div>
                    <div className={classes.arrayItemTitle}>
                      {getFormattedParams(key)} #{index + 1}
                    </div>
                    <div className={classes.arrayItemActions}>
                      {!hideActions && val?.length > 0 && (
                        <Button
                          leftIcon={<MdDelete size={16} />}
                          variant="secondary"
                          className={classes.deleteButton}
                          onClick={() => {
                            updateFunc((prev) => {
                              const updatedArr = val.filter(
                                (_, i) => i !== index
                              );

                              const newState = setDeepValue(
                                prev,
                                currentPath,
                                updatedArr
                              );

                              return newState;
                            });
                            setHasChanges(true);
                          }}
                        />
                      )}
                    </div>
                  </div>

                  {(item?.category?.name || item?.subCategory?.name) && (
                    <div className={classes.categoryTitle}>
                      {item?.category?.name || item?.subCategory?.name}
                    </div>
                  )}

                  {typeof item === "object" && item !== null
                    ? renderObject(item, `${currentPath}.${index}`, updateFunc)
                    : renderField(
                        item,
                        `${currentPath}.${index}`,
                        key,
                        (newValue) => {
                          updateFunc((prev) =>
                            setDeepValue(
                              prev,
                              `${currentPath}.${index}`,
                              newValue
                            )
                          );
                          setHasChanges(true);
                        }
                      )}
                </div>
              ))
            )}
          </div>
        );
      } else if (typeof val === "object" && val !== null) {
        return renderObject(val, currentPath, updateFunc);
      }

      return renderField(val, currentPath, key, (newValue) => {
        updateFunc((prev) => setDeepValue(prev, currentPath, newValue));
        setHasChanges(true);
      });
    });
  };

  if (loading === "initial") {
    return (
      <div className={classes.loadingOverlay}>
        <div className={classes.loadingCard}>
          <LottieLoader />
          <div className={classes.loadingTitle}>Loading page content...</div>
        </div>
      </div>
    );
  }

  return (
    <Container className={classes.main}>
      <div className={classes.pageHeader}>
        <h1 className={classes.pageTitle}>{getFormattedParams(pageName)}</h1>
        <p className={classes.pageSubtitle}>
          Manage and edit your page content with ease
        </p>
      </div>

      <div className={clsx(classes.contentSection, classes.fadeIn)}>
        {pageData && renderObject(pageData, "", setPageData)}
      </div>

      {loading === "image" && (
        <div className={classes.loadingOverlay}>
          <div className={classes.loadingCard}>
            <LottieLoader />
            <div className={classes.loadingTitle}>
              {videoProgress > 0
                ? `Uploading Video ${videoProgress}%`
                : "Uploading media..."}
            </div>
            {videoProgress > 0 && (
              <div className={classes.loadingProgress}>
                <div
                  className={classes.loadingProgressBar}
                  style={{ width: `${videoProgress}%` }}
                />
              </div>
            )}
          </div>
        </div>
      )}

      <div className={classes.actionBar}>
        <Button
          variant="secondary"
          label={loading === "submit" ? "Saving..." : "Save Changes"}
          leftIcon={
            loading === "submit" ? (
              <MdRefresh size={18} />
            ) : (
              <MdSave size={18} />
            )
          }
          onClick={handleSubmit}
          disabled={loading || !hasChanges}
          className={classes.saveButton}
        />

        {hasChanges && (
          <div className={classes.changesIndicator}>
            <span>⚠️ You have unsaved changes</span>
          </div>
        )}
      </div>
    </Container>
  );
};

export default CMSDetailTemplate;

function getInputComponent(key) {
  if (htmlDescription.includes(key)) return CMSQuill;
  if (descriptionFields.includes(key)) return TextArea;
  if (videoFields.includes(key)) return FileUpload;
  if (imageFields.includes(key)) return UploadImageBox;
  return Input;
}

function setDeepValue(obj, path, value) {
  const keys = path.split(".").filter(Boolean);
  const newObj = structuredClone(obj);
  let curr = newObj;

  keys.forEach((key, idx) => {
    if (idx === keys.length - 1) {
      curr[key] = value;
    } else {
      if (!isNaN(key)) {
        if (!Array.isArray(curr)) {
          curr = [];
        }
        if (!curr[key]) {
          curr[key] = {};
        }
      } else {
        if (!curr[key]) {
          curr[key] = {};
        }
      }
      curr = curr[key];
    }
  });

  return newObj;
}
