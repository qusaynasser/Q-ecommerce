import { useQuery } from 'react-query';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation,Autoplay,Pagination } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "../categories/Categories.css";
import { Link } from 'react-router-dom';
// import { CartContext } from '../context/Cart';
export default function Categories() {

    // const name=useContext(CartContext);

    // console.log(import.meta.env.VITE_API_URL);
    const getGategories=async ()=>{
        const {data}= await axios.get(`${import.meta.env.VITE_API_URL}/categories/active?limit=7`)
        return data;
    }
    const {data,isLoading}=useQuery('web_category',getGategories);
    console.log(data?.categories);//?=>if data is not empty (ادخل على الكاتيكوري)

    if(isLoading)
    {
        return <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
      
      
    }
    // useEffect(()=>{
    // },[]);

return (
    
    <div className='container py-5' >
        {/* ?=>if data is not empty (ادخل على الكاتيكوري)>  وبعدين افحص اذا لكاتيكوري الها لينث  */}
        {/* <div className='row'>
            {data?.categories.length? data?.categories.map((category)=>{

                return <div className='col-md-3' key={category._id}>
                    <img src={category.image.secure_url}/>
                    <p>{category.name}</p>
                    </div>
            }):<h2>no data</h2>}
        </div> */}

    {/* <h1>Used Context: {name.name}</h1>  */}
    <Swiper
    modules={[Navigation,Autoplay,Pagination]}
    spaceBetween={50}
    slidesPerView={2.2}
    navigation
    loop={true}
    autoplay={{
        delay:2000
    }}
    pagination={{
        clickable: true,
        el:'.swiper-custom-pagination'
    }}
    // onSlideChange={() => console.log('slide change')}
    // onSwiper={(swiper) => console.log(swiper)}
    >
        {data?.categories.length? data?.categories.map((category)=>{
            return <SwiperSlide key={category._id}>

                <Link to={`products/category/${category._id}`}>
                <img src={category.image.secure_url}/>
                </Link>
                </SwiperSlide>
        }):<h2>not found</h2>}
    </Swiper>
    <div className='swiper-custom-pagination text-center pt-4 '></div>


    </div>
)
}
