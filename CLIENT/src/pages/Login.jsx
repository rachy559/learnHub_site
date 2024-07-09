import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { serverRequests } from '../Api';
import { ShowHeadersContext, UserContext } from "../App";
import Alert from '@mui/material/Alert';
import '../css/signup.css';



const Login = ({ setShowHeaders }) => {
  const showHeaders = useContext(ShowHeadersContext);
  const userContext = useContext(UserContext);
  const [isError, setIsError] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  function handleLogin() {

    const fetchUsers = async () => {
      try {
        serverRequests('POST', 'login', formData)
          .then((response) => {
            const { accessToken, user } = response; // חילוץ היוזר והטוקן מהתגובה
            // const { accessToken, refreshToken, user } = response; // חילוץ היוזר והטוקן מהתגובה
            sessionStorage.setItem("accessToken", accessToken);
            // sessionStorage.setItem("refreshToken", refreshToken);
            if (user) {
              if (user.roles === "HOLDING") {
                console.log("ggggg")
                setIsError(true)
              }
              else {
                console.log("here", user)
                alert(`Login successful! Welcome back ${user.firstName}😎`);
                setShowHeaders(false);
                userContext.setUser({ ...userContext.user, ...user })
                if (user.userId === 1) {
                  navigate(`/manager_homePage`);
                }
                else {
                  navigate(`/homePage`);
                }
              }

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

  return (
    <div style={{ paddingTop: '100px' }}> {/* Ensures content is below the fixed header */}
      <div className='registerDiv'>
        <h1>שמחים שחזרת</h1><br></br>
        {isError && <Alert style={{ marginBottom: '20px' }} severity="error">משתמש לא מאושר ע"י מנהל המערכת</Alert>}
        <form className='registerForm'>
          <div>
            <input
              placeholder='דואר אלקטרוני'
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div><br></br>
          <div>
            <input
              placeholder='סיסמא'
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
      </div>
      <NavLink
        to="/signUp"
      >
        עדין לא רשום אצלנו? הרשם
      </NavLink>
    </div>
  );
};

export default Login;