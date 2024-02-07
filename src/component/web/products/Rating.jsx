import Input from '../../shared/Input'
import { useFormik } from 'formik'
import { ratingSchema} from '../validation/validate.js'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useState } from 'react'

export default function Rating() {
    const { ratingId } = useParams();
    // console.log(ratingId);
    const [ifError,setIfError] =useState(false);//can not review this product
    const initialValues={
        comment:'',
        rating:'',
    }
    const onSubmit=async users=>{
        try{
            const token=localStorage.getItem('userToken');
            const {data}=await axios.post(`${import.meta.env.VITE_API_URL}/products/${ratingId}/review`,
            {users},
            {headers:{Authorization:`Tariq__${token}`}});
            console.log(data);
        }catch(error)
        {
            setIfError(error);
        }
    }
    
    const formik= useFormik({
        initialValues,
        onSubmit,
        validationSchema:ratingSchema,
    })
    const inputs=[
        {
            id:'comment',
            name:'comment',
            type:'comment',
            title:'Feedback',
            className:'form-control ms-4',
            value:formik.values.comment,
        },
        {
            id:'rating',
            name:'rating',
            type:'range',
            title:'Rating',
            className:'form-range',
            value:formik.values.rating,
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
        <h2 className='my-4'>Add Rating</h2>
        <form onSubmit={formik.handleSubmit} >
            {renderInput}
            <button type='submit' disabled={!formik.isValid}>Add Review</button> 
            <div className="error text-danger mt-3 fw-bold ">
                {ifError&& <p>Can not review this product</p>}
            </div>
        </form>
        
    </div>
    </>
)
}
