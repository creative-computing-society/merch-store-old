import React, { useState } from "react";
import axios from "axios";

import styles from "../Style/login.module.css";
import logo from "../Assets/logo.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import { useNavigate } from "react-router-dom";
import Fade from "react-reveal/Fade";

const url = "";

function Loginbox() {
  // const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const submitForm = async (e) => {
    e.preventDefault();

    if (email && password) {
      setLoading(true);

      try {
        axios
          .post(url, {
            email: email.trim(),
            password: password.trim(),
          })
          .then((response) => {
            if (response.data.status == "success") {
              const user = response.data;
              localStorage.setItem("token", user.key);
              setPassword("");
              setEmail("");

              setLoading(false)
            }
          })
          .catch((error) => {
            setLoading(false)

            setMessage("Incorrect Credentials");
          });
      } catch (error) {
        setLoading(false)

        setMessage("An error occurred");
      }
    } else {
      alert("Please fill in all the data");
    }
  };
  return (
    <div className={styles.logincontainer} id="whyccsid">
      <div className={styles.contentSection}>
        <div className={styles.logo}>
          <img src={logo} alt="CCS Image" className={styles.photo} />
        </div>

        <div className={styles.heading1}>LOGIN</div>
        <div className={styles.form}>
          <form action="" onSubmit={submitForm}>
            {" "}
            <div className={styles.inputBox}>
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="off"
                placeholder="EMAIL"
                className={styles.inputBox1}
              />
            </div>
            <div className={styles.inputBox}>
              <input
                type="password"
                name="password"
                id="password"
                autoComplete="off"
                placeholder="PASSWORD"
                className={styles.inputBox1}
              />
            </div>

            <div className={styles.inputBox}>
                {
                    !loading && 
                    <button type="submit" className={styles.button}>
                        <div className={styles.buttontext}>LOGIN</div>
                    </button>
                }
                
                {
                    loading && 
                    <button type="submit" className={styles.button} disabled>
                        <FontAwesomeIcon icon={faSpinner} className="fa-spin" />
                    </button>
                }
            </div>
          </form>
        </div>
        <div className={styles.merch}>
          <Fade bottom>
            <div className={styles.heading2}>MERCHANDISE</div>
          </Fade>
          <Fade top>
            <div className={styles.heading3}>STORE</div>
          </Fade>
        </div>
      </div>
    </div>
  );
}
export default Loginbox;
