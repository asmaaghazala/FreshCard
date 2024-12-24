import React, { useEffect, useState } from "react";
import ProductCard from "../../Components/ProductCard/ProductCard";
import axios from "axios";
import Loading from "../../Components/Loading/Loading";
import HomeSlider from "../../Components/HomeSlider/HomeSlider";
import CategorySlider from "../../Components/CategorySlider/CategorySlider";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";


export default function Home(){


    async function getProducts(){
        const options={
            url:"https://ecommerce.routemisr.com/api/v1/products",
            method:"GET",
        }
    return  axios.request(options)
    }


let {data , isLoading,isErrors} = useQuery({
    queryKey:["products"],
    queryFn: getProducts,
    staleTime:60*60*1000,
    refetchOnMount:false,
    refetchInterval:3000,

})

if(isLoading) return <Loading/>


return<>
<Helmet>
    <title>FreshCart | Home Pge</title>
</Helmet>
<HomeSlider/>
<CategorySlider/>


<div className="grid grid-cols-12 gap-4">
    <h2 className="col-span-12 text-3xl font-bold text-center mb-7 drop-shadow-md text-cyan-900 before:bg-primary relative before:absolute before:w-52 before:h-1 before:-bottom-4 before:translate-x-1/2 before:right-1/2  ">Shop now by popular products</h2>
  {data.data.data.map((product ) =>(
        <ProductCard productInfo={product} key={product._id} />
    ))}
    </div>


</>
}