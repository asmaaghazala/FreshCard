import React from "react";
import NotfoundImage from "../../assets/images/error.svg"

export default function Notfound(){
    return(
        <>
        <img src={NotfoundImage} className="mx-auto pt-10" alt="" />
        </>
    )
}