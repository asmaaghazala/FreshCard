import React, { useContext } from 'react'
import { cartContext } from '../Context/Cart.Context'

export default function CartItem({productInfo}) {
    let {removeProductFromCart,updateProductCount} = useContext(cartContext)
    const {count,price,product} = productInfo
    const {title,category,imageCover,id} = product
  return (
    <>
   <div className='flex gap-2'>
   <div className='cartItem flex items-center justify-between bg-gray-100 py-4 px-6 rounded-lg flex-grow'>
        <img src={imageCover} alt="" className='w-24 h-24 object-cover rounded-full border-white border-2'/>
        <h3 className='text-gray-700 text-lg font-semibold'>{title}</h3>
        <h4 className='text-gray-500 font-semibold'>{category.name}</h4>
        <div className='count flex gap-5 items-center'>
            <span className='text-lg font-semibold text-gray-700'>{count}</span>
            <div className='icons space-y-2'>
                <div
                onClick={()=>{
                  updateProductCount({productId:id,count:count+1})
                }}
                className="plus cursor-pointer w-6 h-6 rounded-full bg-gray-700 text-white flex items-center justify-center"><i className="fa-solid fa-plus"></i></div>
                <div
                onClick={()=>{
                  updateProductCount({productId:id,count:count-1})
                }}
                className="minus cursor-pointer w-6 h-6 rounded-full bg-gray-700 text-white flex items-center justify-center"><i className="fa-solid fa-minus"></i></div>
            </div>
            
        </div>
<span className='text-gray-700 font-semibold text-xl'>{price} L.E</span>
    </div>
    <button
    onClick={()=>{
        removeProductFromCart({productId: id})
    }}
     className='rounded-md bg-gray-100 hover:bg-gray-200 transition-colors duration-300 p-3'><i className="fa-solid fa-xmark"></i></button>
   </div>
    </>
  )
}
