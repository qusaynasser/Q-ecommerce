import axios from 'axios';
import React, { useContext } from 'react'
import { useQuery } from 'react-query';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { CartContext } from '../context/Cart';
import { UserContext } from '../context/User';
import { toast } from 'react-toastify';
import style from '../products/Product.module.css';
import Rating from './Rating';
// import ReactImageMagnify from 'react-image-magnify';

export default function Product() {
    const navigate = useNavigate();
    const { productId } = useParams();
    const { userToken } = useContext(UserContext);
    const { addtoCartContext } = useContext(CartContext);

    const addtocart = async (productId) => {
        if (userToken) {
            const result = await addtoCartContext(productId);
            return result;
        }
        else {
            navigate("/login");
        }

    }

    const getProduct = async () => {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products/${productId}`);

        return data.product;
    }
    const { data, isLoading } = useQuery('product', getProduct);
    console.log(data);
    
    if (isLoading) {
        return <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
      
    }
    return (
        <div className='container'>
            <div className='row'>
                {data.subImages.map((img) =>
                    <div className='mt-3 col-md-3' key={img.public_id}>
                        <img src={img.secure_url} className={`${style.img}`} />
                    </div>
                )}
            </div>
            <h2 className='mt-3'>{data.name}</h2>
            <p>{data.description}</p>
            <p className='text-danger fw-bold'>${data.price}</p>
            <div className="addToCart d-flex justify-content-center">
            <button className={`${style.btn}`} onClick={() => addtocart(data._id)}>ADD TO CART </button>
            </div>
            <div className="newRevie d-flex justify-content-end">
                {userToken&&<Link to={`/rating/${data._id}`} className={`${style.btn}`}>ADD NEW REVIEW</Link>}
            </div>

            <h5 className='my-5 fw-bold'>REVIEWS:</h5>
            {data.reviews.length ? (data.reviews.map((review, index) =>
                <div className={`${style.card}`} key={review._id}>
                    <div className="div mx-3">
                        <div className={`${style.review}`} >
                            <p>Review {index}</p>
                        </div>

                        <div className="img text-center">
                            <img src={review.createdBy.image.secure_url} className={`${style.imgrev}`} />
                        </div>

                        <div className="comment fw-bold ">
                            <p>Comment: {review.comment}</p>
                        </div>

                        <div className="username">
                            <p>Username: {review.createdBy.userName}</p>
                        </div>

                        <div className="email">
                            <p>Email: {review.createdBy.email}</p>
                        </div>

                        <div className="rating mb-3">
                            <p className='fw-bold'>Rating:</p>
                            <div className="progress" role="progressbar" aria-label="Example with label" aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}>
                                <div className="progress-bar" style={{ width: `${(review.rating)/5 * 100}%` }}>{(review.rating)/5 * 100}%</div>
                            </div>

                        </div>
                    </div>
                </div>
            )) : <h1>No Reviews</h1>}

        </div>
    )
}
