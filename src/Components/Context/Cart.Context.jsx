import { createContext, useContext, useState } from "react";
import { tokenContext } from "./Token.Context";
import axios from "axios";
import toast from "react-hot-toast";

export const cartContext = createContext(0)

export default function CartProvider({children}){
    let {userToken} = useContext(tokenContext)

    const [cartInfo,setCartInfo] = useState(null)

    async function addProductToCart({productId}){
        let toastid = toast.loading("Adding product........")
      try {
        const options = {
            url:"https://ecommerce.routemisr.com/api/v1/cart",
            method:"POST",
            headers:{
                token: userToken
            },
            data:{
                productId
            }
        }
        let {data} = await axios.request(options)
        if(data.status==="success"){
            toast.success(data.message)
            getCartProducts()
        }
        
      } catch (error) {
        console.log(error)
      }finally{
        toast.dismiss(toastid)
      }

    }

    async function getCartProducts(){ 
        try {
            const options = {
                url:"https://ecommerce.routemisr.com/api/v1/cart",
                method:"GET",
                headers:{
                    token: userToken
                },
              
            }
            let {data} = await axios.request(options)
            setCartInfo(data)
          
            
          } catch (error) {
            console.log(error)
          }
    }

    async function removeProductFromCart({productId}){
        let toastId= toast.loading("Deleting Product......")
try {
    const options = {
        url:`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        method:'DELETE',
        headers:{
            token:userToken,
        },
    }
    let {data} = await axios.request(options)
    if(data.status==="success"){
        setCartInfo(data)
        toast.success("Product has been deleted")
    }
} catch (error) {
    console.log(error)
}finally{
    toast.dismiss(toastId)
  }
    }

    async function clearCart(){
   try {
    const options={
        url:"https://ecommerce.routemisr.com/api/v1/cart",
        method:"DELETE",
        headers:{
            token:userToken
        },
    }
    let {data} = await axios.request(options)
    if(data.message==='success'){
        setCartInfo({
            numOfCartItems:0
        });
    }
   } catch (error) {
    console.log(error)
   }
    }

    async function updateProductCount({productId,count}){
        try {
            const options={
                url:`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                method:"PUT",
                headers:{
                    token:userToken
                },
                data:{
                    count
                }
            }
            let {data} = await axios.request(options)
            if(data.status==='success'){
               setCartInfo(data)
            }
           } catch (error) {
            console.log(error)
           }
    }

    return<cartContext.Provider value={{addProductToCart,getCartProducts,cartInfo,setCartInfo,removeProductFromCart,clearCart,updateProductCount}}>
        {children}
    </cartContext.Provider>
}