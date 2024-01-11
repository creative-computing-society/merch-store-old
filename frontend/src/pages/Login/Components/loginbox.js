import React, { useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../../../store/auth-context";
import styles from "../Style/login.module.css";
import logo from "../../Home/Assets/CCS_Bulb.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import { useNavigate } from "react-router-dom";
import Fade from "react-reveal/Fade";

import { api_url } from "../../../config";

const url = api_url + "auth/login/";

function Loginbox() {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  // const history = useHistory()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

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
            if (!response.data.error) {
              // console.log(response.data)
              authCtx.login(response.data.key);
              navigate("/", { replace: true });

              setPassword("");
              setEmail("");

              setLoading(false);
            }
          })
          .catch((error) => {
            setLoading(false);

            alert("Incorrect Credentials");
          });
      } catch (error) {
        setLoading(false);

        alert("An error occurred");
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
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
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
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className={styles.inputBox}>
              {!loading && (
                <button type="submit" className={styles.button}>
                  <div className={styles.buttontext}>LOGIN</div>
                </button>
              )}

              {loading && (
                <button type="submit" className={styles.button} disabled>
                  <FontAwesomeIcon icon={faSpinner} className="fa-spin" />
                </button>
              )}
            </div>
          </form>

          <center>
            <button onClick={ () => window.location.replace("https://sso.ccstiet.com/auth/google/?clientId=6511c0315c333911e2fb2213&callback=http://localhost:3000/authVerify")} className={styles.button} style={{backgroundColor:"darkgoldenrod"}}>
              <div style={{fontWeight:"bold",fontFamily:"monospace"}}>SIGN IN WITH CCS</div>
            </button>
          </center>

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
