import React, { useState } from 'react';
import styles from "./Card.module.css"

export default function Card(props) {
    const [isShowing, setIsShowing] = useState(false);

    const toggle = () => {
        setIsShowing(!isShowing);
    };

    console.log(props);
    return (

        <div className={styles.card} onClick={toggle}>
            <h3>{props.title}</h3>
            {isShowing && <p className={styles.panel} style={isShowing ? { display: "block" } : ""}>  {props.content}</p>}
        </div >
    )
}
