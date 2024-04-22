import axios from 'axios'
import React from 'react'
import { useFormik } from 'formik'
import Input from '../../shared/Input';
import { EmailSchema } from '../validation/validate';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import style  from '../products/Product.module.css'

export default function SendCode() {
    const navigate=useNavigate();
    const initialValues={
        email:'',
    }
    const onSubmit=async(email)=>{
        const {data}=await axios.patch(`${import.meta.env.VITE_API_URL}/auth/sendcode`,email);
        console.log(data);
        console.log(email);
        if(data.message=='success')
        {
            // localStorage.setItem(data.token);
            toast.success("Recive Code");
        }
        navigate("/newPassword");
    }
    const formik= useFormik({
        initialValues,
        onSubmit,
        validationSchema:EmailSchema,
    })
    const inputs=[
        {
            id:'email',
            name:'email',
            type:'email',
            title:'Email',
            className:'form-control ms-4',
            value:formik.values.email,
        }
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
        <button type='submit' disabled={!formik.isValid} className={`mb-3 ${style.btn}`}>Send Code</button>
        </form>  
    </div>
)
}
