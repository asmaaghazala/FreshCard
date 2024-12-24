import React, { useContext, useEffect } from 'react'
import { cartContext } from '../../Components/Context/Cart.Context'
import Loading from '../../Components/Loading/Loading'
import CartItem from '../../Components/CartItem/CartItem'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

export default function Cart() {
    let {getCartProducts,cartInfo,clearCart} = useContext(cartContext)

    useEffect(()=>{
        getCartProducts()
    })

  return (
    <>
      <Helmet>
        <title>Cart page</title>
    </Helmet>
    {cartInfo===null?(<Loading/>):(<section>
        <div className='mb-5 flex items-center gap-4 font-bold text-2xl text-slate-700'>
        <i className="fa-brands fa-opencart"></i>
            <h2 className='before:absolute relative pl-4 before:w-0.5 before:h-3/4 before:bg-slate-600 before:-left-1 before:top-1/2  before:-translate-y-1/2'>Your Shopping Cart</h2>
            </div>
        {cartInfo.numOfCartItems===0?
       ( <div className='flex items-center justify-center flex-col bg-slate-100 py-10 rounded-xl h-[300px]'>
            <h2 className='text-lg font-semibold text-gray-500'>Oops, Your cart is empty. Start shopping now by clicking the button below and find something you love!</h2>
            <Link to="/" className=" btn-primary mt-5">Back to Home</Link>
        </div>)
            :
           (<><div className='space-y-4'>
            {cartInfo.data.products.map((product)=> (<CartItem key={product._id} productInfo={product}/>
            ))
            } 
            </div>
            <div className='mt-6 flex items-center justify-between'>
                <p className='text-xl text-gray-700 font-semibold'>Your Total Cart Price <span className='text-primary'>{cartInfo.data.totalCartPrice} L.E</span></p>
                <button
                onClick={clearCart}
                className=" bg-red-500 hover:bg-red-600 text-white btn-primary"><i className="fa-solid fa-trash"></i> Clear Cart</button>
            </div>
            <Link to="/checkout" ><button className='btn-primary w-full mt-10 text-xl font-bold'>Next Step</button> </Link>
            </>
            )}
        </section>)}
    </>
  )
}
