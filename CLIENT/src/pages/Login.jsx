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
  const [errors, setErrors] = useState({});
  const updateErrorsArray = {};

  const navigate = useNavigate();

  function handleLogin() {

    const fetchUsers = async () => {
      try {
        serverRequests('POST', 'login', formData)
          .then((response) => {
            const { accessToken, user } = response; 
            sessionStorage.setItem("accessToken", accessToken);
            if (user) {
              if (user.roles === "HOLDING") {
                setIsError(true)
              }
              else {
                alert(`שמחים לראותך שוב ${user.firstName}😎`);
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
              alert("התחברות נכשלה");
            }

          })
      } catch (err) {
        alert("התחברות נכשלה");
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
    <div style={{ paddingTop: '100px' }}> 
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