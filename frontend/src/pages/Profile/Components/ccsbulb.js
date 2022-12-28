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
        <hr
          style={{
            background: 'white',
            color: 'white',
            borderColor: 'white',
            height: '0.6px',
            width: '70%',
          }}
        />
        <div className={styles.subcontainer}>
          User: Name Surname
        </div>
        <div className={styles.subcontainer}>
          Previous Orders :-
        </div>

        <div class={styles.parent}>

          <div className={styles.child}>
            <div className={styles.order}>
              if no orders show null
            </div>
            <div className={styles.order}>
              orderdetails
            </div>
            <div className={styles.order}>
              orderdetails
            </div>
            <div className={styles.order}>
              orderdetails
            </div>
          </div>

        </div>

      </div>
      
      <div className={styles.subcontainer}>
        <button className={styles.button}>LOGOUT</button>
      </div>
    </div>


  );
}

export default CcsBulb;