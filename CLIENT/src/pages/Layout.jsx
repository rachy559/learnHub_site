import { React, useContext, useEffect } from 'react'
import { UserContext } from '../App'
import { Outlet, Link } from "react-router-dom"
import Header from '../components/Header';
import '../css/App.css';
import ManagerHeader from '../components/ManagerHeader'
import Footer from '../components/Footer';
import Tutors from './Tutors';



const Layout = () => {
  const {user,setUser} = useContext(UserContext);
  return (
    <div>
      {user.roles==='MANAGER'?(
        <ManagerHeader/>
      ):(<Header />)} 
      
        <Outlet />
      <Footer />
      <div style={{ paddingTop: '150px' }}></div>
    </div>
  )
}

export default Layout;