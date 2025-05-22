"use client"

import { useEffect, useState } from "react"
import styles from "./Modal.module.css"

export default function Modal({ isOpen, onClose, children, customModalContent }) {
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
    <div className={`${styles.modalOverlay} ${isOpen ? styles.open : styles.closing}`}>
     <div className={styles.mainDivModal}>
       <div className={styles.logo}>
          <img src="/Images/app-images/logo-text.png" alt="Coach Huddle Logo" />
        </div>
       <div className={`${customModalContent || ""} ${styles.modalContent}`}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        {children}
      </div>
     </div>
    </div>
  )
}
