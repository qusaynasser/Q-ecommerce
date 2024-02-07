import React from 'react'
import Navbar from '../component/dashbord/navbar/Navbar.jsx'
import Footer from '../component/dashbord/footer/Footer.jsx'
import { Outlet } from 'react-router-dom'

export default function DashBordLayout() {
return (
    <>
    <Navbar/>
    <Outlet/>
    <Footer/>
    </>
)
}
