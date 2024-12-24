import React, { useContext, useEffect, useState } from 'react'
import Loading from '../../Components/Loading/Loading'
import axios from 'axios'
import { categoryContext } from '../../Components/Context/Filteration.context'
import { Link } from 'react-router-dom'

export default function Brands() {
const [brands,setBrands] = useState(null)
const {getBrandProducts} = useContext(categoryContext)

    async function getBrands(){

          const options = {
            url:"https://ecommerce.routemisr.com/api/v1/brands",
            method:"GET"
          }
          let {data} = await axios.request(options)
          setBrands(data.data)
        }
        
        useEffect(()=>{
          getBrands()
        },[])
   

  return (
    <>
    {brands===null? <Loading/> :  <div className="grid grid-cols-12 gap-5 px-10">
        <h4 className='col-span-12 text-center uppercase text-2xl font-bold text-primary drop-shadow-md border-t-2 border-b-2 py-5'>shop by brand</h4>
        {brands.map((brand)=>
    <Link to={`/brand/${brand.name}`}
    onClick={()=>{
      getBrandProducts({brandId:brand._id})
    }} 
    key={brand._id} className="col-span-6 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2 shadow-lg w-40 h-40 flex items-center justify-center hover:scale-125 transition duration-500 rounded-full cursor-pointer">
        <img src={brand.image} alt="" className='w-50 h-50 object-contain rounded-full'/>
        </Link>
    )}
    </div>}
  
    </>
  )
}
