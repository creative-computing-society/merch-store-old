import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import Select from "react-select"
import styles from "../Style/product.module.css"
import ProductCarousel from './ProductCarousel.js'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import SizeButton from './SizeButton';

import AuthContext from '../../../store/auth-context';
import { api_url } from '../../../config';
import { useNavigate } from 'react-router-dom';
const url = api_url + "cart/add/"

function ProductDetails(props) {
    const authCtx = useContext(AuthContext)
    const navigate = useNavigate()

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

        if(!authCtx.isLoggedIn) {
            navigate("/login")
        }

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
                "size": props.details.is_size_required?selectedSize:null,
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

        alert("product added to cart")
    }

    const onSizeChange = (size) => {
        setSelectedSize(size)
    }

    useEffect(() => {console.log(selectedSize)}, [selectedSize])


    return (
        <div className={styles.container}>

            <div className={styles.child}>
                <ProductCarousel image_url1={props.details.image_url1} image_url2={props.details.image_url2}/>
            </div>
            <div className={styles.child}>
                {/* <hr/>    */}
                <div className={styles.contain}>
                    <div className={styles.product_name}>{props.details.name}</div>
                    <div className={styles.title2}>Price: <span style={{color: "red"}}>₹{props.details.price}</span></div>
                </div>
                {/* <hr/>    */}
                { props.details.is_name_required && 
                    <div className={styles.contain}>
                        <div className={styles.title}>Enter Printing Name</div>
                        <input
                            className={styles.ic}
                            type="text"
                            onChange={nameChangeHandler}
                            placeholder="SAMPLE NAME"
                        />
                    </div>
                }
                
                { props.details.is_size_required && 
                    <div className={styles.contain}>
                        <div className={styles.title}>Choose a Size</div>
                        {/* <Select options={options} value={selectedSize} onChange={setSelectedSize} /> */}
                        <div className={styles.sizeButtons}>
                            <SizeButton size="S" changeSize={onSizeChange} selected={selectedSize=="S"}/>
                            <SizeButton size="M" changeSize={onSizeChange} selected={selectedSize=="M"}/>
                            <SizeButton size="L" changeSize={onSizeChange} selected={selectedSize=="L"}/>
                            <SizeButton size="XL" changeSize={onSizeChange} selected={selectedSize=="XL"}/>
                            <SizeButton size="XXL" changeSize={onSizeChange} selected={selectedSize=="XXL"}/>
                        </div>
                    </div>
                }
                    {/* <hr/> */}
                    <div className={styles.contain}>
                        
                        {
                            !loading && props.details.status == "allowed" && 
                                <button className={styles.cartButton} onClick={addToCart}>
                                    Add to Cart
                                </button>
                        }

                        {
                            !loading && props.details.status != "allowed" && 
                                <button className={styles.cartButton} onClick={addToCart} disabled style={{opacity: "0.5"}}>
                                    Unable to Add to Cart
                                </button>
                                
                        }
                        
                        {
                            loading && 
                            <button type="submit" className={styles.cartButton} disabled>
                                <FontAwesomeIcon icon={faSpinner} className="fa-spin" />
                            </button>
                        }
                    </div>
                {/* <hr/> */}
            </div>
        </div>
    )
}

export default ProductDetails