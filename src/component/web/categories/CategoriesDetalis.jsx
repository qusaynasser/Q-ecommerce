import axios from 'axios';
import React from 'react'
import style from '../products/Product.module.css';
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom'

export default function CategoriesDetalis() {
    const {categoryId}=useParams();//give ID by useParams بوخذ ل اي دي بواسطة البارمز
    
    const getGategories=async ()=>{
        const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/products/category/${categoryId}`);
        return data.products;
    }//https://ecommerce-node4.vercel.app/products
    const {data,isLoading}=useQuery("getGategories",getGategories);

    if(isLoading){
        return <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
      
      
    }
return (
    <div className='container d-flex gap-4 mt-5'> 
        {data.length?data.map((product)=>
            <div className='col-md-3 ' key={product._id}>
                <div className={`${style.card}`}>
                <img src={product.mainImage.secure_url} className={`${style.img}`}/>
                <h2 className={`${style.nameProdct}`}>{product.name}</h2>
                <Link to={`/product/${product._id}`} className={`${style.btn}`}>Detalis</Link>
                </div>
            </div>
        ):<h2>not found</h2>}
    </div>
)
}
