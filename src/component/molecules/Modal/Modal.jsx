"use client"

import { useEffect, useState } from "react"
import { Modal as BootstrapModal } from "react-bootstrap"
import styles from "./Modal.module.css"

export default function Modal({ isOpen, onClose, children, customModalContent, heading }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      document.body.classList.add(styles.bodyWithModal)
    } else {
      document.body.classList.remove(styles.bodyWithModal)
      setTimeout(() => {
        setIsVisible(false)
      }, 300)
    }

    return () => {
      document.body.classList.remove(styles.bodyWithModal)
    }
  }, [isOpen])

  if (!isVisible) return null

  return (
    <BootstrapModal
      show={isOpen}
      onHide={onClose}
      centered
      className={styles.modalOverlay}
    >
      <BootstrapModal.Header className={styles.mainDivModal}>
        {/* <div className={styles.logo}>
          <img src="/Images/app-images/logo-text.png" alt="Coach Huddle Logo" />
        </div> */}
        <BootstrapModal.Title className={styles.heading}>{heading}</BootstrapModal.Title>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
      </BootstrapModal.Header>
      <BootstrapModal.Body className={`${customModalContent || ""} ${styles.modalContent}`}>
        {children}
      </BootstrapModal.Body>
    </BootstrapModal>
  )
}
