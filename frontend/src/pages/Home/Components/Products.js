import React, { useState, useEffect } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom';
import styles from "../Style/products.module.css"

import { api_url } from '../../../config';
const url = api_url + "product/all/"

function Products() {
  const [products, setProducts] = useState();

  useEffect(() => {
    const token = localStorage.getItem("token")

    const config = {
      headers: {
        "Authorization": `Token ${token}`
      }
    }

    const fetchData = async () => {
      const res = await axios.get(url, config)
      const data = res.data
      console.log(data)
      setProducts(data.map(product => {

        return (
          <div className={styles.product}>
            <Link to={`/product/${product.id}`}>
                <div><img src={product.image_url1} alt={product.name} className={styles.carouselImage} /></div>
            </Link>
            <div className={styles.productName}>
            <div ><b>{product.name}</b></div>
            <div >₹{product.price}</div>
            </div>
          </div>
        )

      }))
    }

    fetchData()

  }, [])

  return (
    <div class={styles.products}>
      {products}
    </div>
  )
}

export default Products