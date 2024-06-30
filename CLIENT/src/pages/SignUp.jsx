import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { serverRequests } from '../Api';
import '../css/signup.css';

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
        email: userContext.user.email
    });

    const [formDataStudent, setFormDataStudent] = useState({
        status: "",
        email: userContext.user.email
    });

    const [formDataFile, setFormDataFile] = useState({
        file:"",
        tutor_id:userContext.user.email
    });

    const [currentLanguage, setCurrentLanguage] = useState("");
    const [currentSubject, setCurrentSubject] = useState("");
    const [file, setFile] = useState(null);
    const [uploadError, setUploadError] = useState('');
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    

    const USERS_API_URL = `users?email=${formData.email}`;

    function createProfileTutor() {
        serverRequests('POST', 'tutors', formDataTutor).then((response) => {
            userContext.setUser({ ...userContext.user, ...formDataTutor });
        })
    }

    function createProfileStudent() {
        serverRequests('POST', 'students', formDataStudent).then((response) => {
            userContext.setUser({ ...userContext.user, ...formDataStudent });
        })
        setHide(false);
    }

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
        console.log(formData);
        if (formData.lastName && formData.password && formData.confirm_password) {
            try {
                serverRequests('GET', USERS_API_URL, null).then((usersArr) => {
                    if (formData.confirm_password === formData.password) {
                        if (usersArr.length !== 0) {
                            alert('The email is already exists, choose another email!');
                        } else {
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
                            };

                            serverRequests('POST', 'users', user).then((response) => {
                                console.log("res", response[0]);
                                userContext.setUser({ ...userContext.user, ...user });
                                localStorage.setItem('loggedInUser', JSON.stringify(response[0]));
                            });
                            alert(`You can continue filling in your details ${user.firstName}! 😀`);
                            setShowHeaders(!showHeaders);
                            setHide(true);
                        }
                    } else {
                        alert("The password and password verification are not the same");
                    }
                });
            } catch (error) {
                console.error(error.message);
            }
        } else {
            alert('You didnt fill all fields.');
        }
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile && selectedFile.type !== 'application/pdf') {
            setUploadError('Please select a PDF file.');
            setFile(null);
            setUploadSuccess(false);
        } else {
            setFile(selectedFile);
            setUploadError('');
            setUploadSuccess(false);
        }
    };

    const handleFileUpload = async (event) => {
        event.preventDefault();
        if (!file) {
            setUploadError('Please select a file to upload.');
            return;
        }

        setIsUploading(true);
        console.log("ff",file)
        const fileFormData = new FormData();
        fileFormData.append('file', file);
        console.log(fileFormData)
        serverRequests('POST', 'upload', fileFormData)
            .then(response => {
                setIsUploading(false);
                console.log(response);
                if (!response.ok) {
                    setUploadError('Failed to upload file.');
                    return;
                }
                return response.json();
            })
            .then(data => {
                if (data) {
                    const link = ({ target: { name: "degree_link", value: data.url } });
                    setUploadSuccess(true);
                    setFile(null);
                }
            })
            .catch(error => {
                setIsUploading(false);
                setUploadError('An error occurred while uploading the file.');
                console.error('File upload error:', error);
            });
    };

    return (
        <>
            <div style={{ paddingTop: '100px' }}></div>
            <div className="registerDiv">
            <h1> הצטרף אלינו:</h1><br />
                <form className="registerForm">
                    <div>
                        <input
                            placeholder="שם פרטי"
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                    </div><br />

                    <div>
                        <input
                            placeholder="שם משפחה"
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                    </div><br />

                    <div>
                        <input
                            placeholder="דואר אלקטרוני"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div><br />

                    <div>
                        <input
                            placeholder="טלפון"
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </div><br />

                    <div>
                        <label className='gender'>מגדר:</label>
                        <select
                            name="gender"
                            value={formDataTutor.gender}
                            onChange={handleChange}
                        >
                            <option value="" disabled>בחר מגדר</option>
                            <option value="זכר">זכר</option>
                            <option value="נקבה">נקבה</option>
                        </select>
                    </div><br />

                    <div>
                        <input
                            placeholder="תאריך לידה"
                            type="date"
                            name="birth_date"
                            value={formData.birth_date}
                            onChange={handleChange}
                        />
                    </div><br />

                    <div>
                        <input
                            placeholder="עיר"
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                        />
                    </div><br />

                    <div>
                        <input
                            placeholder="רחוב"
                            type="text"
                            name="street"
                            value={formData.street}
                            onChange={handleChange}
                        />
                    </div><br />

                    <div>
                        <input
                            placeholder="מספר בית"
                            type="number"
                            name="house_number"
                            value={formData.house_number}
                            onChange={handleChange}
                        />
                    </div><br />

                    <div>
                        <input
                            placeholder="סיסמא"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div><br />

                    <div>
                        <input
                            placeholder="אימות סיסמא"
                            type="password"
                            name="confirm_password"
                            value={formData.confirm_password}
                            onChange={handleChange}
                        />
                    </div><br />

                    <button type="button" onClick={ContinueDetails}>
                        המשך
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
                                    <label className='gender'>מיועד למגדר:</label>
                                    <select
                                        name="intended_for_gender"
                                        value={formDataTutor.intended_for_gender}
                                        onChange={handleChange}
                                    >
                                        <option value="" disabled>בחר מגדר</option>
                                        <option value="זכר">זכר</option>
                                        <option value="נקבה">נקבה</option>
                                    </select>
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
                            <div className='container'>
                                <input type='file' onChange={handleFileChange} name="file"/>
                               <button type='button' onClick={handleFileUpload}>העלה קבצים</button> 
                            </div>
                        </>

                    )) : (<></>)}
                </div>
                <NavLink
                    to="/login"
                >
                    Do you have an account already? Login here
                </NavLink>

            </div>
        </>
    );

};

export default SignUp;
