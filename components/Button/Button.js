import React from 'react'
import styles from "./Button.module.css"

export default function Button(props) {
    const { clickHandler, css } = props
    console.log("==============>", props)
    return (
        <button
            onClick={clickHandler}
            className={`${styles.button}`}>
            {props.children}
        </button>
    )
}
