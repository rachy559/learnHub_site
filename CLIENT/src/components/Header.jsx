import React, { useContext, useState } from 'react';
import { Link, NavLink } from "react-router-dom";
import { UserContext } from '../App';


const Header = () => {
  const user = useContext(UserContext);
  const [selectedProfile, setSelectedProfile] = useState('');

  const activeStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616"
  };

  return (
    <header className="app-header">
      <Link className="app-logo" to={`/homePage`}><img width={120} src='../pictures/L.png' /></Link>
      <nav className="app-nav">
      {/* <Link to="/homePage#about">אודות</Link> */}
        <NavLink style={({ isActive }) => isActive ? activeStyles : null} to={`/`}>אודות</NavLink>
        <NavLink style={({ isActive }) => isActive ? activeStyles : null} to={`/lessons`}>שיעורים</NavLink>
        <NavLink style={({ isActive }) => isActive ? activeStyles : null} to={`/instructors`}>המרצים שלנו</NavLink>
        <NavLink style={({ isActive }) => isActive ? activeStyles : null} to={`/recommendations`}>המלצות</NavLink>
        <NavLink style={({ isActive }) => isActive ? activeStyles : null} to={`/login`}>התחבר</NavLink>
        <div className="profile-select">
          <select value={selectedProfile} onChange={(e) => setSelectedProfile(e.target.value)}>
            <option value="">הוסף פרופיל</option>
            <option value="student">פרופיל מורה</option>
            <option value="instructor">פרופיל תלמיד</option>
          </select>
        </div>
      </nav>
    </header>
  );
}

export default Header;
