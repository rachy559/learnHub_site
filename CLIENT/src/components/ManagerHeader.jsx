import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, NavLink, Link } from 'react-router-dom';
import { serverRequests } from '../Api';
import { ShowHeadersContext, UserContext } from "../App";
import { FaClipboardUser } from "react-icons/fa6";
import { RiLogoutCircleLine } from "react-icons/ri";

import { FaBell } from "react-icons/fa";

const Manager_homePage = () => {
    const [allNotConfirmTutors, setAllNotConfirmTutors] = useState([]);
    const [styleConnect, setStyleConnect] = useState(false);
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    
    const toggleSidebar = () => {
        setStyleConnect(!styleConnect);
    };
    
    const navigateToProfile = () => {
        navigate('/adminProfile');
    }

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
                <NavLink
                    to="/confirmTutors"
                >
                    <div className="bell-icon-container">
                        <FaBell />
                        <span className="badge-position">
                            {allNotConfirmTutors.length}
                        </span>
                    </div>
                </NavLink>
                <NavLink style={({ isActive }) => isActive ? activeStyles : null} to={`/lessons`}>תשלומים</NavLink>
                <>
                    <div className="user-icon" onClick={toggleSidebar} >
                    <img src='../pictures/user.png' alt="User" />
                    </div>
                    <div id="sidebar" className={`sidebar ${styleConnect ? 'active' : ''}`}>
                        <a href="" className="closebtn" onClick={toggleSidebar}>&times;</a>
                        <a className='profile' onClick={navigateToProfile}><FaClipboardUser /> הצגת פרטי פרופיל</a>
                        <a href="/homePage" onClick={() => { setShowHeaders(!showHeaders); }}><RiLogoutCircleLine /> יציאה מהחשבון</a>
                    </div>
                </>
            </nav>
        </header>
    </>);

}

export default Manager_homePage;