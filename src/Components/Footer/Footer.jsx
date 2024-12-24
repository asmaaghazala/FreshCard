import React from "react"
import pay1 from "../../assets/images/amazon-pay.png"
import pay2 from "../../assets/images/paypal.png"
import pay3 from "../../assets/images/American-Express-Color.png"
import pay4 from "../../assets/images/mastercard.webp"
import googlestore from "../../assets/images/get-google-play.png"
import applestore from "../../assets/images/get-apple-store.png"

export default function Footer(){
    return (
    <>
    <footer className="bg-slate-200 py-4 absolute left-0 right-0 bottom-0 px-4">
        <div className="container">
            <h2 className="capitalize text-2xl font-semibold">Get the freshcart App</h2>
            <p className="my-3">Wel will send you a link, open it on your phone to download the app.</p>
            <div className="flex gap-4">
            <input type="text" className="form-control flex-grow" placeholder="Email...." />
            <button className="btn-primary">share app link</button>
            </div>
            <div className="flex justify-between items-center mt-4 flex-col md:flex-row">
                <div className="flex gap-3 items-center">
                    <span>Payment Partners</span>
                    <div className="flex gap-1 md:gap-4 items-center flex-col lg:flex-row">
                        <div className="flex items-center md:gap-3">
                         <img src={pay1} className="w-16" alt="" />
                        <img src={pay2} className="w-16" alt="" />   
                        </div>
                        <div className="flex items-center md:gap-3">
                          <img src={pay3} className="w-16" alt="" />
                        <img src={pay4} className="w-16" alt="" />   
                        </div>
                       
                    </div>
                </div>
                <div className="flex items-center md:gap-4">
                    <span>Get deliveries with Freshcart</span>
                    <div className="flex gap-3 md:gap-5 items-center justify-center">
                        <img src={applestore} className="w-20" alt="" />
                        <img src={googlestore} className="w-20" alt="" />
                    </div>
                </div>
            </div>
        </div>
    </footer>
    </>
    );
}