import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup"
import { tokenContext } from "../../Components/Context/Token.Context";


export default function Login(){

    const {setUserToken}=useContext(tokenContext)

    const [errorMsg,setErrorMsg] = useState(null)
    const navigate = useNavigate()

    const passRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

    const validationSchema = Yup.object({
        email: Yup.string().required("Email is required").email("Email is not vaild"),
        password: Yup.string().required("Password is required").matches(passRegex,"Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"),
    })

    async function sendLoginData(values){
        let endid
    try {
        const options={
            url:"https://ecommerce.routemisr.com/api/v1/auth/signin",
            method: "POST",
            data: values,
        }

        endid = toast.loading("Waiting...")

       const {data} = await axios.request(options);
       console.log(data);

       toast.dismiss(endid);
       toast.success("User Logged in Successfully");

       setTimeout(()=>{
        if(data.message=="success"){
            localStorage.setItem('userToken', data.token)
            setUserToken(data.token)
            navigate("/");
           }
       },3000)

    } catch (error) {
        toast.dismiss(endid)
        toast.error(error.response.data.message)
        setErrorMsg(error.response.data.message);
    }
    }

    const formik = useFormik({
        initialValues:{
            email:"",
            password:"",
        },

       validationSchema,

        onSubmit:sendLoginData,
    });

    return(
        <>
        <section>
            <h2 className="text-primary text-3xl font-bold pb-6 text-center mt-4">
            <i className="fa-regular fa-circle-user pr-3"></i>
            <span>Login Now</span></h2>
            <form action="" className="flex flex-col gap-3 items-center justify-center w-full" onSubmit={formik.handleSubmit}>
        
                <div className="w-1/2">
                    <input type="email" className="form-control w-full" placeholder="Enter Your Email" 
                    name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                      {formik.errors.email && formik.touched.email?(
                        <p className="text-red-600 font-bold">* {formik.errors.email}</p>
                    ):(
                        ""
                    )}
            
                </div>
              
                <div className="w-1/2">
                    <input type="password" className="form-control w-full" placeholder="Enter Your Password"
                    name="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                      {formik.errors.password && formik.touched.password?(
                        <p className="text-red-600 font-bold">* {formik.errors.password}</p>
                    ):(
                        ""
                    )}
                       {errorMsg?(
                          <p className="text-red-600 font-bold">* {errorMsg}</p>
                        ):(
                            ""
                        )} 
                </div>
               
                <button type="submit" className="btn-primary w-1/2 font-bold mt-3 group">
                <i className="fa-regular fa-hand-point-right text-lg group-hover:animate-wobble"></i> Login</button>

                <Link to={"/forget-password"}><span className="font-bold text-green-500 cursor-pointer hover:underline"><i className="fa-regular fa-face-meh-blank"></i> Forget Your Password?</span></Link>
            </form>
        </section>
        </>
    )
}