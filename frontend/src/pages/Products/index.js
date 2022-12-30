import React from "react"
import Carousel from "./Components/Carousel"
import Navbar from "../Navbar/Navbar"
import logo from "../Navbar/Assets/logo.png"
import styles from "./Style/index.module.css"

function Products() {
  return (
    <>
    <div className={styles.imgcon}>
      </div>
      <Navbar/>
      <Carousel />
    </>
  )
}

// export default Products