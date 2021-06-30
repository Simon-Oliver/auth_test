import React from 'react'
import styles from './Login.module.css'

export default function Login() {
    return (
        <div className={styles.box}>
            <h3 >Login Component</h3>
            <button className={`${styles.button} `}>Continue with Google</button>
        </div>
    )
}
