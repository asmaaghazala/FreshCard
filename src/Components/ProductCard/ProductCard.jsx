import React, { useContext, useState } from "react";
import { cartContext } from "../Context/Cart.Context";
import { Link } from "react-router-dom";
import { wishContext } from "../Context/WishlistContext";

export default function ProductCard({productInfo}){
    const {images,title,price,category,ratingsAverage,id} = productInfo
    let {addProductToCart}=useContext(cartContext)
   const {addProductToWishlist,removeProductFromWishlist}=useContext(wishContext)
   const [favIcon,setFavIcon] = useState(false)


  function changeFavIcon(favIcon){
   if(favIcon===true){
    console.log("red")
    setFavIcon(favIcon)
   }else{
    console.log("white")
    setFavIcon(favIcon)
   }
  }

    return<>
    <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2 shadow-lg rounded-md overflow-hidden">
        <div className="relative group">
            <img src={images[0]} alt="" className="w-full object-contain"/>
            <div className="absolute flex gap-2 justify-center items-center layer w-full h-full left-0 top-0 bg-black bg-opacity-15 opacity-0 group-hover:opacity-100 group-hover:transition group-hover:duration-300">
                <div
                 onClick={() => {
                    if (!favIcon) {
                        addProductToWishlist({ productId: id });

                    } else {
                      removeProductFromWishlist({ productId: id });

                    }
                    changeFavIcon(!favIcon);
                  }}
                className={`icon cursor-pointer text-sm hover:scale-110 transition-transform duration-300 hover:rotate-6 w-10 h-10 rounded-full bg-primary flex items-center justify-center ${
                    favIcon ? "text-red-500" : "text-white"
                  }`}
                > 
                <i className="fa-solid fa-heart"></i>
                </div>
                <div
                onClick={()=>{
                    addProductToCart({productId:id})
                }}
                 className="icon cursor-pointer text-sm hover:scale-110 transition-transform duration-300 hover:rotate-6 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
                <i className="fa-solid fa-cart-shopping"></i>
                </div>
                <Link to={`/product/${id}`} className="icon cursor-pointer text-sm hover:scale-110 transition-transform duration-300 hover:rotate-6 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
                <i className="fa-solid fa-eye"></i>
                </Link>
            </div>
        </div>
        <div className="p-3">
            <h3 className="text-primary font-semibold text-sm">{category.name}</h3>
            <h2 className="text-lg font-semibold line-clamp-2">{title}</h2>
            <div className="flex items-center justify-between mt-3">
                <span className="text-primary font-bold text-lg">{price} L.E</span>
                <div className="flex items-center gap-1">
                    <i className="fa-solid fa-star text-yellow-500"></i>
                    <span>{ratingsAverage}</span>
                </div>
            </div>
        </div>
    </div>
    </>
}