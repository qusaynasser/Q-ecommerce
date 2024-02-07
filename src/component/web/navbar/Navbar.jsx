import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CartContext } from '../context/Cart';
import { UserContext } from '../context/User';
import './Navbar.css'
// import Loading from '../loading/Loading';
//{user,setUser}
export default function Navbar() {
    const {countCart}=useContext(CartContext);
    const {userData,setUserData,userToken,setUserToken,loading}=useContext(UserContext);
    // console.log(userToken);
    const navigate=useNavigate();
    const logout=()=>{
        localStorage.removeItem("userToken");
        setUserToken(null);
        setUserData(null);
        navigate("/");
    }
    if(loading&&userToken){
        return <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
      
    }
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container">
                <a className="navbar-brand" href="#">Q-shop</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav m-auto mb-2 mb-lg-0">

                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home </Link> 
                        </li>


                        <li className="nav-item">
                            <a className="nav-link" href="#">Categories</a>
                        </li>


                        <li className="nav-item">
                            <Link className="nav-link" to={"/products"}>Products</Link>
                        </li>
                        {userToken?
                        <li className="nav-item">
                            <Link className="nav-link" to="/cart">Cart<span className="badge text-bg-secondary ms-1">{countCart}</span> </Link>
                        </li>
                        :null}   

{/* <img src={userData.image.secure_url} className='imgnav'/> */}
                    </ul>
                    <ul className="navbar-nav">
                        <li className="nav-item dropdown">
                            {!userToken?
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Account
                            </a>
                            : 
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {userData.userName}
                            <img src={userData.image.secure_url} className='imgnav'/>
                            </a>
                            }
                            <ul className="dropdown-menu ">.
                                {!userToken?
                                    <>
                                    <li><Link className="dropdown-item" to={"/register"}>register</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><Link className="dropdown-item" to={"/login"}>login</Link></li>
                                    </>
                                    :
                                    <>
                                    <li><Link className="dropdown-item" to={"/profile"}>profail</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><Link className="dropdown-item" onClick={logout}>logout</Link></li>
                                    </>
                                }

                                
                            </ul>
                        </li>
                    </ul>

                </div>
            </div>
        </nav>

    )
}
