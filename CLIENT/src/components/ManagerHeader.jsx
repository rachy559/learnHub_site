import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, NavLink, Link } from 'react-router-dom';
import { serverRequests } from '../Api';
import { ShowHeadersContext, UserContext } from "../App";
import { FaClipboardUser } from "react-icons/fa6";
import { RiLogoutCircleLine } from "react-icons/ri";

import { FaBell } from "react-icons/fa";

const ManagerHeader = () => {
    const [allNotConfirmTutors, setAllNotConfirmTutors] = useState([]);
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const activeStyles = {
        fontWeight: "bold",
        color: "#fbdfa5"
      };
    
    const toggleSidebar = () => {
        navigate('/adminProfile')
    };
    
    useEffect(() => {
        const fetchDataOfAllTutors = async () => {
            try {
                serverRequests('GET', `manager`, null).then((foundTutors) => {
                    console.log("not confirm", foundTutors);
                    setAllNotConfirmTutors(foundTutors);
                })
            } catch (error) {
                console.error('Error fetching tutors:', error);
            }
        };
        fetchDataOfAllTutors();
    }, []);

    return (<>
        <header className="app-header">
            <Link className="app-logo" to={`/manager_homePage`}><img width={120} src='../pictures/L.png' alt="Logo" /></Link>
            <nav className="app-nav">
            <NavLink style={({ isActive }) => isActive ? activeStyles : null} to={`/lessons`}>שיעורים</NavLink>
            <NavLink style={({ isActive }) => isActive ? activeStyles : null} to={`/tutors`}>המרצים שלנו</NavLink>
                <NavLink
                    to="/confirmTutors"
                    state={{ allNotConfirmTutors }}
                >
                    <div className="bell-icon-container">
                        <FaBell />
                        <span className="badge-position">
                            {allNotConfirmTutors.length}
                        </span>
                    </div>
                </NavLink>
                <NavLink style={({ isActive }) => isActive ? activeStyles : null} to={`/payments`}>תשלומים</NavLink>
                <>
                    <div className="user-icon" onClick={toggleSidebar} >
                    <img src='../pictures/user.png' alt="User" />
                    </div>
                    <a className='log' href="/homePage" onClick={() => { 
                    sessionStorage.removeItem('accessToken');
                    setShowHeaders(!showHeaders); }}><RiLogoutCircleLine /> </a>
                
                </>
            </nav>
        </header>
    </>);

}

export default ManagerHeader;