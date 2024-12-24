import React, { createContext, useContext, useState } from 'react'
import { tokenContext } from './Token.Context'
import axios from 'axios'
import toast from 'react-hot-toast'

export const wishContext = createContext(0)

export default function WishlistProvider({children}) {

    const {userToken} = useContext(tokenContext)
    const [wishInfo,setWishInfo] = useState(null)

    async function addProductToWishlist({productId}){
      let toastid = toast.loading("Adding product........")
    try {
      const options = {
          url:"https://ecommerce.routemisr.com/api/v1/wishlist",
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
         getWishProducts()
      }
      
    } catch (error) {
      console.log(error)
    }finally{
      toast.dismiss(toastid)
    }

  }

  async function getWishProducts(){ 
    try {
        const options = {
            url:"https://ecommerce.routemisr.com/api/v1/wishlist",
            method:"GET",
            headers:{
                token: userToken
            },
          
        }
        let {data} = await axios.request(options)
        setWishInfo(data)
        console.log(data)
      } catch (error) {
        console.log(error)
      }
}

async function removeProductFromWishlist({productId}){
  let toastId= toast.loading("Removing Product From Wishlist......")
try {
const options = {
  url:`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
  method:'DELETE',
  headers:{
      token:userToken,
  },
}
let {data} = await axios.request(options)
if(data.status==="success"){
  getWishProducts()
  console.log(data)
  toast.success("Product has been removed")
}
} catch (error) {
console.log(error)
}finally{
toast.dismiss(toastId)
}
}


  return <wishContext.Provider value={{addProductToWishlist,getWishProducts,wishInfo,setWishInfo,removeProductFromWishlist}}>
    {children}
  </wishContext.Provider>
}
