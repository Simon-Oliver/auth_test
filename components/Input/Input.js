import React from 'react'
import styles from './Input.module.css'

const InputField = ({ value, label, name, placeholder, type, onChange, isNotMatch }) => (
    <div className="form-group">
        {label && <label className={`${styles.label} ${isNotMatch ? styles.errorFont : ""}`} htmlFor="input-field">{label}</label>}
        <input
            className={`${styles.input} ${isNotMatch ? styles.error : ""}`}
            type={type}
            value={value}
            name={name}
            placeholder={placeholder ? placeholder : ""}
            onChange={onChange}
        />
        {isNotMatch ? <p className={`${styles.errorLabel} ${styles.errorFont}`}>Passwords don't match</p> : ""}
    </div>
);

export default InputField;