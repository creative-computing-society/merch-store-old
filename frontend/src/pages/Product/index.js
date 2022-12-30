import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import axios from "axios"
import ProductCarousel from './Components/ProductCarousel'
import ProductDetails from './Components/ProductDetails'
import Navbar from "../Navbar/Navbar"
import styles from "./Style/product.module.css"
import logo from "../Navbar/Assets/logo.png"

import { api_url } from '../../config'

function Product() {
  const params = useParams()
  const product_id = params.id

  const [details, setDetails] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token")

      const config = {
        headers: {
          "Authorization": `Token ${token}`
        }
      }

      const res = await axios.get(`${api_url}product/${product_id}`, config)
      setDetails(res.data)
    }

    fetchData();
  }, [])

  // useEffect(() => {console.log(details)}, [details])


  return (
    <>
      <Navbar />
      <div className={styles.container}>
        
        <ProductDetails details={details} />
      </div>
    </>
  )
}

export default Product