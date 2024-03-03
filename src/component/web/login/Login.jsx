import React, { useContext, useState } from 'react'
import Input from '../../shared/Input'
import { useFormik } from 'formik'
import {loginSchema} from '../validation/validate.js'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import {toast } from 'react-toastify';
import { UserContext } from '../context/User.jsx'
import style from '../products/Product.module.css';

export default function Login() {
    // console.log(saveCurrentUser);
    const {setUserToken}=useContext(UserContext);
    const navigate= useNavigate();
    const [ifError,setIfError]=useState(false);
    
    const initialValues={
        email:'',
        password:'',
    }
    const onSubmit=async users=>{
        // formik.resetForm();
        try
        {
        const {data}=await axios.post(`${import.meta.env.VITE_API_URL}/auth/signin`,users);
        if(data.message=='success')
        {
            // console.log(data);
            localStorage.setItem('userToken',data.token);//يعني خذ بيانات اليوزر المقصود ب التوكن وخزنها في اللوكل ستورج
            setUserToken(data.token);
            toast.success("User logged in successfully");
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
        validationSchema:loginSchema
    })
    const inputs=[
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
    <>
    <div className="container">
        <h2 className='my-4'>Login Account</h2>
        <form onSubmit={formik.handleSubmit} >
            {renderInput}
            <button type='submit' disabled={!formik.isValid} className={`${style.btn}`}>Login</button> 
            <div className="forgetpass mt-3">
            <Link to={"/SendCode"}>forget password?</Link>
            </div>
            <div className="error text-danger fw-bold ">
                {ifError&&<p>email or password error try again</p>}
            </div>
        </form>
        
    </div>
    </>
)
}
