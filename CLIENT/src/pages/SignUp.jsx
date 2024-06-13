import React, { useState, useContext } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { serverRequests } from '../Api';

const SignUp = ({ setUserData }) => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        gender: "",
        birth_date: new Date().toISOString().substring(0, 10),
        city: "",
        street: "",
        house_number: 0,
        password: "",
        confirm_password: ""
    });



    const USERS_API_URL = `users?email=${formData.email}`;


    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value

        });
    };

    const ContinueDetails = async () => {
        console.log(formData)
        if (formData.lastName && formData.password && formData.confirm_password) {
            try {
                serverRequests('GET', USERS_API_URL, null).then((usersArr) => {
                    if (formData.confirm_password === formData.password) {
                        if (usersArr.length !== 0) {
                            alert('The username is already exists, choose another username!')
                        }
                        else {
                            const user = {
                                firstName: formData.firstName,
                                lastName: formData.lastName,
                                email: formData.email,
                                phone: formData.phone,
                                gender: formData.gender,
                                birth_date: formData.birth_date,
                                city: formData.city,
                                street: formData.street,
                                house_number: formData.house_number,
                                password: formData.password,
                            }
                            serverRequests('POST', 'users', user).then((response) => {
                                console.log("res", response[0])
                                setUserData(response[0]);
                                localStorage.setItem('loggedInUser', JSON.stringify(response[0]));

                            })
                            alert(`You can continue filling in your details ${user.username}! 😀`);
                            //   navigate('/end-of-registration');
                        }
                    }
                    else {
                        alert("The password and password verification are not the same")
                    }

                });

            } catch (error) {
                console.error(error.message);
            }
        } else {
            alert('You didnt fill all fields.')
        }
    };

    return (
        <div className="registerDiv">
            <h1>🌈 Join FriendsHub Today!</h1><br></br>
            <form className="registerForm">
                <div>
                    <input
                        placeholder="firstName"
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                </div><br></br>

                <div>
                    <input
                        placeholder="lastName"
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                </div><br></br>

                <div>
                    <input
                        placeholder="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div><br></br>

                <div>
                    <input
                        placeholder="phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </div><br></br>

                <div>
                    <input
                        placeholder="gender"
                        type="text"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                    />
                </div><br></br>


                <div>
                    <input
                        placeholder="birthDate"
                        type="date"
                        name="birth_date"
                        value={formData.birth_date}
                        onChange={handleChange}
                    />
                </div><br></br>

                <div>
                    <input
                        placeholder="city"
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                    />
                </div><br></br>

                <div>
                    <input
                        placeholder="street"
                        type="text"
                        name="street"
                        value={formData.street}
                        onChange={handleChange}
                    />
                </div><br></br>

                <div>
                    <input
                        placeholder="houseNumber"
                        type="number"
                        name="house_number"
                        value={formData.house_number}
                        onChange={handleChange}
                    />
                </div><br></br>

                <div>
                    <input
                        placeholder="password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div><br></br>

                <div>
                    <input
                        placeholder="confirm password"
                        type="password"
                        name="confirm_password"
                        value={formData.confirm_password}
                        onChange={handleChange}
                    />
                </div><br></br>

                <button type="button" onClick={ContinueDetails}>
                    Continue filling in details
                </button>
            </form>
            <NavLink
                to="/login"
            >
                Do you have an account already? Login here
            </NavLink>

        </div>
    );
};

export default SignUp