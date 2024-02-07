import React, { useContext } from 'react'
import { UserContext } from '../context/User'
import style from "./Profile.module.css"
export default function UserInfo() {
    let {userData,loading}=useContext(UserContext);
    if(loading)
    {
        return <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
      
    }
return (
    <div className='info'>
        <h3>Name: {userData.userName}</h3>
        <p>Role: {userData.role}</p>
        <img src={userData.image.secure_url} className={`${style.imgW}`}/>
    </div>
)
}
