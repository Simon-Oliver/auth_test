import React, { useState } from 'react'
import styles from "./Modal.module.css"

export default function Modal({ toggleModal, show, children }) {

    return (
        <>
            {show && (<div className={styles.modalContainer} onClick={toggleModal}>
                <div className={styles.modalBackground} onClick={(e) => e.stopPropagation()}>
                    {children}
                    <button onClick={toggleModal}>Close</button>
                </div>

            </div>)}
        </>
    )
}
