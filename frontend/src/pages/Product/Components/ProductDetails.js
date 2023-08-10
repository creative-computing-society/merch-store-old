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
    const [userImage, setUserImage] = useState();
    // const [userImageUrl, setUserImageUrl] = useState();
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

    const onSizeChange = (size) => {
        setSelectedSize(size)
    }

    const onImageSelect = (e) => {
        // console.log("image uploaded")

        if (e.target.files[0].size > 15000000) {
            alert("File size should be below 15MB!")
            setUserImage()
        } else {
            setUserImage(e.target.files[0])
        }

    }

    const addToCart = async (e) => {
        e.preventDefault();

        if(!authCtx.isLoggedIn) {
            navigate("/login")
        }

        let nameFilled = false;
        let sizeFilled = false; 
        let imageSelected = false;
        let imageUrl = "";

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

        if(props.details.is_image_required){
            if(userImage){
                setLoading(true)
                const data = new FormData()
                data.append("file", userImage)
                data.append("upload_preset", "ccs-merch")
                data.append("cloud_name", "dgbobpgf4")

                let res;

                try{
                    res = await axios.post("https://api.cloudinary.com/v1_1/dgbobpgf4/image/upload", data)
                    imageSelected = true;
                }catch(error) {
                    imageSelected = false;
                    alert("An error occurred uploading image")
                    setLoading(false)
                    return
                }
                // console.log(res.data.url)
                imageUrl = res.data.url;
            }else {
                imageSelected = false;
            }
        }else {
            imageSelected = true;
        }

        if(nameFilled && sizeFilled && imageSelected) {
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
                "image_url": props.details.is_image_required?imageUrl:null,
            }

            try{
                const res = await axios.post(url, data, config)
                alert("Product added to cart")
            } catch (error) {
                alert("An error occurred")
                setLoading(false)
                return
            }
            


            // console.log(data);
        } else {
            alert("Please fill in all the data")
        }
        
        setLoading(false);

        
    }

    

    // useEffect(() => {console.log(selectedSize)}, [selectedSize])


    return (
        <div className={styles.container}>

            <div className={styles.child}>
                <ProductCarousel image_url1={props.details.image1} image_url2={props.details.image2}/>
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
                        <div className={styles.sizeTitle}>
                            <div className={styles.title}>Choose a Size</div>
                            <a href={props.details.size_chart_image} target="_blank" className={styles.sizeChartUrl}>Size Chart</a>
                        </div>
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

                {props.details.is_image_required && 
                    <div className={styles.contain}>
                        <div className={styles.title}>Upload your image</div>
                        <input
                            className={styles.imageButton}
                            type="file"
                            onChange={onImageSelect}
                            accept=".png"
                        />
                        <ol className={styles.imageInstructions}>
                            <li>Image size should be less than 15Mb</li>
                            <li>Upload Image after removing the background using <a href='https://www.remove.bg/'>remove.bg</a></li>
                            <li>Image should be of .png format</li>
                        </ol>
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