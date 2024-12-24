import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import logo from '../../assets/images/freshcart-logo.svg'


// Import Swiper styles
import 'swiper/css';
import image1 from "../../assets/images/slider-image-1.jpeg"
import image2 from "../../assets/images/slider-image-2.jpeg"
import image3 from "../../assets/images/slider-image-3.jpeg"


export default function HomeSlider(){
    return<>

    <div className="grid grid-cols-12 mb-10 shadow-md rounded-md overflow-hidden ">
         <div className="col-span-8 relative cursor-pointer">
        <Swiper slidesPerView={1} loop={true} className="h-full w-full" >
        <SwiperSlide >
            <img src={image1} alt="" className="h-full w-full object-contain" />
        </SwiperSlide>
        <SwiperSlide >
            <img src={image2} alt="" className="h-full w-full object-contain" />
        </SwiperSlide>
        <SwiperSlide >
            <img src={image3} alt="" className="h-full w-full object-contain" />
        </SwiperSlide>
    </Swiper>
    <div className="absolute bottom-14 left-0 bg-white py-5 px-9 font-bold text-cyan-950 rounded-e-lg bg-opacity-70  z-30 shadow-md">
        <p>Wheather you are looking for the freshest produce,pantry staples,or specialty items</p>
        <p>Freshcart brings the supermarket to you, reducing the way you shop groceries</p>
    </div>
    <div className="absolute top-0 left-0 bg-white py-5 px-9 font-bold text-cyan-950 rounded-e-lg z-30 shadow-md">
        <img src={logo} alt="" />
    </div>
        </div>
        <div className="col-span-4 h-full object-contain w-full">
            <div className="h-1/2 w-full">
                <img src={image2} alt="" className="w-full h-full object-contain"  />
            </div>
            <div className="h-1/2 w-full">
                <img src={image3} alt="" className="w-full h-full object-contain"  />
            </div>
        </div>
    </div>
 
    </>
}