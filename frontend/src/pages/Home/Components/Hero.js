import React from "react";
import styles from "../Style/hero.module.css";
import Navbar from "../../Navbar/Navbar"
// import Navbar from "./navbar"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ccsbulb from "../Assets/CCS_Bulb.png"


import Zoom from 'react-reveal/Zoom';
import Reveal from 'react-reveal/Reveal';
import Fade from 'react-reveal/Fade';
import Flip from 'react-reveal/Flip';

function Hero() {
  return (
    <div className={styles.container}>
      <Navbar theme={"light"} logo={false}/>
      <div className={styles.contentSection}>
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
          {/* <FontAwesomeIcon icon="fa-solid fa-caret-down" /> */}
        </div>
      </div>
    </div>
  );
}

export default Hero;