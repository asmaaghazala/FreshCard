import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup"
import { tokenContext } from "../../Components/Context/Token.Context";


export default function Register(){

    const {setUserToken}=useContext(tokenContext)

    const [errorMsg,setErrorMsg] = useState(null)
    const navigate = useNavigate()

    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    const passRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

    const validationSchema = Yup.object({
        name: Yup.string().required("Name is required").min(3,"Name must be more than 3 characters").max(20,"Name must be less than 20 characters"),
        email: Yup.string().required("Email is required").email("Email is not vaild"),
        phone: Yup.string().required("Phone is required").matches(phoneRegex,"Phone number is not vaild"),
        password: Yup.string().required("Password is required").matches(passRegex,"Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"),
        rePassword: Yup.string().required("Repassword is required").oneOf([Yup.ref("password")], "Password and repassword shoud be the same"),
    })

    async function sendRegisterData(values){
        let endid
    try {
        const options={
            url:"https://ecommerce.routemisr.com/api/v1/auth/signup",
            method: "POST",
            data: values,
        }

        endid = toast.loading("Waiting...")

       const {data} = await axios.request(options);
       console.log(data);

       toast.dismiss(endid);
       toast.success("Account Created Succesfully");

       setTimeout(()=>{
        if(data.message=="success"){
            localStorage.setItem('userToken', data.token)
            setUserToken(data.token)
            navigate("/login");
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
            name: "",
            email:"",
            password:"",
            rePassword:"",
            phone:"",
        },

       validationSchema,

        onSubmit:sendRegisterData,
    });

    return(
        <>
        <section>
            <h2 className="text-primary text-3xl font-bold pb-6">
            <i className="fa-regular fa-circle-user pr-3"></i>
            <span>Register Now</span></h2>
            <form action="" className="flex flex-col gap-3" onSubmit={formik.handleSubmit}>
                <div>
                    <input type="text" className="form-control w-full" placeholder="Username" 
                    name="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                    {formik.errors.name && formik.touched.name?(
                        <p className="text-red-600 font-bold">* {formik.errors.name}</p>
                    ):(
                        ""
                    )}
                </div>
                <div>
                    <input type="email" className="form-control w-full" placeholder="Email" 
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
                <div>
                    <input type="tel" className="form-control w-full" placeholder="Phone" 
                    name="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                      {formik.errors.phone && formik.touched.phone?(
                        <p className="text-red-600 font-bold">* {formik.errors.phone}</p>
                    ):(
                        ""
                    )}
                </div>
                <div>
                    <input type="password" className="form-control w-full" placeholder="Password"
                    name="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                      {formik.errors.password && formik.touched.password?(
                        <p className="text-red-600 font-bold">* {formik.errors.password}</p>
                    ):(
                        ""
                    )}
                </div>
                <div>
                    <input type="password" className="form-control w-full" placeholder="Re-password"
                    name="rePassword" value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                      {formik.errors.rePassword && formik.touched.rePassword?(
                        <p className="text-red-600 font-bold">* {formik.errors.rePassword}</p>
                    ):(
                        ""
                    )}
                </div>
                <button type="submit" className="btn-primary w-36 mt-3">Sign Up</button>
            </form>
        </section>
        </>
    )
}