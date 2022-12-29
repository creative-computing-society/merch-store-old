import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import styles from "../Style/productCarousel.module.css";

// import required modules
import { Navigation } from "swiper";

function ProductCarousel(props) {
  return (
    <>
      {/* <img src="https://picsum.photos/300/400" alt="" /> */}
      <Swiper navigation={true} modules={[Navigation]} className={styles.mySwiper}>
        <SwiperSlide><img src={props.image_url1} alt="" /></SwiperSlide>
        <SwiperSlide><img src={props.image_url2} alt="" /></SwiperSlide>
      </Swiper>
    </>
  )
}

export default ProductCarousel