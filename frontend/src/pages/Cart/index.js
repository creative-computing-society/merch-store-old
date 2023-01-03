import React, { useEffect, useState } from 'react'
import axios from "axios"
import Navbar from '../Navbar/Navbar';

import styles from "./Style/cart.module.css"
import logo from "../Navbar/Assets/logo.png"
import { api_url } from '../../config';
import { Link, useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const view_url = api_url + "cart/view/"
const delete_url = api_url + "cart/delete/"
const payment_initiate_url = api_url + "order/place/"

function Cart() {
    const navigate = useNavigate()

    const [cartItems, setCartItems] = useState([]);

    const deleteItem = async (id) => {
        const token = localStorage.getItem("token")

        const data = {
            "cart_item_id": parseInt(id),
        }

        const config = {
            headers: {
                "Authorization": `Token ${token}`
            }
        }

        const res = await axios.post(delete_url, data, config)
        console.log(res.status)
        if (res.status == 200) {
            const updatedItems = cartItems.filter(item => item.id != id)
            setCartItems(updatedItems)
        } else {
            alert("An error occurred")
        }
    }


    // const placeOrder = async (e) => {
    //     e.preventDefault();

    //     const token = localStorage.getItem("token")

    //     const data = {}

    //     const config = {
    //         headers: {
    //             "Authorization": `Token ${token}`
    //         }
    //     }

    //     const res = await axios.post(payment_initiate_url, data, config)
    //     if (res.status == 200) {
    //         const payment_session_id = res.data.payment_session_id

    //         navigate("/redirect", { state: { payment_session_id: payment_session_id } });
    //     }

    // }


    useEffect(() => {
        const token = localStorage.getItem("token")

        const config = {
            headers: {
                "Authorization": `Token ${token}`
            }
        }

        const fetchData = async () => {
            const res = await axios.get(view_url, config)
            console.log(res.data)
            setCartItems(res.data)

        }

        fetchData();
    }, [])


    return (
        <div>
            <Navbar />
            <hr
                style={{
                    background: 'black',
                    color: 'black',
                    borderColor: 'white',
                    height: '0.5px',
                    width: '60%',
                    marginTop: '1rem',
                    marginBottom: '1rem'
                }}
            />
            {cartItems.map((item) => {
            
                return (
                    <div className={styles.container}>
                        <div key={item.product.id} className={styles.elements} >
                            <div className={styles.element}>
                            <div className={styles.btncon}>
                                </div>
                                <div className={styles.child} ><Link to={`/product/${item.product.id}`}><img src={item.product.image_url1} className={styles.productImage} /></Link></div>
                                <div className={styles.child}>
                                    <div className={styles.discription}><b>{item.product.name}</b></div>
                                    <div className={styles.discription}><b>Cost:</b> ₹{item.product.price}</div>
                                    {item.product.is_size_required && <div className={styles.discription}><b>Size:</b> {item.size}</div>}
                                    <div className={styles.discription}><b>Quantity:</b> 1</div>
                                    {item.product.is_name_required && <div className={styles.discription}><b>Printing Name:</b> <br/>{item.printing_name}</div>}
                                    
                                </div>
                                <div className={styles.btncon}>
                                    <button className={styles.button1} onClick={() => { deleteItem(item.id) }}>Delete Item</button>
                                </div>
                            </div>
                        </div>
                    </div>

                )
            })}
            <hr style={{
                background: 'black',
                color: 'black',
                borderColor: 'white',
                height: '0.5px',
                width: '50%',
                marginTop: '1rem',
                marginBottom: '1rem'
            }} />
            <div className={styles.container}>
                <Link to="/order" className={styles.button}>PLACE ORDER</Link>
            </div>
        </div>
    )
}

export default Cart