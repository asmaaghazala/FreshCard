import axios from 'axios'
import { useFormik } from 'formik'
import * as Yup from "yup"
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export default function ForgetPassword() {

        const [errorMsg,setErrorMsg] = useState(null)
         const navigate = useNavigate()
    
    const validationSchema = Yup.object({
        email: Yup.string().required("Email is required").email("Email is not vaild"),
    })

    async function forgetPassword(values){
        let endid
        try {
            const options = {
                url:`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
                method:"POST",
                data:values
            }
            endid = toast.loading("Waiting...")
            let {data} = await axios.request(options)
            console.log(data)
            toast.dismiss(endid);
       toast.success("Your reset code sent successfully");
       setTimeout(()=>{
        if(data.statusMsg=="success"){
            navigate("/verifycode");
           }
       },1000)
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
        },

        validationSchema,

        onSubmit:forgetPassword
    })

  return (
    <>
    <section>
    <h2 className='text-center font-bold text-primary text-3xl mt-5'>Forget Your Password?</h2>
    <p className='text-center mt-5 font-semibold text-gray-600 text-sm '>Your password will be reset by email.</p>

    <form className='flex flex-col items-center justify-center w-full' onSubmit={formik.handleSubmit}>
        <div className='w-full flex flex-col items-center justify-center mt-5'>
        <div className="w-1/2">
        <label className='text-gray-700 font-bold'>
            Enter your email address
        </label>
         <input type="email" className="form-control w-full mt-3" placeholder="Enter Your Email" 
           name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
              {formik.errors.email && formik.touched.email?(
                        <p className="text-red-600 font-bold">* {formik.errors.email}</p>
                    ):(
                        ""
                    )}
                     {errorMsg?(
                          <p className="text-red-600 font-bold">* {errorMsg}</p>
                        ):(
                            ""
                        )} 
          </div>
          <button type='submit' className='btn-primary mt-5 w-1/2 font-bold group hover:bg-opacity-85'><i className="fa-solid fa-envelope-circle-check group-hover:animate-wobble"></i> Verify</button>
        </div>
    </form>
    </section>
    </>
  )
}
