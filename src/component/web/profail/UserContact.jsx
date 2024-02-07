import React, { useContext } from 'react'
import { UserContext } from '../context/User';

export default function UserContact() {
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
    <div className='contact'>
        <p>Email: {userData.email}</p>
        <p>confirmEmail: {userData.confirmEmail}</p>
    </div>
)
}
