import axios from 'axios'
import React, { useState } from 'react'
import { useFormik } from 'formik'
import Input from '../../shared/Input';
import { loginSchema } from '../validation/validate';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import style  from '../products/Product.module.css'//invalid code

export default function Newpass() {
    const navigate=useNavigate();
    const [ifError,setIfError]=useState(false);
    const initialValues={
        email:'',
        password:'',
        code:'',
    }
    const onSubmit=async(users)=>{
        // const {data}=await axios.patch(`${import.meta.env.VITE_API_URL}/auth/forgotPassword`,users);
        // console.log(data);
        // console.log(users);
        try
        {
            const {data}=await axios.patch(`${import.meta.env.VITE_API_URL}/auth/forgotPassword`,users);
            if(data.message=='success')
            {
            localStorage.setItem(data.token);
            toast.success("Your change password successfully");
            navigate("/");
            }
        }
        catch(error)
        {
            setIfError(true);
        }
    }
    const formik= useFormik({
        initialValues,
        onSubmit,
        validationSchema:loginSchema,
    })
    const inputs=[
        {
            id:'email',
            name:'email',
            type:'email',
            title:'Enter Email',
            className:'form-control ms-4',
            value:formik.values.email,
        },
        {
            id:'password',
            name:'password',
            type:'password',
            title:'New Password',
            className:'form-control ms-4',
            value:formik.values.password,
        },
        {
            id:'code',
            name:'code',
            type:'code',
            title:'Enter Code',
            className:'form-control ms-4',
            value:formik.values.code,
        },
    ]
    const renderInput=inputs.map((input, index) =>{
        return <Input type={input.type}
        name={input.name} 
        id={input.id} 
        title={input.title} 
        value={input.value}
        className={input.className}
        onChange={formik.handleChange} 
        onBlur={formik.handleBlur}
        touched={formik.touched}
        errors={formik.errors}
        key={index} />
    })
return (
    <div className="container">
        <h2 className='my-4'>Enter Email</h2>
        <form onSubmit={formik.handleSubmit} >
        {renderInput}
            <button type='submit' className={`${style.btn}`} disabled={!formik.isValid}>Change Password</button>
            {ifError&& <p className="text-danger fw-bold">Invalid Code</p>}
        </form>
    </div>
)
}
