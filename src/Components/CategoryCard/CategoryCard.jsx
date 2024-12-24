import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { categoryContext } from '../Context/Filteration.context'

export default function CategoryCard({categoryInfo}) {

    const {image,name,_id,slug} = categoryInfo
    const {getCategoryAllProducts} = useContext(categoryContext)
  return (
    <>
     <Link to={`/category/${slug}`} onClick={()=>{
      getCategoryAllProducts({categoryId:_id})
     }} className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2 rounded-md overflow-hidden cursor-pointer">
     <div className='text-center'>
     <div className='w-50 h-56 overflow-hidden p-5 shadow-lg rounded-lg group'>
        <img src={image} alt="" className='w-full h-full object-cover rounded-lg group-hover:scale-110 transition duration-500'/>
        </div>  
        <h2 className='mt-5 text-md font-bold text-primary'>{name}</h2>
     </div> 
     </Link>
    </>
    
  )
}
