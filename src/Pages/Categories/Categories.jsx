import React, { useContext, useEffect } from 'react'
import CategoryCard from '../../Components/CategoryCard/CategoryCard'
import Loading from '../../Components/Loading/Loading'
import { categoryContext } from '../../Components/Context/Filteration.context'

export default function Categories() {

const {categories,getCategories} = useContext(categoryContext)

useEffect(()=>{
  getCategories()
},[])

  return (
    <>
   
   {categories===null?<Loading/>:<div className="grid grid-cols-12 gap-5">
    <h4 className='col-span-12 text-center uppercase text-2xl font-bold text-primary drop-shadow-md border-t-2 border-b-2 py-5'>shop by category</h4>
    {categories.map((category)=><CategoryCard categoryInfo={category} key={category._id}/>)}
     </div>}
  
    </>
  )
}
