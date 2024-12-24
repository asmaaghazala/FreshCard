import axios from 'axios'
import React, { createContext, useState } from 'react'

export const categoryContext = createContext(0)

export default function CategoryProvider({children}) {

    const [categories,setCategories] = useState(null)
    const [categoryProducts,setCategoryProducts] = useState(null)
    const [brandProducts,setBrandProducts] = useState(null)
    const [filter,setFilter] = useState(false)
    const [products,setProducts] = useState(null)
  
  async function getCategories(){
    const options = {
      url:"https://ecommerce.routemisr.com/api/v1/categories",
      method:"GET"
    }
    let {data} = await axios.request(options)
    setCategories(data.data)
    console.log(data.data)
  }

  
  async function getCategoryAllProducts({categoryId}){
    try {
      const options= {
          url:`https://ecommerce.routemisr.com/api/v1/products?category[in]=${categoryId}`,
          method:'GET'
      }
      let {data} =await axios.request(options)
      setCategoryProducts(data.data)
      console.log(data.data)
    } catch (error) {
      console.log(error)
    }
  }

  async function getBrandProducts({brandId}){
    try {
      const options = {
        url:`https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`,
        method:"GET",
      }
      let {data} = await axios.request(options)
      setBrandProducts(data.data)
      console.log(data.data)
    } catch (error) {
      console.log(error)
    }
  }
    
  async function getShortSProducts(){
    try {
        const options = {
            url:"https://ecommerce.routemisr.com/api/v1/products?sort=+price",
            method:"GET"
        }
        let {data} = await axios.request(options)
        setProducts(data.data)
        console.log(data.data)
    } catch (error) {
        console.log(error)
    }
} 
  async function getShortProducts(){
    try {
        const options = {
            url:"https://ecommerce.routemisr.com/api/v1/products?sort=-price",
            method:"GET"
        }
        let {data} = await axios.request(options)
        setProducts(data.data)
        console.log(data.data)
    } catch (error) {
        console.log(error)
    }
} 
  async function getAllProducts(){
    try {
        const options = {
            url:"https://ecommerce.routemisr.com/api/v1/products",
            method:"GET"
        }
        let {data} = await axios.request(options)
        setProducts(data.data)
        console.log(data.data)
    } catch (error) {
        console.log(error)
    }
} 
  
  function changeFilter(filter){
   if(filter===true){
    console.log("open")
    setFilter(filter)
   }else{
    console.log("close")
    setFilter(filter)
   }
  }

  async function getDefactoProducts(){
    try {
      const options = {
        url:'https://ecommerce.routemisr.com/api/v1/products?brand=64089bbe24b25627a253158b',
        method:'GET'
      }
      let {data} = await axios.request(options)
      console.log(data.data)
      setProducts(data.data)
    } catch (error) {
      console.log(error)
    }
  }
  async function getSonyProducts(){
    try {
      const options = {
        url:'https://ecommerce.routemisr.com/api/v1/products?brand=64089f5824b25627a25315c7',
        method:'GET'
      }
      let {data} = await axios.request(options)
      console.log(data.data)
      setProducts(data.data)
    } catch (error) {
      console.log(error)
    }
  }
  async function getAdidasProducts(){
    try {
      const options = {
        url:'https://ecommerce.routemisr.com/api/v1/products?brand=64089c3924b25627a2531593',
        method:'GET'
      }
      let {data} = await axios.request(options)
      console.log(data.data)
      setProducts(data.data)
    } catch (error) {
      console.log(error)
    }
  }
  async function getCanonProducts(){
    try {
      const options = {
        url:'https://ecommerce.routemisr.com/api/v1/products?brand=64089fe824b25627a25315d1',
        method:'GET'
      }
      let {data} = await axios.request(options)
      console.log(data.data)
      setProducts(data.data)
    } catch (error) {
      console.log(error)
    }
  }
  async function getWomensProducts(){
    try {
      const options = {
        url:'https://ecommerce.routemisr.com/api/v1/products?category[in]=6439d58a0049ad0b52b9003f',
        method:'GET'
      }
      let {data} = await axios.request(options)
      console.log(data.data)
      setProducts(data.data)
    } catch (error) {
      console.log(error)
    }
  }
  async function getMensProducts(){
    try {
      const options = {
        url:'https://ecommerce.routemisr.com/api/v1/products?category[in]=6439d5b90049ad0b52b90048',
        method:'GET'
      }
      let {data} = await axios.request(options)
      console.log(data.data)
      setProducts(data.data)
    } catch (error) {
      console.log(error)
    }
  }
  async function getElecProducts(){
    try {
      const options = {
        url:'https://ecommerce.routemisr.com/api/v1/products?category[in]=6439d2d167d9aa4ca970649f',
        method:'GET'
      }
      let {data} = await axios.request(options)
      console.log(data.data)
      setProducts(data.data)
    } catch (error) {
      console.log(error)
    }
  }
  
  return <categoryContext.Provider value={{getCategories,getShortProducts,getShortSProducts,getCanonProducts,getAdidasProducts,getSonyProducts,getElecProducts,getAllProducts,getMensProducts,getWomensProducts,products,getDefactoProducts,brandProducts,setBrandProducts,categories,filter,setFilter,changeFilter,setCategories,getCategoryAllProducts,setCategoryProducts,categoryProducts,getBrandProducts}}>
    {children}
    </categoryContext.Provider>
  
}
