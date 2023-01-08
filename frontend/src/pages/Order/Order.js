import React, { useEffect, useState } from 'react'
import axios from "axios"
import Navbar from "../Navbar/Navbar"
import { api_url } from '../../config'
import OrderComplete from './OrderComplete'
import styles from "./Style/order.module.css"
const initiate_url = api_url + "order/initiate/"
const submit_url = api_url + "order/place/"

function Order() {
    const [paymentDetails, setPaymentDetails] = useState({});
    const [screenshot, setScreenshot] = useState();
    const [submitted, setSubmitted] = useState(false);


    useEffect(() => {
        const token = localStorage.getItem("token")

        const config = {
            headers: {
                "Authorization": `Token ${token}`
            }
        }

        const sendRequest = async () => {
            const res = await axios.get(initiate_url, config)
            setPaymentDetails(res.data)
        }

        sendRequest();

    }, [])

    const onImageUpload = (e) => {
        console.log("image uploaded")

        if (e.target.files[0].size > 10000000) {
            alert("File size should be below 10MB!")
            setScreenshot()
        } else {
            setScreenshot(e.target.files[0])
        }

    }

    const sendScreenshot = async (e) => {
        e.preventDefault()

        if (screenshot) {
            const formData = new FormData();
            formData.append('screenshot', screenshot);
            // formData.append('fileName', screenshot.name);

            const token = localStorage.getItem("token")

            const config = {
                headers: {
                    "Authorization": `Token ${token}`,
                    'content-type': 'multipart/form-data',
                },
            };

            const res = await axios.post(submit_url, formData, config)

            if (res.status = 200) {
                setSubmitted(true)
            }
        } else {
            alert("Upload payment screenshot to continue")
        }

    }

    if (!submitted) {
        return (

            <div>
                <Navbar />
                <div className={styles.container}>
                    <div className={styles.subContainer}>
                        <h1 className={styles.paymentHeading}>Payment Details</h1>
                        <div className={styles.paymentDetails}><b>Total Amount: </b>{paymentDetails.amount}</div>
                        <div className={styles.paymentDetails}><b>UPI ID: </b>{paymentDetails.upi_id}</div>
                        <div className={styles.paymentDetails}><b>Wallet: </b>{paymentDetails.wallet}</div>

                        <img src={paymentDetails.qr_link} alt="Payment QR" className={styles.qr} />

                        <div className={styles.paymentDetails}>Upload payment Screenshot</div>
                        <div className={styles.ssContainer}>
                            <input type="file" onChange={onImageUpload} className={styles.ss} accept=".png, .jpg, jpeg" />
                        </div>
                        <br />
                        <button onClick={sendScreenshot} className={styles.btn}>Submit Screenshot</button>

                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <OrderComplete />
        )
    }
}

export default Order