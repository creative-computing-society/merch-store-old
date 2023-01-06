import axios from 'axios';
import React, { useState } from 'react'

import { api_url } from '../../config';
import Navbar from '../Navbar/Navbar';
import styles from "./Style/change.module.css"
const url = api_url + "auth/change-password/"

function ChangePassword() {
    const [oldPassword, setOldPassword] = useState();
    const [newPassword, setNewPassword] = useState();

    const changePassword = async (e) => {
        e.preventDefault()
        const token = localStorage.getItem("token")

        const config = {
            headers: {
                "Authorization": `Token ${token}`
            }
        }

        const data = {
            "old_password": oldPassword,
            "new_password": newPassword,
        }

        const res = await axios.post(url, data, config)

        if (res.status == 200) {
            alert("Password Changed")
        } else {
            alert("Incorrect Password")
        }
    }


    return (
        <div >
            <Navbar />
            <div className={styles.container}>
                <div className={styles.subcontainer}>
                    <h1 className={styles.heading}>Change Password</h1>
                    <form onSubmit={changePassword}>
                        <div className={styles.hero}>
                            <label for="oldPassword" className={styles.subheading}>Old Password</label>
                            <input
                                type="password"
                                onChange={(e) => { setOldPassword(e.target.value) }}
                                value={oldPassword}
                                className={styles.input}
                                id="oldPassword"
                            /><br />
                        </div >
                        <div className={styles.hero}>
                            <label for="newPassword" className={styles.subheading}>New Password</label>
                            <input
                                type="password"
                                onChange={(e) => { setNewPassword(e.target.value) }}
                                value={newPassword}
                                id="newPassword"
                                className={styles.input}
                            /><br />
                        </div>
                        <button className={styles.btn}>Change</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword