import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { serverRequests } from '../Api';
import { ShowHeadersContext, UserContext } from "../App";


const Login = ({ setShowHeaders}) => {
  const showHeaders = useContext(ShowHeadersContext);
  const userContext = useContext(UserContext);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  
  function handleLogin() {
    
    // const USERS_API_URL = `users?email=${formData.username}&password=${formData.password}`;

    const fetchUsers = async () => {
      try {
        serverRequests('POST', 'login', formData)
        .then((user) => {
          if (user) {
            console.log(user)
            alert(`Login successful! Welcome back ${user.firstName}😎`);
            setShowHeaders(false);
            localStorage.setItem('loggedInUser', JSON.stringify(user));
            console.log('Stored user data:', user); 
            userContext.setUser({ ...userContext.user, ...user })
            navigate(`/homePage`);
          } else {
            alert("Login failed. Invalid username or password.");
          }
          
        })
      } catch (err) {
        alert("Login failed. An error occurred.");
        console.log(err);
      }
    }; 

    fetchUsers();
  }
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  console.log(userContext)

  return (
    <div style={{ paddingTop: '100px' }}> {/* Ensures content is below the fixed header */}

    <div className='loginDiv'>

      <h1>Login</h1><br></br>
      <form className='loginForm'>
        <div>
          <input
            placeholder='email'
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div><br></br>
        <div>
          <input
            placeholder='password'
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div><br></br>
        <button type="button" onClick={() => handleLogin()}>
          Login
        </button>

      </form>
      <NavLink
        to="/signUp"
      >
        Dont have an account? Register here
      </NavLink>
    </div>
</div>
  );
};

export default Login;