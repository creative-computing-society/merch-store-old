import React, { useEffect, useState } from 'react'
import axios from "axios"

import { api_url } from '../../config'
import OrderComplete from './OrderComplete'
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

        if(e.target.files[0].size > 10000000) {
            alert("File size should be below 10MB!")
            setScreenshot()
        } else {
            setScreenshot(e.target.files[0])
        }

    }

    const sendScreenshot = async (e) => {
        e.preventDefault()

        if(screenshot) {
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
            
            if(res.status = 200) {
                setSubmitted(true)
            }
        } else {
            alert("Upload payment screenshot to continue")
        }
        
    }

    if(!submitted){
    return (
        <div>
            <h1>Payment</h1>
            <div>Amount: {paymentDetails.amount}</div>
            <div>UPI ID: {paymentDetails.upi_id}</div>
            <div>Wallet: {paymentDetails.wallet}</div>
            <img src={paymentDetails.qr_url} alt="Payment QR" />

            <div>Upload payment Screenshot</div>
            <input type="file" onChange={onImageUpload} accept=".png, .jpg, jpeg"/>
            <button onClick={sendScreenshot}>PAY</button>
        </div>
    )
    }else {
        return (
            <OrderComplete />
        )
    }
}

export default Order