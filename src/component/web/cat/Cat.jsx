import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

export default function Cat() {
    const getCat =async () =>{
        const {data}=await axios.get("http://localhost:1337/api/categories?populate=*");
        return data.data;
    }
    const {data,isLoading}=useQuery('cat',getCat);

    if(isLoading)
    {
        return <h2>Loading....</h2>
    }

return (
    <div className='container mt-5'>
        <div className='row'>
            {data.map((element)=>{
            return (
                <div className='col-md-4' key={element.id}>
                <Link to={`/category-detalis/${element.id}`}>
                <img src={`http://localhost:1337${element.attributes.image.data.attributes.url}`}
                alt={element?.attributes?.name}
                className="w-11/12 rounded img-fluid"
                loading="lazy"
                /> 
                <h5 className='mb-5'>{element.attributes.name}</h5>
                </Link>
                </div>
            )
            })}
        </div>
    </div>

)
}

