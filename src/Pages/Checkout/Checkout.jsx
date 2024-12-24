import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { cartContext } from '../../Components/Context/Cart.Context';
import { tokenContext } from '../../Components/Context/Token.Context';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Checkout() {

    const {cartInfo} = useContext(cartContext)
    const {userToken} = useContext(tokenContext)
    const navigate = useNavigate()
    const [paymentMethod,setPaymentMethod] = useState(null)

    const formik = useFormik({
        initialValues:{
            "shippingAddress":{
                "details": "",
                "phone": "",
                "city": ""
                }
        },
        onSubmit:(values)=>{
            if(paymentMethod==="cash")handleCashOrder(values)
                else handleOnlinePayment(values)
        }
    })

    async function handleCashOrder(values){
        let toastId = toast.loading("Creating order.....")
        try {
            const options={
                url:`https://ecommerce.routemisr.com/api/v1/orders/${cartInfo.cartId}`,
                method:"POST",
                headers:{
                    token:userToken
                },
                data:{
                    values
                }
            };
            let {data} = await axios.request(options)
            if(data.status==="success"){
                toast.success("Your order has been created")
                setTimeout(() => {
                     navigate("/allorders")

                }, 2000);
                
            }
        
        } catch (error) {
            console.log(error)
        }finally{
            toast.dismiss(toastId)
        }
    }


    async function handleOnlinePayment(values){
        let toastId = toast.loading("Redirect to payment platform.....")
        try {
            const options={
                url:`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartInfo.cartId}?url=${location.origin}`,
                method:"POST",
                headers:{
                    token:userToken
                },
                data:{
                    values
                }
            };
            let {data} = await axios.request(options)
           if(data.status==="success"){
            setTimeout(() => {
                location.href = data.session.url
            }, 2000);
           }
            
        } catch (error) {
            console.log(error)
        }finally{
            toast.dismiss(toastId)
        }
    }

    
  return (
    <>
    <Helmet>
        <title>Checkout page</title>
    </Helmet>
    <section>
        <h1 className='text-xl font-semibold text-gray-600 mb-4'>Shipping Address</h1>
        <form className='space-y-3 ' onSubmit={formik.handleSubmit}>
            <div className='city'>
                <input type="text" id="" className='form-control w-full' placeholder='City'
                value={formik.values.shippingAddress.city}
                onChange={formik.handleChange}
                name="shippingAddress.city" />
            </div>
            <div className='phone'>
                <input type="tel" id="" className='form-control w-full' placeholder='Phone'
                value={formik.values.shippingAddress.phone}
                onChange={formik.handleChange}
                name="shippingAddress.phone" />
            </div>
            <div className='details'>
                <textarea  className='form-control w-full' placeholder='Details'
                value={formik.values.shippingAddress.details}
                onChange={formik.handleChange}
                name="shippingAddress.details" ></textarea>
            </div>
            <button
            onClick={()=>{
                setPaymentMethod("cash")
            }}
            type='submit' className=' btn-primary bg-blue-500 hover:bg-blue-600 font-semibold'>Cash Order</button>
            <button 
            onClick={()=>{
                setPaymentMethod("online")
            }}
            type='submit' className=' btn-primary bg-lime-500 hover:bg-lime-600 font-semibold'>Online Payment</button>
        </form>
    </section>
  </>)
}


