import React, { ReactNode } from 'react'
import ReactDOM from 'react-dom'
import styles from './form-modal.module.scss';

export default function Modal({ isOpen, onClose, children }: 
  { isOpen: boolean, onClose: () => void, children: ReactNode } ) {

  return !isOpen ? null :
    ReactDOM.createPortal(
      <div className={styles.modalOverlay}>
        <div className={styles.modal}>
          <button className={styles.closeButton} onClick={onClose}>&times;</button>
          {children}
        </div>
      </div>,
      document.body
  );
}

