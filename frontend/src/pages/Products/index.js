import React from "react"
import Carousel from "./Components/Carousel"
import Navbar from "../Navbar/Navbar"
import logo from "../Navbar/Assets/logo.png"
import styles from "./Style/index.module.css"

function Products() {
  return (
    <>
    <div className={styles.imgcon}>
    <img src={logo} alt="react logo" style={{ 
      width: '180px',
      height: '85px',
      position:'absolute',
      paddingLeft:'15px',
      paddingTop:'10px'}} />
      </div>
      <Navbar/>
      <Carousel />
    </>
  )
}

export default Products