import React, { useState } from 'react'
import styles from "./Modal.module.css"

export default function Modal() {
    const [show, setShow] = useState(false)

    return (
        show && (<>
            <div className={styles.modalContainer}></div>
        </>)


    )
}
