import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Select from "react-select"
import styles from "../Style/product.module.css"
import ProductCarousel from './ProductCarousel.js'

function ProductDetails(props) {

    const [name, setName] = useState();
    const [size, setSize] = useState();

    const options = [
        { value: "S", label: "S" },
        { value: "M", label: "M" },
        { value: "L", label: "L" },
        { value: "XL", label: "XL" },
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

        axios.post("https://merchapi.ccstiet.com/",)
    }

    return (
        <div className={styles.container}>

            <div className={styles.child}>
                <ProductCarousel />
            </div>
            <div className={styles.child}>
                <hr/>   
                <div className={styles.contain}>
                    <div className={styles.title2}>Product Details: {props.details.name}</div>
                    <div className={styles.title2}>Price: {props.details.price}</div>
                </div>
                <hr/>   
                {/* props.details.is_name_required &&  */}
                <div className={styles.contain}>
                    <div className={styles.title}>Enter Name</div>
                    <input
                        className={styles.ic}
                        type="text"
                        onChange={nameChangeHandler}
                    />
                </div>

                
                {/* // props.details.is_size_required &&  */}
                <div className={styles.contain}>
                    <div className={styles.title}>Choose a Size</div>
                    <Select options={options} />
                </div>
                <hr/>
                <div className={styles.contain}>
                <button className={styles.button} onClick={addToCart}>Add to Cart</button>
                </div>
                <hr/>
            </div>
        </div>
    )
}

export default ProductDetails