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
      <Link className="app-logo" to={`/homePage`}><img width={200} src='../pictures/L.png' /></Link>
      <nav className="app-nav">
        <NavLink style={({ isActive }) => isActive ? activeStyles : null} to={`/about`}>About</NavLink>
        <NavLink style={({ isActive }) => isActive ? activeStyles : null} to={`/lessons`}>Lessons</NavLink>
        <NavLink style={({ isActive }) => isActive ? activeStyles : null} to={`/instructors`}>Instructors</NavLink>
        <NavLink style={({ isActive }) => isActive ? activeStyles : null} to={`/recommendations`}>Recommendations</NavLink>
        <NavLink style={({ isActive }) => isActive ? activeStyles : null} to={`/login`}>Login</NavLink>
        <div className="profile-select">
          <select value={selectedProfile} onChange={(e) => setSelectedProfile(e.target.value)}>
            <option value="">Add Profile</option>
            <option value="student">Student</option>
            <option value="instructor">Instructor</option>
          </select>
        </div>
      </nav>
    </header>
  );
}

export default Header;
