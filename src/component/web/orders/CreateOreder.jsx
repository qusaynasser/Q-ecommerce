import Input from '../../shared/Input.jsx'
import {CreatOrderSchema} from '../validation/validate.js'
import axios from 'axios'
import {toast } from 'react-toastify';
import { useContext } from 'react'
import { CartContext } from '../context/Cart.jsx'
import { useQuery } from 'react-query'
import { useFormik } from 'formik';
import style from '../products/Product.module.css'
export default function CreateOrder() {

    const {getCartContext,countCart,clearAllCart}=useContext(CartContext);

    const displayOrder=async ()=>{
    const order=await getCartContext();
    return order.products;
    }
    // const navigate= useNavigate();
    const initialValues={
        couponName:'',
        address:'',
        phone:'',
    }
    const onSubmit=async users=>{
        const token =localStorage.getItem('userToken');
        const {data}=await axios.post(`${import.meta.env.VITE_API_URL}/order`,users,
        {headers:{Authorization:`Tariq__${token}`}});
        if(countCart==0)
        {
            toast.success("Please choose products");
        }
        // if(data.message=='success')
        // {
        //     console.log(data);
        //     formik.resetForm();
        //     toast.success("Oreder installed successfully");
        // }
        else
        {
            console.log(data);
            formik.resetForm();
            toast.success("Oreder installed successfully");   
            clearAllCart();
        }
        return data;
    }
    const formik= useFormik({
        initialValues,
        onSubmit,
        validationSchema:CreatOrderSchema,
    })
    const inputs=[
        {
            id:'couponName',
            name:'couponName',
            type:'couponName',
            title:'CouponName',
            className:'form-control ms-4',
            value:formik.values.couponName,
        },
        {
            id:'address',
            name:'address',
            type:'address',
            title:'Address',
            className:'form-control ms-4',
            value:formik.values.address,
        },
        {
            id:'phone',
            name:'phone',
            type:'phone',
            title:'Phone',
            className:'form-control ms-4',
            value:formik.values.phone,
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

    const {data,isLoading}=useQuery("order",displayOrder);
    if(isLoading)
    {
        return <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
      
    }
return (
    <>
    <div className="container">
        <h2 className='my-4'>Orders</h2>
        {data.length? (data.map((product)=>
            <div className='order' key={product.details._id}>
            <img src={product.details.mainImage.secure_url} className='orderimg img-fluid rounded-circle' />
            <p>Product Quantity= {product.quantity}</p>
            </div>
        )):<h2>no products</h2>}
        <form onSubmit={formik.handleSubmit} >
            {renderInput}
            <button type='submit' disabled={!formik.isValid} className={`${style.btn}`}>Order</button>
            
        </form>
        {/* <Link to={"/SendCode"}>forget password?</Link> */}
        
    </div>
    </>
)
}
