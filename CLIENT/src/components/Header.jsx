import React, { useContext, useState } from 'react';
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShowHeadersContext } from "../App";
import { UserContext } from "../App";
import '../css/header.css';

const Header = ({ setShowHeaders }) => {
  const { user, setUser } = useContext(UserContext);
  
  console.log(user)
  const showHeaders = useContext(ShowHeadersContext);
  const navigate = useNavigate();
  const [selectedProfile, setSelectedProfile] = useState('');
  const [styleConnect, setStyleConnect] = useState(false);
  const activeStyles = {
    fontWeight: "bold",
    color: "#fbdfa5"
  };

  const handleProfileChange = (e) => {
    const value = e.target.value;
    if (value === "tutor") {
      setUser({ ...user, rollId: 3 });
    } else {
      setUser({ ...user, rollId: 2 });
    }

    console.log("userCon", user);
    console.log("Selected Profile:", value); // Debug log
    setSelectedProfile(value);
    navigate(`/signUp`, { state: { selectedProfile: value } });
  };

  const toggleSidebar = () => {
    setStyleConnect(!styleConnect);
  };
  console.log("userCon", user);

  return (
    <header className="app-header">
      <Link className="app-logo" to={`/homePage`}><img width={120} src='../pictures/L.png' alt="Logo" /></Link>
      <nav className="app-nav">
        <NavLink style={({ isActive }) => isActive ? activeStyles : null} to={`/`}>אודות</NavLink>
        <NavLink style={({ isActive }) => isActive ? activeStyles : null} to={`/lessons`}>שיעורים</NavLink>
        <NavLink style={({ isActive }) => isActive ? activeStyles : null} to={`/tutors`}>המרצים שלנו</NavLink>
        <NavLink style={({ isActive }) => isActive ? activeStyles : null} to={`/comments`}>המלצות</NavLink>
        {showHeaders ? (
          <>
            <NavLink style={({ isActive }) => isActive ? activeStyles : null} to={`/login`}>התחבר</NavLink>
            <div className="profile-select">
              <select value={selectedProfile} onChange={handleProfileChange}>
                <option value="">הוסף פרופיל</option>
                <option value="tutor">פרופיל מורה</option>
                <option value="student">פרופיל תלמיד</option>
              </select>
            </div>
          </>
        ) : (
          <>
            <div className="user-icon" onClick={toggleSidebar}>
              <img src={user.fileUrls} alt="User" />
            </div>
            <div id="sidebar" className={`sidebar ${styleConnect ? 'active' : ''}`}>
              <a href="" className="closebtn" onClick={toggleSidebar}>&times;</a>
              <a onClick={() => { navigate('/profile');  }}>הצגת פרטי פרופיל</a>
              <a href="/homePage" onClick={() => { setShowHeaders(!showHeaders);  }}>יציאה מהחשבון</a>
            </div>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
