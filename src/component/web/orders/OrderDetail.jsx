import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query';

export default function OrderDetail() {
    const orderDetails=async ()=>{
        const token=localStorage.getItem('userToken');
        const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/order`,
        {headers:{Authorization:`Tariq__${token}`}});
        // console.log(data);
        return data.orders
    }
    const {data,isLoading}=useQuery("orderDetails",orderDetails);
    console.log(data);

    if(isLoading)
    {
        return <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
      
    }
return (
    <div className='container mt-5'>
        <div className='row'>
        {data.length? (data.map((order)=>
        <>
        <table className="table w-75 text-center">
  <thead>
    <tr>
        <th scope="col">Address</th>
        <th scope="col">Coupon Name</th>
        <th scope="col">Created At</th>
        <th scope="col">Final Price</th>
        <th scope="col">Payment Type</th>
        <th scope="col">Phone Number</th>
        <th scope="col">Status</th>
    </tr>
  </thead>
  <tbody>
    <tr className=''>
            <th scope="row" >{order.address}</th>
            <td>{order.couponName}</td>
            <td>{order.createdAt}</td>
            <td>{order.finalPrice}</td>
            <td>{order.paymentType}</td>
            <td>{order.phoneNumber}</td>
            <td>{order.status}</td>
    </tr>
    
    </tbody>
    </table>
    </>
    )):<h2>No Orders</h2>}
    </div>
    </div>
)
}
