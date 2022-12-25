import { React, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper";


// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import styles from "../Style/carousel.module.css";


function Carousel() {
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
        modules={[Autoplay, EffectCoverflow, Pagination]}
        className={styles.swiper}
    >
        {/* <SwiperSlide><img src={img1} alt="ipsum1" /></SwiperSlide>
        <SwiperSlide><img src={img2} alt="ipsum2" /></SwiperSlide> */}
        <SwiperSlide className={styles.swiperSlide}>
          <img src={"https://picsum.photos/400/500"} alt="ipsum3" className={styles.carouselImage} />
        </SwiperSlide>
        <SwiperSlide className={styles.swiperSlide}>
          <img src={"https://picsum.photos/400/500"} alt="ipsum3" className={styles.carouselImage} />
        </SwiperSlide>
        <SwiperSlide className={styles.swiperSlide}>
          <img src={"https://picsum.photos/400/500"} alt="ipsum3" className={styles.carouselImage} />
        </SwiperSlide>
        <SwiperSlide className={styles.swiperSlide}>
          <img src={"https://picsum.photos/400/500"} alt="ipsum3" className={styles.carouselImage} />
        </SwiperSlide>
        <SwiperSlide className={styles.swiperSlide}>
          <img src={"https://picsum.photos/400/500"} alt="ipsum3" className={styles.carouselImage} />
        </SwiperSlide>
        {/* <SwiperSlide className={styles.swiperSlide}><img src="https://picsum.photos/300/400" alt="ipsum3" /></SwiperSlide>
        <SwiperSlide className={styles.swiperSlide}><img src="https://picsum.photos/300/400" alt="ipsum3" /></SwiperSlide> */}
    </Swiper>
  )
}

export default Carousel