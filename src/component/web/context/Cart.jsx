import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";

export const CartContext=createContext(null);
export function CartContextProvider({children}){
    let [countCart,setCountCart]=useState(0);
    let [loading,setLoading]=useState(false);

    const addtoCartContext=async (productId)=>{
        // console.log(productId);
        try
        {
            const token=localStorage.getItem("userToken");
            const {data}=await axios.post(`${import.meta.env.VITE_API_URL}/cart`,
            {productId},
            {headers:{Authorization:`Tariq__${token}`}}
            )
            if(data.message=='success')
            {
                toast.success("Your add to cart successfully");
            }
            setCountCart(++countCart);
            return data;  
        }catch(error)
        {
            console.log(error);
        }
    }
    
    const token=localStorage.getItem("userToken");
    const getCartContext=async ()=>{
        try
        {
            const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/cart`,
            {headers:{Authorization:`Tariq__${token}`}})
            // console.log(data);
            // console.log(data.count);
            setCountCart(data.count);
            return data;
        }
        
        catch(error)
        {
            console.log(error);
        }
    }

    const removeCartContext=async (productId)=>{
        try
        {
            setLoading(true);
            const token=localStorage.getItem("userToken");
            const {data}=await axios.patch(`${import.meta.env.VITE_API_URL}/cart/removeItem`,
            {productId},
            {headers:{Authorization:`Tariq__${token}`}});
            if(data.message=="success")
            {
                toast.success("Removed product successfully");
            }
            setCountCart(--countCart);
            setLoading(false);
            return data;
        }
        
        catch(error)
        {
            console.log(error);
        }
    }

    const clearAllCart=async ()=>{
    if(countCart==0)
    {
        toast.error('Cart is allready emptay', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
            });
    }
    else
    {
    setLoading(true);
    const token=localStorage.getItem("userToken");
    const {data}=await axios.patch(`${import.meta.env.VITE_API_URL}/cart/clear`,
    {},
    {headers:{Authorization:`Tariq__${token}`}});
    if(data.message=="success")
    {
        
        toast.success("Cleared all cart successfully");
        getCartContext();   
    }
    setLoading(false);
    return data;
    
    
    }
    }
    
    const increaseCartQuantity=async (productId)=>{
        setLoading(true);
        const {data}=await axios.patch(`${import.meta.env.VITE_API_URL}/cart/incraseQuantity`,
        {productId},
        {headers:{Authorization:`Tariq__${token}`}});
        if(data.message=="success")
        {
            toast.success("incease product successfully");
            setLoading(false);
        }
        return data;
    }

    const decreaseCartQuantity=async (productId)=>{
        setLoading(true);
        const {data}=await axios.patch(`${import.meta.env.VITE_API_URL}/cart/decraseQuantity`,
        {productId},
        {headers:{Authorization:`Tariq__${token}`}});
        if(data.message=="success")
        {
            toast.success("Decease product successfully");
            setLoading(false);
        }
        return data;
    }

    useEffect(()=>{
        if(token)
        {
            getCartContext();
        }
        
    },[token]);
    
    return <CartContext.Provider value={{addtoCartContext,getCartContext,removeCartContext,countCart,setCountCart,clearAllCart,loading,increaseCartQuantity,decreaseCartQuantity}}> 
        {children}
    </CartContext.Provider>
}