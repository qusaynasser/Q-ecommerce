import { useContext } from 'react'
import { UserContext } from '../context/User'
import style from "./Profile.module.css"
import { Link, Outlet } from 'react-router-dom';

export default function Profail() {
    const {loading}=useContext(UserContext);
    if(loading)
    {
        return <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
      
    }
return (
    <aside className={`${style.profile}`}>
        <div className={`${style.profileLinks}`}>
            <nav>
                <Link to=''>Info</Link>
                <Link to="contact">Contact</Link>
                <Link to="orderDetails">Oreders</Link>
            </nav>
        </div>
        
        <div className={`${style.userData}`}>
            <Outlet/>
        </div>
    </aside>
)
}
