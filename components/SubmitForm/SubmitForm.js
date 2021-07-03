import React from 'react'
import styles from "./SubmitForm.module.css"

export default function SubmitForm(props) {
    const { clickHandler, css } = props
    console.log("==============>", props)
    return (
        <button
            onClick={clickHandler}
            className={`${styles.button} ${css ? styles[css] : ""}`}>
            {props.children}
        </button>
    )
}
