import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { wishContext } from '../../Components/Context/WishlistContext'
import Loading from '../../Components/Loading/Loading'
import { cartContext } from '../../Components/Context/Cart.Context'

export default function Wishlist() {

  const {wishInfo,getWishProducts, removeProductFromWishlist}= useContext(wishContext)
  const {addProductToCart} = useContext(cartContext)

  useEffect(()=>{
    getWishProducts()
  },[])


  return (
    <>
    {wishInfo===null? <Loading/>:(<div className=' '>
      <div className='flex items-center gap-2 pb-4'>
            <h2 className='font-bold text-2xl text-slate-700'>Favorite Products</h2>
            <div 
            className='w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full'>
            <i className="fa-solid fa-heart"></i>
            </div>
        </div>
<div className='bg-slate-100 py-3 px-10 w-full rounded-xl '>

      {wishInfo.count===0?( <div className='text-center h-[300px] flex items-center justify-center flex-col'>
           <h2 className='mb-6 text-lg font-semibold text-gray-500'>There are not products yet!</h2>
           <Link to="/" className=" btn-primary group hover:bg-opacity-80 transition-colors duration-300">
           <i className="fa-solid fa-spinner group-hover:animate-spin"></i> Add your first product to favorite</Link>
           </div>)
      :(<>{wishInfo.data.map((product)=>( <><div className='flex items-center justify-between flex-col gap-y-4 lg:flex-row mt-6' key={product._id}>
        <div className='flex items-center justify-center gap-5'>
          <img src={product.imageCover} alt="" className="w-40 rounded-xl shadow-md object-contain" />
          <div>
            <h2 className='font-extrabold text-xl text-gray-800'><Link to={`/product/${product.id}`}>{product.title}</Link></h2>
           <p className='font-medium'>Rate: <i className="fa-solid fa-star text-yellow-500"></i> <span className='text-primary font-bold'>{product.ratingsAverage}</span></p>
           <p className='my-1'>Price: <span className='text-primary font-bold'> EGP {product.price}</span></p>
           <p className='text-sm font-bold text-gray-500'>{product.category.name} | {product.brand.name}  |<span className='text-primary'> Avilable</span></p>
          </div>
        </div>
        <div className='flex gap-3'>
          <button
           onClick={()=>{
            addProductToCart({productId:product._id})
        }}
          className='= btn-primary hover:bg-opacity-85'><i className="fa-solid fa-cart-plus"></i> Add to Cart</button>
          <button
          onClick={()=>{
            removeProductFromWishlist({productId:product._id})
          }}
          className='btn-primary bg-red-600 hover:bg-opacity-85'><i className="fa-regular fa-trash-can"></i> Remove</button>
        </div>
      </div>
    </>
      ))
      }
    
      </>)}
  
        </div>
</div>)}

    </>

  )
}
