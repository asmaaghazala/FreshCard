import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { tokenContext } from "../Context/Token.Context";

export default function ProtectedRoute({children}){
    const {userToken}=useContext(tokenContext)

   if(userToken){
    return children
   }else{
    return <Navigate to="/login"/>
   }
}