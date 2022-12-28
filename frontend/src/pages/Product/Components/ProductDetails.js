import axios from 'axios';
import React, {useEffect, useState} from 'react'
import Select from "react-select"
import styles from "../Style/product.module.css"


function ProductDetails(props) {

    const [name, setName] = useState();
    const [size, setSize] = useState();

    const options = [
        {value: "S", label: "S"},
        {value: "M", label: "M"},
        {value: "L", label: "L"},
        {value: "XL", label: "XL"},
    ]

    const nameChangeHandler = (e) => {
        setName(e.target.value);
    }

    const addToCart = async () => {
        const token = localStorage.getItem("token")
        
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }

        const data = {
            "product_id": props.details.id,
        }
        
        axios.post("https://merchapi.ccstiet.com/", )
    }

    return (
        <div className={styles.container}>
            <div>
                <div>{props.details.name}</div>
                <div>{props.details.price}</div>
            </div>
            {
                props.details.is_name_required && 
                <div>
                    <div>NAME</div>
                    <input 
                        type="text" 
                        onChange={nameChangeHandler}
                    />
                </div>
            
            }
            {
                props.details.is_size_required && 
                <div>
                    <div>CHOOSE A SIZE</div>
                    <Select options={options}/> 
                </div>
            
            }

            <button onClick={addToCart}>Add to Cart</button>
        </div>
    )
}

export default ProductDetails