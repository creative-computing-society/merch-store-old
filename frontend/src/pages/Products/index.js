import React from "react"
import Carousel from "./Components/Carousel"
import Navbar from "../Navbar/Navbar"
import logo from "./Assets/logo.png"
function Products() {
  return (
    <>
    <img src={logo} alt="react logo" style={{ 
      width: '180px',
      height: '85px',
      position:'absolute',
      paddingLeft:'15px',
      paddingTop:'10px'}} />
      <Navbar/>
      <Carousel />
    </>
  )
}

export default Products