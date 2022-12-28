import React, {useState, useEffect} from 'react'
import {useParams} from "react-router-dom"
import axios from "axios"
import ProductCarousel from './Components/ProductCarousel'
import ProductDetails from './Components/ProductDetails'
import Navbar from "../Navbar/Navbar"
import styles from "./Style/product.module.css"

function Product() {
  const params = useParams()
  const product_id = params.id
  
  const [details, setDetails] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token")
      
      const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
        
      }

      const res = await axios.get(`https://merchapi.ccstiet.com/product/${product_id}`, config)
      setDetails(res)
    }

    fetchData();
  }, [])


  return (
    <>
        <Navbar />
        <div className={styles.container}>
          <ProductCarousel />
          <ProductDetails details={details} />
        </div>
    </>
  )
}

export default Product