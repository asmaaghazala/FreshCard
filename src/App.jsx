import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Login from "./Pages/Login/LOgin";
import Register from "./Pages/Register/Register";
import Notfound from "./Pages/NotFound/Notfound";
import Home from "./Pages/Home/Home";
import Offline from "./Components/Offline/Offline";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import TokenProvider from "./Components/Context/Token.Context";
import CartProvider from "./Components/Context/Cart.Context";
import Cart from "./Pages/Cart/Cart";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import Checkout from "./Pages/Checkout/Checkout";
import Allorder from "./Pages/Allorders/Allorders";
import Online from "./Components/Online/Online";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Categories from "./Pages/Categories/Categories";
import Wishlist from "./Pages/Wishlist/Wishlist";
import Brands from "./Pages/Brands/Brands";
import WishlistProvider from "./Components/Context/WishlistContext";
import CategoryProducts from "./Pages/CategoryProducts/CategoryProducts";
import Products from "./Pages/Products/Products";
import CategoryProvider from "./Components/Context/Filteration.context";
import BrandProducts from "./Pages/BrandProducts/BrandProducts";
import ForgetPassword from "./Pages/ForgetPassword/ForgetPassword";
import VerifyCode from "./Pages/VerifyCode/VerifyCode";
import CreateNewPassword from "./Pages/CreateNewPassword/CreateNewPassword";

export default function App() {
  
const routes = createBrowserRouter([
  {path:"/", element: <ProtectedRoute><Layout/></ProtectedRoute> , children:[
    {index:true , element:  <Home/>},
    {path:"/cart",element:<Cart/>},
    {path:"/product/:id",element:<ProductDetails/>},
    {path:"/checkout",element:<Checkout/>},
    {path:"/allorders",element:<Allorder/>},
    {path:"/categories", element:<Categories/>},
    {path:"/products", element:<Products/>},
    {path:"/category/:id", element:<CategoryProducts/>},
    {path:"/brands", element:<Brands/>},
    {path:"/brand/:id", element:<BrandProducts/>},
    {path:"/wishlist", element:<Wishlist/>},
    {path:"*" , element: <Notfound/>},
  ]},
  {path:"/", element:<Layout/>, children:[
    {path:"/login", element:<Login/>},
      {path:"/register" , element: <Register/>},
      {path:"/forget-password" , element: <ForgetPassword/>},
      {path:"/verifycode" , element: <VerifyCode/>},
      {path:"/create-newpassword" , element: <CreateNewPassword/>},
    ]}
])

const myClient = new QueryClient()

  return (
    <>
    <QueryClientProvider client={myClient}>
    <TokenProvider>
      <CartProvider>
        <WishlistProvider>
          <CategoryProvider>
          <RouterProvider router={routes}></RouterProvider>
    <Toaster/>  
    </CategoryProvider>
        </WishlistProvider>
    
    </CartProvider>
    </TokenProvider>
    
    <ReactQueryDevtools initialIsOpen={false} position="right"/>


    </QueryClientProvider>
    <Offline>    
      <div className="fixed bg-slate-200 rounded-lg w-72 h-10 z-50 right-0 bottom-3 flex items-center justify-center ">
        <span className="text-center "><i className="fa-solid fa-wifi"></i> Check your internet connection</span>
    </div>
    </Offline>
    </>
  )
}

