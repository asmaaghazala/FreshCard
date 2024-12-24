import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import Loading from '../../Components/Loading/Loading';
import { useParams } from 'react-router-dom';
import { cartContext } from '../../Components/Context/Cart.Context';
import "react-image-gallery/styles/css/image-gallery.css";
import ReactImageGallery from 'react-image-gallery';
import ProductCard from '../../Components/ProductCard/ProductCard';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import { Helmet } from 'react-helmet';
import { wishContext } from '../../Components/Context/WishlistContext';

export default function ProductDetails() {

    const [productDetails,setProductDetails] = useState(null)
    const [relatedProducts,setRelatedProducts] = useState(null)
    const {addProductToCart} = useContext(cartContext)
    const {addProductToWishlist,removeProductFromWishlist}=useContext(wishContext)
    const [favIcon,setFavIcon] = useState(false)
    
    
    let{id} = useParams()

    async function getProductDetails(){
        try {
            const options={
                url:`https://ecommerce.routemisr.com/api/v1/products/${id}`,
                method:"GET"
            };
            let {data} = await axios.request(options)
            setProductDetails(data.data)
            console.log(data.data)
        } catch (error) {
            console.log(error)
        }
    }

    async function getRelatedProducts(){
        try {
            const options={
                url:`https://ecommerce.routemisr.com/api/v1/products?category[in]=${productDetails.category._id}`,
                method:"GET"
            };
            let {data} = await axios.request(options)
            setRelatedProducts(data.data)
        
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getProductDetails()
    },[id])

    useEffect(()=>{
        if(productDetails===null) return
        getRelatedProducts()
    },[productDetails])

    function changeFavIcon(favIcon){
        if(favIcon===true){
         console.log("red")
         setFavIcon(favIcon)
        }else{
         console.log("white")
         setFavIcon(favIcon)
        }
       }

  return (
    <>
     <Helmet>
        <title>Product Details</title>
    </Helmet>
  {productDetails?(
    <>
     <Helmet>
        <title>{productDetails.title}</title>
    </Helmet>
      <section className='grid grid-cols-12 gap-12 px-10 pl-20 '>
      <div className='col-span-12 sm:col-span-6 lg:col-span-4'>
          <ReactImageGallery showFullscreenButton={false} showNav={false} showPlayButton={false} items={productDetails.images.map((image)=>{
            return {original:image,
            thumbnail:image}
          })}/>
      </div>
      <div className='col-span-12 sm:col-span-6 lg:col-span-8 space-y-4 flex items-start justify-center flex-col h-3/4'>
         <div className=''>
         <h2 className='text-3xl font-semibold text-gray-700'>{productDetails.title}</h2>
         <h3 className='text-primary font-bold mt-3 text-sm'>{productDetails.category.name}</h3>
         <p className='mt-3 font-bold text-blue-950 text-sm'>{productDetails.brand.name} | <span className='text-green-600 '>Available</span></p>
         <div className='mt-2 text-cyan-900 font-bold'>
              <span><span className='text-cyan-950 font-bold mr-2 text-lg'>Rating:</span> 
              <i className='fa-solid fa-star text-yellow-400 mr-2'></i>{productDetails.ratingsAverage}</span>
          </div>
         </div>
          <p className='text-gray-500 font-semibold'>{productDetails.description}</p>
      <div className='flex justify-between items-center w-3/4'>
          <span className='text-primary font-bold text-md'> <span className='text-cyan-950 font-bold mr-2 text-lg'>Price:</span>
             EGP  {productDetails.price}
          </span>
         
      </div>
      <div className='flex items-center gap-4 w-full'>
      <button 
        onClick={() => {
            if (!favIcon) {
                addProductToWishlist({ productId: id });

            } else {
              removeProductFromWishlist({ productId: id });

            }
            changeFavIcon(!favIcon);
          }}
      className={`btn-primary hover:bg-opacity-85 hover:animate-pulse px-6  ${favIcon ? "text-red-500" : "text-white"}`}>
        <i className="fa-solid fa-heart-circle-plus"></i></button>
      <button
        onClick={()=>{
            addProductToCart({productId:id})
        }}
      className='btn-primary group w-3/4 font-semibold transition-colors duration-300 bg-primary hover:bg-opacity-85 text-white'>
        <i className="fa-solid fa-cart-arrow-down group-hover:animate-wobble"></i> Add to Cart</button>
      </div>
      </div>
  </section>
  <section className='my-10'>
    <h2 className='text-2xl font-semibold text-gray-600 mb-5'>Related Products</h2>
    {relatedProducts?<Swiper slidesPerView={5} spaceBetween={15}>
        {relatedProducts.map((product)=><SwiperSlide key={product.id}>
            <ProductCard  productInfo={product} key={product._id}/>
            </SwiperSlide>
        )}
    </Swiper>
    :<Loading/>}
  </section>
  </>
  ):(<Loading/>)}
    </>
  )
}
