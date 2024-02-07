import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

export default function CatDetalis() {
    const {catId}=useParams();
    const getCat =async () =>{
        const {data}=await axios.get(`http://localhost:1337/api/category-detalis/${catId}?populate=*`);
        return data.data;
    }
    console.log(catId);
    const {data,isLoading}=useQuery('catD',getCat);

    if(isLoading)
    {
        return <h2>Loading....</h2>
    }
    
return (
    <div className='container mt-5'>
        <div className='row'>
            {data.length?data.map((element)=>{
            return (
                <div className='col-md-4' key={element.id}>
                <img src={`http://localhost:1337${element.attributes.image.data[0].attributes.url}`}
                alt={element?.attributes?.name}
                className="w-11/12 rounded img-fluid"
                loading="lazy"
                /> 
                <h3 className='mb-5'>{element.attributes.name}</h3>
                <h5>{element.attributes.price}</h5>
                </div>
            )
            }):<h2>not found</h2>}
            {/* <div className='col-md-4' >
                <img src={`http://localhost:1337${data?.attributes?.image?.data[0]?.attributes?.url}`}
                alt={data.attributes.name}
                className="w-11/12 rounded img-fluid"
                loading="lazy"
                /> 
                <h3 className='mb-5'>{data.attributes.name}</h3>
                <h5>{data.attributes.price}</h5>
            </div> */}
        </div>
        </div>
)
}
