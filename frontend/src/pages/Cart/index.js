import React, { useEffect, useState } from 'react'
import axios from "axios"

function Cart() {
    const [cartItems, setCartItems] = useState();


    useEffect(() => {
        const token = localStorage.getItem("token")

        const config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }

        const fetchData = async () => {
            const res = await axios.get("https://merchapi.ccstiet.com/cart/view", config)
            setCartItems(res.map(item, 
                <div>
                    <div>Name - {item.product.name}</div>
                    <div>Price - {item.product.price}</div>
                    <div>Printing Name - {item.printing_name}</div>
                    <div>Size - {item.size}</div>
                </div>

            ))
        }

        fetchData();
    })


  return (
    <div>
        {cartItems}

        <button>PLACE ORDER</button>
    </div>
  )
}

export default Cart