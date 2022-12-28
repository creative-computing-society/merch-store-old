import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import axios from "axios"
import ProductCarousel from './Components/ProductCarousel'
import ProductDetails from './Components/ProductDetails'
import Navbar from "../Navbar/Navbar"
import styles from "./Style/product.module.css"
import logo from "./Assets/logo.png"

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
      <img src={logo} alt="react logo" style={{
        width: '180px',
        height: '85px',
        position: 'absolute',
        paddingLeft: '15px',
        paddingTop: '10px'
      }} />
      <Navbar />
      <div className={styles.container}>
        
        <ProductDetails details={details} />
      </div>
    </>
  )
}

export default Product