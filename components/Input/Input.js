import React from 'react'
import styles from './Input.module.css'

const InputField = ({ value, label, name, placeholder, type, onChange }) => (
    <div className="form-group">
        {label && <label className={styles.label} htmlFor="input-field">{label}</label>}
        <input
            className={styles.input}
            type={type}
            value={value}
            name={name}
            placeholder={placeholder ? placeholder : ""}
            onChange={onChange}
        />
    </div>
);

export default InputField;