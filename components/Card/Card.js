import React, { useState } from "react";
import styles from "./Card.module.css";

export default function Card(props) {
  const [isShowing, setIsShowing] = useState(false);

  const toggle = () => {
    setIsShowing(!isShowing);
  };

  console.log(props);
  return (
    <div className={styles.card} onClick={toggle}>
      <h4 className={styles.title}>{props.title}</h4>
      <div
        className={isShowing ? `${styles.panel} ${styles.show}` : styles.panel}
      >
        <p> {props.content}</p>
        {props.children}
      </div>
    </div>
  );
}
