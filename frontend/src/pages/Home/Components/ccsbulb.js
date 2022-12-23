import React from "react";
import styles from "../Style/ccsbulb.module.css";
import Navbar from "./navbar.js"

import ccsbulb from "../Assets/CCS_Bulb.png"

function CcsBulb() {
  return (
    <div className={styles.container}>
      <div className={styles.contentSection}>
        <Navbar />
        <div className={styles.logo}>
          <img src={ccsbulb} alt="CCS Image" style={{
            height: 410,
            width:355,
            position:"absolute"
          }} />
        </div>
        <div className={styles.merch}>
          <div className={styles.heading2}>MERCHANDISE</div>
          <div className={styles.heading3}>STORE</div>
        </div>
      </div>
    </div>
  );
}

export default CcsBulb;