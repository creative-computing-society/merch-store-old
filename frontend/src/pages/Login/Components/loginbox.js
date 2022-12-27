import React, { useState } from "react";
import axios from "axios";

import styles from "../Style/login.module.css";
import logo from "../Assets/logo.png"


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import { useNavigate } from "react-router-dom";
import Fade from 'react-reveal/Fade';

const url = "";

function Loginbox() {
    // const navigate = useNavigate();


    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [message, setMessage] = useState("");

    const [button, setButton] = useState(
        <button type="submit" className={styles.button}>
            <div className={styles.buttontext}>LOGIN</div>
        </button>
    );

    const submitForm = async (e) => {
        e.preventDefault();

        if (name && email && number) {
            setButton(
                <button type="submit" className={styles.button} disabled>
                    <FontAwesomeIcon icon={faSpinner} className="fa-spin" />
                </button>
            );

            try {
                axios.post(url, {
                    email: email.trim(),
                    name: name,
                    number: number
                }).then((response) => {

                    if (response.data.status == "success") {
                        const users = response.data
                        console.log(users.data.user)
                        if (users.data.user.hasAttempted == true) {
                            // navigate("/submitted")
                        } else {
                            localStorage.setItem('jwt', users.token)
                            localStorage.setItem('user', JSON.stringify(users))
                            setName("");
                            setEmail("");
                            setNumber("");

                            setButton(
                                <button type="submit" className={styles.button} disabled>
                                    <div>Logging In</div>
                                </button>
                            );

                            // navigate("/home")
                        }
                    }
                })
                    .catch(error => {
                        setButton(
                            <button type="submit" className={styles.button}>
                                <div>Login</div>
                            </button>
                        )

                        setMessage("Incorrect Credentials")
                    })
            } catch (error) {
                setButton(
                    <button type="submit" className={styles.button}>
                        <div>Login</div>
                    </button>
                );

                setMessage("An error occurred")
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
                    <form action=""
                    />  <div className={styles.inputBox}>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            autoComplete="off"
                            placeholder="NAME"
                            className={styles.inputBox1}
                        />
                    </div>
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
                            type="text"
                            name="phone"
                            id="phone"
                            autoComplete="off"
                            placeholder="MOBILE NO."
                            className={styles.inputBox1}
                        />
                    </div>
                    <div className={styles.inputBox}>
                        {button}
                    </div>
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
    )
}
export default Loginbox;