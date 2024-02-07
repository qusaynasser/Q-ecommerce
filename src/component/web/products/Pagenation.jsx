import axios from 'axios';
import React, { useState } from 'react'
import { useQuery } from 'react-query';
import style from '../products/Product.module.css';
import { Link } from 'react-router-dom';
import Categories from '../categories/Categories';


export default function Pagenation() {
    const Product_Per_Page=4;
    let [cureentPage,setCurrentPage]=useState(1);

    const getAllProducts=async (page)=>{
        const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/products?page=${page}&limit=${Product_Per_Page}`);
        return data;
    }
    const {data,isLoading}=useQuery(["products",cureentPage],()=>getAllProducts(cureentPage));
    console.log(data);
    if (isLoading)
    {
        return (
            <div className="d-flex justify-content-center my-5">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }

    const handlePage=(page)=>{
        setCurrentPage(page);
    }
return (
    <>
    <Categories/>

    <div className="container mt-5">
    <div className="showAll d-flex justify-content-center">
    <h2 className='text-center text-capitalize border-bottom my-3 w-75'>products</h2>
    <Link to={"/allProducts"} className={`${style.showall}`}>Show All</Link>
    </div>
    </div>
    
    <div className="container mt-5">
        <div className="row">
            {data.products.length? (data.products.map((product)=>
                <div className="col-md-3" key={product._id}>
                    <div className={`${style.card}`}>
                    <img src={product.mainImage.secure_url} className={`${style.img}`}/>
                    <p className={`${style.nameProdct}`}>{product.name}</p>
                    <Link to={`/product/${product._id}`} className={`${style.btn}`}>Detalis</Link>
                    </div>
                </div>
            )):<h1>No Products</h1>}
        </div>
    </div>

    <div className='container px-5'>
                {data.products.length ? (
                    <>
                        <div className='row d-flex justify-content-center mx-auto my-5'>
                            {Array.from({ length: Math.ceil(parseInt(data.total) / parseInt(data.page)) }, (_, i) => (
                                <nav aria-label="..." className="col-md-1 p-0" key={i}>
                                    <ul className="pagination d-flex justify-content-center">
                                        <li>
                                            <button className="page-link" onClick={() => handlePage(i + 1)}>
                                                {i + 1}
                                            </button>
                                        </li>
                                    </ul>
                                </nav>
                            ))}
                        </div>
                    </>
                ) : (
                    'No products found!'
                )}
            </div>
    </>
)
}
