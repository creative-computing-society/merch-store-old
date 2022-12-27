import React, {useState, useEffect} from 'react'
import axios from "axios"
import ProductCarousel from './Components/ProductCarousel'
import ProductDetails from './Components/ProductDetails'


function Product() {

  
  const [details, setDetails] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("")
      setDetails(res)
    }

    fetchData();
  }, [])


  return (
    <>
        <img src="https://picsum.photos/400/500" alt="" />
        <ProductCarousel />
        <ProductDetails details={details} />
    </>
  )
}

export default Product