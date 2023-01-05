import axios from 'axios';
import React, { useState } from 'react'

import { api_url } from '../../config';
import Navbar from '../Navbar/Navbar';
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

        const res = axios.post(url, data, config)

        if(res.status == 200) {
            alert("Password Changed")
        } else {
            alert("Incorrect Password")
        }
    }
    

    return (
        <div>
            <Navbar />
            <h1>Change Password</h1>
            <form onSubmit={changePassword}>
                <label for="oldPassword">Old Password</label>
                <input
                    type="password"
                    onChange={(e) => {setOldPassword(e.target.value)}}
                    value={oldPassword}
                    id="oldPassword"
                />
                <label for="newPassword">New Password</label>
                <input
                    type="password"
                    onChange={(e) => {setNewPassword(e.target.value)}}
                    value={newPassword}
                    id="newPassword"
                />
                <button>Change</button>
            </form>
        </div>
    )
}

export default ChangePassword