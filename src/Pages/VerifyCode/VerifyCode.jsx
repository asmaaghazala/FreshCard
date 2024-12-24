import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'

export default function VerifyCode() {

     const [errorMsg,setErrorMsg] = useState(null)
     const navigate = useNavigate()

    async function verifyCode(values){
        let endid

        try {
            const options = {
                url:`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
                method:"POST",
                data: values
            }
            endid = toast.loading("Waiting...")

            let {data} = await axios.request(options)
            console.log(data)
            toast.dismiss(endid);
            toast.success("Your reset code sent successfully");
            setTimeout(()=>{
                if(data.status=="Success"){
                    navigate("/create-newpassword");
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
                resetCode:"",
            },
    
            onSubmit:verifyCode
        })
    

  return (
    <>
    <section className='mt-10'>
    <h2 className='text-center font-bold text-primary text-3xl mt-5'> <i className="fa-solid fa-envelope-open-text text-4xl "></i>  Check your email</h2>
    <p className='text-center mt-5 font-semibold text-gray-600 text-sm '>Reset code sent to your mail.</p>

    <form className='flex flex-col items-center justify-center w-full' onSubmit={formik.handleSubmit} >
        <div className='w-full flex flex-col items-center justify-center mt-5'>
        <div className="w-1/2">
         <input type="text" className="form-control w-full mt-3" placeholder="Enter Reset Code" 
           name="resetCode" value={formik.values.resetCode} onChange={formik.handleChange} onBlur={formik.handleBlur}
           />
              {errorMsg?(
                          <p className="text-red-600 font-bold">* {errorMsg}</p>
                        ):(
                            ""
                        )} 
          </div>
          <button type='submit' className='btn-primary my-5 w-1/2 font-bold group hover:bg-opacity-85'>
          <i className="fa-solid fa-forward group-hover:animate-wobble"></i> Next</button>
          <Link to={"/forget-password"}><span className="font-bold text-green-500 cursor-pointer hover:underline"><i className="fa-regular fa-face-meh-blank"></i> Back to Forget Password?</span></Link>
          
        </div>
    </form>
    </section>
    </>
  )
}
