import React from 'react'
import styles from "./SubmitForm.module.css"

export default function SubmitForm(props) {
    const { clickHandler, css, value, disabled } = props
    return (
        <input
            type="submit"
            disabled={disabled}
            value={value}
            onClick={clickHandler}
            className={`${styles.button} ${css ? styles[css] : ""}`}>
        </input>

    )
}
