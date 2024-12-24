import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import ProductCard from '../../Components/ProductCard/ProductCard'
import Loading from '../../Components/Loading/Loading'
import SlideFilter from '../../Components/SideFilter/SlideFilter'
import { categoryContext } from '../../Components/Context/Filteration.context'

export default function Products() {

    const {changeFilter,filter,getAllProducts,products} = useContext(categoryContext)


useEffect(()=>{
    getAllProducts()
},[])

  return (
    <>
   {products===null?(<Loading/>): 
( <>
<SlideFilter/>
<div className='relative border-t-2 border-b-2 py-5 mb-5'>
<h4 className='col-span-12 text-center uppercase text-2xl font-bold text-primary drop-shadow-md '>Products</h4>
<div
onClick={()=>{
changeFilter(!filter)
}}
 className='absolute right-24 top-1/2 -translate-y-1/2 text-2xl text-white w-12 h-12 shadow-xl cursor-pointer hover:bg-opacity-85 rounded-full bg-primary flex items-center justify-center '>
<i className="fa-solid fa-sliders"></i>
 </div>
</div>
<div className='grid grid-cols-12 gap-4'>
    {products.map((product)=> (<ProductCard productInfo={product} key={product._id}/>))}
   </div>
   </>)
   }
    </>
  )
}
