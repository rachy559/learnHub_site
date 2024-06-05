import { React, useContext, useEffect } from 'react'
import { UserContext } from '../App'
import { Outlet, Link } from "react-router-dom"
import Header from '../components/Header';
import '../css/App.css';



const Home = () => {
  const user = useContext(UserContext);
  return (
    <div>
      <Header></Header>
      <h1 className="title"> Welcome </h1>
      <Outlet/>
    </div>
  )
}

export default Home