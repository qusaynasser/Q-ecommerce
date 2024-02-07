import React from 'react'
import Input from '../../shared/Input'
import { useFormik } from 'formik'
import {registerSchema} from '../validation/validate.js'
import axios from 'axios'
import {toast } from 'react-toastify';
import style from '../products/Product.module.css';
export default function Rigister() {
    const initialValues={
        userName:'',
        email:'',
        password:'',
        image:'',
    }
    const onSubmit=async users=>{
        const formData=new FormData();
        formData.append("userName",users.userName);
        formData.append("email",users.email);
        formData.append("password",users.password);
        formData.append("image",users.image);
        
        const {data}=await axios.post(`https://ecommerce-node4.vercel.app/auth/signup`,formData);
        // console.log(data);
        if(data.message=='success')
        {
            formik.resetForm();
            toast.success('account create succesfully, plz verify your email to login', {
                position: "top-right",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        }
    }
    const handelFileChange=(event)=>{
        formik.setFieldValue("image",event.target.files[0]);
    }
    const formik= useFormik({
        initialValues,
        onSubmit,
        validationSchema:registerSchema
    })
    const inputs=[
        {
            id:'username',
            name:'userName',
            type:'text',
            title:'Username ',
            className:'form-control ms-4',
            value:formik.values.userName,
        },
        {
            id:'email',
            name:'email',
            type:'email',
            title:'Email',
            className:'form-control ms-4',
            value:formik.values.email,
        },
        {
            id:'password',
            name:'password',
            type:'password',
            title:'Password',
            className:'form-control ms-4',
            value:formik.values.password,
        },
        {
            id:'image',
            name:'image',
            type:'file',
            title:'Image',
            className:'form-control ms-4',
            onChange:handelFileChange,
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
        onBlur={input.onChange || formik.handleBlur}
        touched={formik.touched}
        errors={formik.errors}
        key={index} />
    })
return (
    <>
    <div className="container">
        <h2 className='my-4'>Create Account</h2>
        <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
            {renderInput}
            <button type='submit' disabled={!formik.isValid} className={`${style.btn}`}>Rigester</button>
        </form>
        
    </div>
    </>
)
}
