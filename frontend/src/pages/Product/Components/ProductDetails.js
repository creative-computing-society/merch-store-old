import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Select from "react-select"
import styles from "../Style/product.module.css"
import ProductCarousel from './ProductCarousel.js'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import { api_url } from '../../../config';
const url = api_url + "cart/add/"

function ProductDetails(props) {

    const [printName, setPrintName] = useState();
    const [selectedSize, setSelectedSize] = useState();
    const [loading, setLoading] = useState(false);

    const options = [
        { value: "S", label: "S" },
        { value: "M", label: "M" },
        { value: "L", label: "L" },
        { value: "XL", label: "XL" },
    ]

    const nameChangeHandler = (e) => {
        setPrintName(e.target.value);
    }

    const addToCart = async (e) => {
        e.preventDefault();

        let nameFilled = false;
        let sizeFilled = false; 

        if(props.details.is_name_required){
            if(printName){
                nameFilled = true;
            }else {
                nameFilled = false;
            }
        }else {
            nameFilled = true;
        }

        if(props.details.is_size_required){
            if(selectedSize){
                sizeFilled = true;
            }else {
                sizeFilled = false;
            }
        }else {
            sizeFilled = true;
        }

        if(nameFilled && sizeFilled) {
            setLoading(true);

            const token = localStorage.getItem("token")

            const config = {
                headers: {
                    "Authorization": `Token ${token}`
                }
            }

            const data = {
                "product_id": props.details.id,
                "printing_name": props.details.is_name_required?printName:null,
                "size": props.details.is_size_required?selectedSize.value:null,
            }

            try{
                const res = await axios.post(url, data, config)
            } catch (error) {
                alert("An error occurred")
            }
            


            console.log(data);
        } else {
            alert("Please fill in all the data")
        }
        
        setLoading(false);
    }

    return (
        <div className={styles.container}>

            <div className={styles.child}>
                <ProductCarousel image_url1={props.details.image_url1} image_url2={props.details.image_url2}/>
            </div>
            <div className={styles.child}>
                <hr/>   
                <div className={styles.contain}>
                    <div className={styles.title2}>Product Details: {props.details.name}</div>
                    <div className={styles.title2}>Price: {props.details.price}</div>
                </div>
                <hr/>   
                { props.details.is_name_required && 
                    <div className={styles.contain}>
                        <div className={styles.title}>Enter Name</div>
                        <input
                            className={styles.ic}
                            type="text"
                            onChange={nameChangeHandler}
                        />
                    </div>
                }
                
                { props.details.is_size_required && 
                    <div className={styles.contain}>
                        <div className={styles.title}>Choose a Size</div>
                        <Select options={options} value={selectedSize} onChange={setSelectedSize} />
                    </div>
                }
                    <hr/>
                    <div className={styles.contain}>
                        
                        {
                            !loading && 
                            <button className={styles.button} onClick={addToCart}>
                                Add to Cart
                            </button>
                        }
                        
                        {
                            loading && 
                            <button type="submit" className={styles.button} disabled>
                                <FontAwesomeIcon icon={faSpinner} className="fa-spin" />
                            </button>
                        }
                    </div>

                    
                <hr/>
            </div>
        </div>
    )
}

export default ProductDetails