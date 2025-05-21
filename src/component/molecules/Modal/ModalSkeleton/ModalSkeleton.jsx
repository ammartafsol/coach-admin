"use client"
import { useEffect } from "react"
import classes from "./ModalSkeleton.module.css"

export default function ModalSkeleton({
  show,
  setShow,
  header,
  children,
  modalClass,
  headerStyles,
  width = "800px",
  headerClass,
  height,
  onBack,
}) {
  function handleClose() {
    setShow(false)
  }

  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [show])

  if (!show) return null

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center" onClick={handleClose}>
        <div
          className="bg-white rounded-lg max-h-[90vh] overflow-hidden"
          style={{ width: width }}
          onClick={(e) => e.stopPropagation()}
        >
          {header && (
            <div className={`${classes.header} ${headerClass || ""}`} style={{ ...headerStyles }}>
              {onBack && (
                <button onClick={onBack} className={classes.backButton}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M19 12H5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 19L5 12L12 5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              )}
              <h4 style={{ ...headerStyles }}>{header}</h4>
              <button onClick={handleClose} className="ml-auto text-gray-500 hover:text-gray-700">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6 6L18 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          )}
          <div
            className={`${classes.body} ${modalClass || ""} overflow-y-auto`}
            style={{ height: height || "auto", maxHeight: "calc(90vh - 80px)" }}
          >
            {children}
          </div>
        </div>
      </div>
    </>
  )
}
