import React, { useContext, useEffect, useState } from "react"
import logo from '../../assets/images/freshcart-logo.svg'
import { Link, NavLink } from "react-router-dom";
import { tokenContext } from "../Context/Token.Context";
import { cartContext } from "../Context/Cart.Context";


export default function Navbar(){
    const {userToken,logout}=useContext(tokenContext)
    const {cartInfo,getCartProducts} = useContext(cartContext)
    const [dropMenu,setDropMenu] = useState(false)

    function dropNav(dropMenu){
        if(dropMenu===true){
            setDropMenu(dropMenu)
        }else{
            setDropMenu(dropMenu)
        }
    }

    useEffect(()=>{
        getCartProducts()
    },[])

    return(  
    <>
    <nav className="bg-slate-200 py-3 fixed top-0 right-0 left-0 z-50 ">
        <div className="container flex gap-8 ">
            <h1><a href="/">
            <img src={logo} alt="" />
            </a></h1>

            {userToken!==null?(
               <ul className={`flex items-center flex-col absolute w-full transition-all duration-300 left-0 bg-base-100 shadow-lg gap-y-2 py-5 
               lg:flex-row lg:static lg:bg-transparent lg:gap-y-0 lg:shadow-none lg:py-0 lg:w-auto ${dropMenu ? "top-14" : "-top-60"}`}>
                <li>
                    <NavLink to="/"  className={({ isActive }) =>
                                    isActive ? "bg-base-200 px-3 py-2 rounded-xl font-bold" : "px-3 py-2"
                                } >Home</NavLink>
                </li>
                <li>
                    <NavLink to="/products"  className={({ isActive }) =>
                                    isActive ? "bg-base-200 px-3 py-2 rounded-xl font-bold" : "px-3 py-2"
                                }>Products</NavLink>
                </li>
                <li>
                    <NavLink to="/categories"  className={({ isActive }) =>
                                    isActive ? "bg-base-200 px-3 py-2 rounded-xl font-bold" : "px-3 py-2"
                                }>Categories</NavLink>
                </li>
                <li>
                    <NavLink to="/brands"  className={({ isActive }) =>
                                    isActive ? "bg-base-200 px-3 py-2 rounded-xl font-bold" : "px-3 py-2"
                                }>Brands</NavLink>
                </li>
                <li>
                    <NavLink to="/allorders"  className={({ isActive }) =>
                                    isActive ? "bg-base-200 px-3 py-2 rounded-xl font-bold" : "px-3 py-2"
                                }>Orders</NavLink>
                </li>
                <ul className="flex gap-3 lg:hidden">
                <li>
                    <NavLink to="https://www.facebook.com">
                    <i className="fa-brands fa-facebook"></i>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="https://www.twitter.com">
                    <i className="fa-brands fa-twitter"></i>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="https://www.youtube.com">
                    <i className="fa-brands fa-youtube"></i>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="https://www.tiktok.com">
                    <i className="fa-brands fa-tiktok"></i>
                    </NavLink>
                </li>
                <li>
                    <a to="https://www.instagram.com">
                    <i className="fa-brands fa-instagram"></i>
                    </a>
                </li>
                </ul>
            </ul>   
            ):null
              }

            <ul className="flex gap-6 items-center ms-auto">
                {userToken !==null?(
                     <> 
                        <li className=" hover:animate-wobble ">
                    <Link to="/wishlist" className="relative">
                    <i className="fa-regular fa-heart text-2xl"></i>
                    </Link>
                    </li>
                     <li className="mr-5">
                    <Link to="/cart" className="relative">
                    <i className="fa-solid fa-cart-shopping text-2xl"></i>
                    <div className="bg-primary w-5 h-5 flex items-center justify-center rounded-full font-semibold absolute -top-3 -right-2 text-white">
                        {cartInfo===null?(
                            <i className="fa-solid fa-spinner fa-spin"></i>
                        ):(<span className="text-sm">
                            {cartInfo.numOfCartItems}</span>)}
                    </div>
                    </Link>
                </li> 
             
                    </> 
                    ):null}
               <li className="cursor-pointer lg:hidden "
               onClick={()=>
                dropNav(!dropMenu)
               }>
               <i className="fa-solid fa-bars text-2xl"></i>
               </li>
                <li className="hidden lg:flex">
                    <NavLink to="https://www.facebook.com">
                    <i className="fa-brands fa-facebook"></i>
                    </NavLink>
                </li>
                <li className="hidden lg:flex">
                    <NavLink to="https://www.twitter.com">
                    <i className="fa-brands fa-twitter"></i>
                    </NavLink>
                </li>
                <li className="hidden lg:flex">
                    <NavLink to="https://www.youtube.com">
                    <i className="fa-brands fa-youtube"></i>
                    </NavLink>
                </li>
                <li className="hidden lg:flex">
                    <NavLink to="https://www.tiktok.com">
                    <i className="fa-brands fa-tiktok"></i>
                    </NavLink>
                </li>
                <li className="hidden lg:flex">
                    <a to="https://www.instagram.com">
                    <i className="fa-brands fa-instagram"></i>
                    </a>
                </li>
            </ul>

            <ul className="flex gap-6 items-center">
                {userToken==null?(
                    <>
                      <li>
                    <NavLink to="/login">Login</NavLink>
                </li>
                <li>
                    <NavLink to="/Register">Sign Up</NavLink>
                </li>
                </>
                ):(
               
                <li className="cursor-pointer">
                    <span onClick={logout}><i className="fa-solid fa-right-from-bracket "></i></span>
                </li>
              )

              }
                
            </ul>
        </div>
    </nav>
    </>
    );
}