import React, { useEffect, useState } from 'react'
import axios from "axios"
import Navbar from '../Navbar/Navbar';

import { api_url } from '../../config';

const view_url = api_url + "cart/view/"
const delete_url = api_url + "cart/delete/"
const payment_url = api_url + "order/initiate/"

function Cart() {
    const [cartItems, setCartItems] = useState([]);

    const deleteItem = async (id) => {
        const token = localStorage.getItem("token")

        const data = {
            "cart_item_id": id,
        }

        const config = {
            headers: {
                "Authorization": `Token ${token}`
            }
        }

        const res = await axios.post(delete_url, data, config)
        console.log(res.status)
        if(res.status == 200){
            const updatedItems = cartItems.filter(item => item.product.id != id)
            setCartItems(updatedItems)
        } else {
            alert("An error occurred")
        }
    }


    const placeOrder = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token")

        const data = {}

        const config = {
            headers: {
                "Authorization": `Token ${token}`
            }
        }

        const res = await axios.post("")

    }


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

        {cartItems.map((item) => {
            return (
                <div key={item.product.id}>
                    <div>Name - {item.product.name}</div>
                    <div>Price - {item.product.price}</div>
                    {item.product.is_name_required && <div>Printing Name - {item.printing_name}</div>}
                    {item.product.is_size_required && <div>Size - {item.size}</div>}

                    <button onClick={() => {deleteItem(item.product.id)}}>Delete Item</button>
                </div>
            )
            
        })}

        <button onClick={placeOrder}>PLACE ORDER</button>
    </div>
  )
}

export default Cart