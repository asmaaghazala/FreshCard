import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';

export default function CategorySlider(){
    const [categories,setCategories] = useState(null)

    async function getCategories() {
        const options = {
            url:"https://ecommerce.routemisr.com/api/v1/categories",
            method:"GET"
        }
        let {data}  = await axios.request(options)
        setCategories(data.data)
    }

    useEffect(()=>{
        getCategories()
    },[])

    return<>
    {!categories ?  <Loading/> :  <div>
        <h2 className="mb-5 font-semibold text-xl text-gray-700">
            <i className="fa-solid fa-layer-group text-white bg-primary p-3 rounded-full object-contain text-lg"></i> Shop Popular Category</h2>
        <Swiper slidesPerView={6} loop={true} className="mb-10">
            {categories.map((category)=> <SwiperSlide key={category._id}>
                    <img src={category.image} alt="" className="w-full h-40 object-cover cursor-pointer rounded-md shadow-lg" />
                    <h3 className="text-lg font-semibold text-center pt-3 text-cyan-900 cursor-pointer drop-shadow-lg">
                        <i className="fa-solid fa-layer-group"></i> {category.name}</h3>
                </SwiperSlide>)}
        </Swiper></div>
        
    }
    </>
}