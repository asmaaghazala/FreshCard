import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from "yup"


export default function CreateNewPassword() {

      const [errorMsg,setErrorMsg] = useState(null)
         const navigate = useNavigate()

          const passRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
         
             const validationSchema = Yup.object({
                 email: Yup.string().required("Email is required").email("Email is not vaild"),
                 newPassword: Yup.string().required("Password is required").matches(passRegex,"Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"),
             })

    async function createNewPass(values){
        let endid
        try {
            const options = {
                url:`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
                method:"PUT",
                data: values
            }
            endid = toast.loading("Waiting...")
            let {data} = await axios.request(options)
            console.log(data)
            toast.dismiss(endid);
            toast.success("Your reset code sent successfully");
            setTimeout(()=>{
                
                    navigate("/");
                   
               },2000)
        } catch (error) {
            console.log(error)
            toast.dismiss(endid)
            toast.error(error.response.data.message)
            setErrorMsg(error.response.data.message);
        }
    }

      const formik = useFormik({
            initialValues:{
                email:"",
                newPassword:"",
            },
            validationSchema,
            onSubmit:createNewPass
        })

  return (
    <>
       <section className='mt-10'>
        <h2 className='text-center font-bold text-primary text-3xl mt-5'> <i className="fa-solid fa-lock text-4xl "></i>  Create New password</h2>
        <p className='text-center mt-5 font-semibold text-gray-600 text-sm '>This password should be different from the
        previous password..</p>
    
        <form className='flex flex-col items-center justify-center w-full'onSubmit={formik.handleSubmit} >
            <div className='w-full flex flex-col items-center justify-center mt-5'>
            <div className="w-1/2">
             <input type="email" className="form-control w-full mt-3" placeholder="Enter Your Email" 
               name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}
               />
                  {formik.errors.email && formik.touched.email?(
                        <p className="text-red-600 font-bold">* {formik.errors.email}</p>
                    ):(
                        ""
                    )}
             <input type="password" className="form-control w-full mt-3" placeholder="Enter Your New Password" 
               name="newPassword" value={formik.values.newPassword} onChange={formik.handleChange} onBlur={formik.handleBlur}
               />
                    {formik.errors.newPassword && formik.touched.newPassword?(
                        <p className="text-red-600 font-bold">* {formik.errors.newPassword}</p>
                    ):(
                        ""
                    )}
                 {errorMsg?(
                          <p className="text-red-600 font-bold">* {errorMsg}</p>
                        ):(
                            ""
                        )} 
              </div>
              <button type='submit' className='btn-primary my-5 w-1/2 font-bold group hover:bg-opacity-85'>
              <i className="fa-solid fa-forward group-hover:animate-wobble"></i> Reset Password</button>
              <Link to={"/login"}><span className="font-bold text-green-500 cursor-pointer hover:underline"><i className="fa-regular fa-face-meh-blank"></i> Back to Login?</span></Link>
              
            </div>
        </form>
        </section>
    </>
  )
}
