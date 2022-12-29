import { React, useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide} from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper";
import { Link } from "react-router-dom";
import axios from "axios";

// import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import styles from "../Style/carousel.module.css";

import { api_url } from "../../../config";

const url = api_url + "product/all/"

function Carousel() {
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
            <SwiperSlide className={styles.swiperSlide}>
              <Link to={`/product/${product.id}`}>
                <div>
                  <div><img src={product.image_url1} alt={product.name} className={styles.carouselImage} /></div>
                  <div className={styles.productName}>{product.name}</div>
                  <div>₹{product.price}</div>
                </div>
              </Link>
            </SwiperSlide>
        )
        
      }))
    }

    fetchData()

  }, [])


  useEffect(() => {console.log(products)}, [products])

  return (
    <Swiper
        id="carouselid"
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={1}
        loop={true}
        // autoplay={{
        //   delay: 5000,
        //   disableOnInteraction: false
        // }}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        breakpoints={{
          640: {
            // width: 640,
            slidesPerView: 3,
          },
         
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className={styles.swiper}
    >
        
        {products}

    </Swiper>
  )
}

export default Carousel