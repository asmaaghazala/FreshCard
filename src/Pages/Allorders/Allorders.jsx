import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { tokenContext } from '../../Components/Context/Token.Context'
import { jwtDecode } from 'jwt-decode'
import Loading from '../../Components/Loading/Loading'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'


export default function Allorders() {

  const [orders,setOrders]= useState(null)
  const {userToken} = useContext(tokenContext)
  let {id} = jwtDecode(userToken)

  async function getUserOrders(){
   try {
    const options = {
      url:`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
      method:"GET"
    }
    let {data} = await axios.request(options)
    setOrders(data)
    console.log(data)
   } catch (error) {
    console.log(error)
   }
  }

  useEffect(()=>{
    getUserOrders()
  },[])

  return (
    <>
      <Helmet>
        <title>All Orders</title>
    </Helmet>
   {orders?( <section className='space-y-4'>
      {orders.map((order)=><div key={order.id} className='order p-4 border-2 border-gray-500 border-dashed border-opacity-25 rounded-lg'>
       <header className='flex items-center flex-col lg:flex-row justify-between border-b-2 gap-5 lg:gap-32 border-dashed border-opacity-25 pb-5'>
        <div className='flex items-center justify-between lg:w-1/2 w-full'>
        <div className='flex items-center justify-center gap-2'>
        <h2 className='font-semibold text-gray-700 text-lg'>Order ID</h2>
        <span className='text-gray-500 font-semibold'>#{order.id}</span>
        </div>
        <div>
          <h2 className='font-semibold text-gray-700 text-lg'>Placed on: <span className='text-gray-500 font-semibold'>{(order.createdAt).slice(0,10)}</span></h2>
        </div>
        </div>
       <div className='flex items-center justify-between lg:w-1/2 w-full'>
       <div>
          <h2 className='font-semibold text-gray-700 text-lg'>Payment: <span className='text-gray-500 font-semibold'>{(order.paymentMethodType).slice(0,10)}</span></h2>
        </div>
        <div>
          {order.isPaid?(
            <span className='btn-primary bg-lime-500 mx-2 text-white font-semibold font-cairo inline-block px-3 py-1'>
            Paid
          </span>
          ):(<span className='btn-primary bg-red-500 mx-2 text-white font-semibold font-cairo inline-block px-3 py-1'>
            Unpaid
          </span>)}
          
          {order.isDelivered?(
            <span className='btn-primary bg-lime-500 text-white font-semibold font-cairo inline-block px-3 py-1'>
             Delivered
          </span>
          ):(<span className='btn-primary bg-blue-500 text-white font-semibold font-cairo inline-block px-3 py-1'>
            Out for delivery
          </span>)}
        </div>
       </div>
       </header>
       <div className='grid md:gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 mt-4'>
      {order.cartItems.map((item)=> ( <div key={item._id} className='product-item p-3 rounded-lg'>
          <img src={item.product.imageCover} alt="" className='w-full'/>
          <h3 className='text-lg font-semibold line-clamp-2 hover:text-gray-600'><Link to={`/product/${item.product.id}`}>{item.product.title}</Link></h3>
          <div className=' mt-2'>
            <p className='font-bold text-gray-600 '><span className=''>Quantity:</span> 
            <span className='font-semibold text-primary text-lg'> {item.count}</span></p>
            <p className='font-bold text-gray-600 '><span className=''>Price:</span> 
            <span className='font-semibold text-primary text-lg'> {item.price} EGP</span></p>
          </div>
        </div>))}
       </div>
       <p className='text-lg mt-5 font-semibold border-t-2 border-dashed border-opacity-25 pt-5'>Your Total order price is <span className=' text-primary'>{order.totalOrderPrice} EGP</span></p>
      </div>)}
    </section>)
    :(<Loading/>)

   }
    </>
  )
}
