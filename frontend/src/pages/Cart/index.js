import React, { useEffect, useState } from 'react'
import axios from "axios"
import Navbar from '../Navbar/Navbar';

import { api_url } from '../../config';

const url = api_url + "cart/view/"

function Cart() {
    const [cartItems, setCartItems] = useState();


    useEffect(() => {
        const token = localStorage.getItem("token")

        const config = {
            headers: {
                "Authorization": `Token ${token}`
            }
        }

        const fetchData = async () => {
            const res = await axios.get(url, config)
            console.log(res.data)
            const data = res.data
            setCartItems(data.map(item => {

                return (
                    <div>
                        <div>Name - {item.product.name}</div>
                        <div>Price - {item.product.price}</div>
                        <div>Printing Name - {item.printing_name}</div>
                        <div>Size - {item.size}</div>
                    </div>
                )
                    
                })

            )
        }

        fetchData();
    }, [])


  return (
    <div>
        <Navbar />
        {cartItems}

        <button>PLACE ORDER</button>
    </div>
  )
}

export default Cart