import { React, useContext, useEffect } from 'react'
import { UserContext } from '../App'
import { Outlet, Link } from "react-router-dom"
import Header from '../components/Header';
import '../css/App.css';
import Footer from '../components/Footer';
import Tutors from './Tutors';



const Layout = () => {
  const user = useContext(UserContext);
  return (
    <div>
      
      <Header />
        <Outlet />
      <Footer />
    </div>
  )
}

export default Layout;