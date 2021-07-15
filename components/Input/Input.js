import React from 'react'
import styles from './Input.module.css'

const InputField = ({ value, id, label, name, placeholder, type, onChange, isError = {} }) => {

    return (<div className="form-group">
        {label && <label className={`${styles.label} ${isError.hasOwnProperty("error") && isError.error ? styles.errorFont : ""}`} htmlFor="input-field">{label}</label>}
        <input
            id={id}
            className={`${styles.input} ${isError.hasOwnProperty("error") && isError.error ? styles.error : ""}`}
            type={type}
            value={value}
            name={name}
            placeholder={placeholder ? placeholder : ""}
            onChange={onChange}
        />
        {isError.hasOwnProperty("error") && isError.error ? <p className={`${styles.errorLabel} ${styles.errorFont}`}>{isError.error}</p> : ""}
    </div>)
}

export default InputField;