import React from "react";
import styles from "../Style/ccsbulb.module.css";
import Navbar from "./navbar.js"

import ccsbulb from "../Assets/CCS_Bulb.png"


import Zoom from 'react-reveal/Zoom';
import Reveal from 'react-reveal/Reveal';
import Fade from 'react-reveal/Fade';
import Flip from 'react-reveal/Flip';

function CcsBulb() {
  return (
    <div className={styles.container}>
      <div className={styles.contentSection}>
        <Navbar />
        <div className={styles.logo}>
          <Zoom>
            <img src={ccsbulb} alt="whyccs6" className={styles.photo} />
          </ Zoom>
        </div>
        <div className={styles.merch}>
          <Fade bottom>
            <div className={styles.heading2}>MERCHANDISE</div>
          
            <div className={styles.heading3}>STORE</div>
          </Fade>

        </div>
      </div>
    </div>
  );
}

export default CcsBulb;