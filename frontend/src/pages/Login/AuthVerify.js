import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { api_url } from "../../config";
import AuthContext from "../../store/auth-context";
import styles from "./Style/login.module.css";
import logo from "./../Home/Assets/CCS_Bulb.png";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import ProgressBar from "./ProgressBar";

function AuthVerify() {
  const [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const url = api_url + "auth/token/";

  const authCtx = useContext(AuthContext);

  const verifyToken = async () => {
    setLoading(true);

    try {
      axios
        .post(url, {
          token: token,
        })
        .then((response) => {
          if (!response.data.error) {
            // console.log(response.data)
            authCtx.login(response.data.key);
            navigate("/", { replace: true });
            setLoading(false);
          }
        })
        .catch((error) => {
          setLoading(false);
          // alert("Incorrect Token or Token Expired");
        });
    } catch (error) {
      setLoading(false);
      alert("An error occurred");
    }
  };

  useEffect(() => {
    if (token) {
      verifyToken();
    }
  }, []);

  searchParams.get("token");
  return (
    <center>
      <div className={styles.logincontainer} id="whyccsid">
        <div className={styles.contentSection}>
          <div className={styles.logo}>
            <img src={logo} alt="CCS Image"  style={{height:"150px",marginTop:"15px"}} />
          </div>
          <div className={styles.loginbox}>
            <div className={styles.loginboxcontent}>
              <div className={styles.loginboxheading}>
                <h1 style={{color:"white"}}>Verify Token</h1>
                <ProgressBar />
              </div>
              {/* {token} */}
            </div>
          </div>
        </div>
      </div>
    </center>
  );
}

export default AuthVerify;
