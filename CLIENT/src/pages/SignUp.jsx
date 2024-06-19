import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { serverRequests } from '../Api';
import { ShowHeadersContext, UserContext } from "../App";

const SignUp = ({ setShowHeaders, setUserData }) => {
    const showHeaders = useContext(ShowHeadersContext);
    const userContext = useContext(UserContext);
    const [hide, setHide] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        gender: "",
        birth_date: new Date().toISOString().substring(0, 10),
        rollId: userContext.user.rollId,
        city: "",
        street: "",
        house_number: 0,
        password: "",
        confirm_password: ""
    });
    const [formDataTutor, setFormDataTutor] = useState({
        intended_for_gender: "",
        languages: [],
        subjects: [], 
        email:userContext.user.email
    });

    const [formDataStudent, setFormDataStudent] = useState({
        status: "",
    });

    const [currentLanguage, setCurrentLanguage] = useState("");
    const [currentSubject, setCurrentSubject] = useState("");

    const USERS_API_URL = `users?email=${formData.email}`;

    function createProfileTutor() {
        serverRequests('POST', 'tutors', formDataTutor).then((response) => {
            userContext.setUser({ ...userContext.user, ...formDataTutor });
        })
        console.log("n",userContext.user)
    }

    function createProfileStudent() {
        setHide(false);
    }


    console.log(userContext.user.rollId)
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (userContext.user.rollId === 2) {
            setFormDataStudent((prevFormData) => ({
                ...prevFormData,
                [name]: value
            }));
        }
        else if (userContext.user.rollId === 3) {
            setFormDataTutor((prevFormData) => ({
                ...prevFormData,
                [name]: value
            }));
        }

        setFormData({
            ...formData,
            [name]: value

        });


    };

    const handleAddLanguage = () => {
        setFormDataTutor((prevFormData) => ({
            ...prevFormData,
            languages: [...prevFormData.languages, currentLanguage]
        }));
        setCurrentLanguage("");
    };

    const handleAddSubject = () => {
        setFormDataTutor((prevFormData) => ({
            ...prevFormData,
            subjects: [...prevFormData.subjects, currentSubject]
        }));
        setCurrentSubject("");
    };
    const ContinueDetails = async () => {
        console.log(formData)
        if (formData.lastName && formData.password && formData.confirm_password) {
            try {
                serverRequests('GET', USERS_API_URL, null).then((usersArr) => {
                    if (formData.confirm_password === formData.password) {
                        if (usersArr.length !== 0) {
                            alert('The email is already exists, choose another email!')
                        }
                        else {

                            const user = {
                                firstName: formData.firstName,
                                lastName: formData.lastName,
                                email: formData.email,
                                phone: formData.phone,
                                gender: formData.gender,
                                birth_date: formData.birth_date,
                                rollId: formData.rollId,
                                city: formData.city,
                                street: formData.street,
                                house_number: formData.house_number,
                                password: formData.password,
                            }

                            serverRequests('POST', 'users', user).then((response) => {
                                console.log("res", response[0])
                                userContext.setUser({ ...userContext.user, ...user });
                                localStorage.setItem('loggedInUser', JSON.stringify(response[0]));
                            })
                            alert(`You can continue filling in your details ${user.firstName}! 😀`);
                            setShowHeaders(!showHeaders);
                            setHide(true);
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
    console.log("user", userContext.user)

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
            <div className=''>
                {console.log(userContext.user.rollId)}
                {hide ? (userContext.user.rollId === 2 ? (
                    <>
                        <div>
                            <select
                                name="status"
                                value={formDataStudent.status}
                                onChange={handleChange}
                            >
                                <option value="">בחר רמה</option>
                                <option value="יסודי">יסודי</option>
                                <option value="תיכון">תיכון</option>
                                <option value="על תיכוני">על תיכוני</option>
                            </select>
                            <button type='button' onClick={createProfileStudent}>אישור</button>
                        </div>
                        <br />
                    </>
                ) : (
                    <>
                        <h2>Hello Tutor</h2>
                        <form className="registerForm">
                            <div>
                                <input
                                    placeholder="מיועד למגדר"
                                    type="text"
                                    name="intended_for_gender"
                                    value={formDataTutor.intended_for_gender}
                                    onChange={handleChange}
                                />
                            </div>
                            <br />

                            <div>
                                <input
                                    placeholder="מקצוע"
                                    type="text"
                                    name="currentSubject"
                                    value={currentSubject}
                                    onChange={(e) => setCurrentSubject(e.target.value)}
                                />
                                <button type="button" onClick={handleAddSubject}>+ הוסף</button>
                            </div>
                            <br />

                            <div>
                                <input
                                    placeholder="שפה"
                                    type="text"
                                    name="currentLanguage"
                                    value={currentLanguage}
                                    onChange={(e) => setCurrentLanguage(e.target.value)}
                                />
                                <button type="button" onClick={handleAddLanguage}>+ הוסף</button>
                            </div>
                            <button type='button' onClick={createProfileTutor}>אישור</button>
                        </form>
                    </>

                )) : (<></>)}
            </div>
            <NavLink
                to="/login"
            >
                Do you have an account already? Login here
            </NavLink>

        </div>
    );
};

export default SignUp