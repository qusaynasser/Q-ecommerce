import axios from 'axios';
import { useQuery } from 'react-query';
import style from '../products/Product.module.css';
import { Link } from 'react-router-dom';
import Categories from '../categories/Categories';
import { useState } from 'react';

export default function AllProducts() {
  let [sort, setSort] = useState('');
  let [minPrice, setMinPrice] = useState(0);
  let [maxPrice, setMaxPrice] = useState(5000);
  const getAllProducts = async (sort, min, max) => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products?page=1&limit=10&sort=${sort}&price[lte]=${max}&price[gte]=${min}`);
    return data;
  }
  const { data, isLoading } = useQuery(["products", sort, minPrice, maxPrice], () => getAllProducts(sort, minPrice, maxPrice));
  console.log(data);
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center my-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }
  const handleSortChange = (e) => {
    const selectedSortOption = e.target.value;
    console.log(selectedSortOption);
    setMinPrice(0);
    setMaxPrice(5000);
    setSort(selectedSortOption);
  }

  const handlePriceChange=()=>{
      const minPriceInput=document.getElementById('minPriceInput').value;
      const maxPriceInput=document.getElementById('maxPriceInput').value;

      setMinPrice(minPriceInput);
      setMaxPrice(maxPriceInput);
  }
  return (
    <>
      <Categories />

      <div className="container mt-5">
        <div className="showAll d-flex justify-content-center">
          <h2 className='text-center text-capitalize border-bottom my-3 w-75'>All Products</h2>
        </div>
      </div>

      <div className="sort container mt-3">
        <select
          className="form-select form-select-sm border-3"
          onChange={handleSortChange}
          aria-label="Small select example">
          <option value="">Sort</option>
          <option value="price">Price Low to High</option>
          <option value="-price">Price High to Low</option>
          <option value="discount">Discount Low to High</option>
          <option value="-discount">Discount High to Low</option>
        </select>
      </div>

      <div className='container w-75 d-flex justify-content-center border-top border-bottom mt-3 py-3'>
        <div className="row g-3 align-items-center">
          <div className="col-lg-1">
            <label htmlFor="inputPassword6" className="col-form-label">Price:</label>
          </div>
          <div className="col-lg-3">
            <div className="input-group">
              <input id='minPriceInput' placeholder='From' type="number" min='1' className="form-control" aria-label="Dollar amount (with dot and two decimal places)" />
              <span className="input-group-text">$</span>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="input-group">
              <input id='maxPriceInput' placeholder='To' type="number" className="form-control" aria-label="Dollar amount (with dot and two decimal places)" />
              <span className="input-group-text">$</span>
            </div>
          </div>
          <div className="col-lg-5">
            <button className={`${style.btn}`} onClick={handlePriceChange}>Go</button>
          </div>
        </div>

      </div>

      <div className="container mt-5">
        <div className="row">
          {data.products.length ? (data.products.map((product) =>
            <div className="col-md-3" key={product._id}>
              <div className={`${style.card}`}>
                <img src={product.mainImage.secure_url} className={`${style.img}`} />
                <p className={`${style.nameProdct}`}>{product.name}</p>
                <p className={`${style.nameProdct}`}>Price: {product.price}$</p>
                <p className={`${style.nameProdct}`}>Discount: {product.discount}%</p>
                <p className={`${style.nameProdct}`}>Final Price: {product.finalPrice}$</p>
                <Link to={`/product/${product._id}`} className={`${style.btn}`}>Detalis</Link>
              </div>
            </div>
          )) : <h1>No Products</h1>}
        </div>
      </div>

    </>
  )
}
