import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { serverRequests } from '../Api';
import '../css/signup.css';
import Modal from 'react-modal';
import Alert from '@mui/material/Alert';
import { addYears, subYears } from 'date-fns';
Modal.setAppElement('#root');

import { ShowHeadersContext, UserContext } from "../App";
const SignUp = ({ setShowHeaders }) => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];
    const showHeaders = useContext(ShowHeadersContext);
    const userContext = useContext(UserContext);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isConfirm, setIsConfirm] = useState(false);
    const [hide, setHide] = useState(false);
    const navigate = useNavigate();
    const [isChecked, setIsChecked] = useState(false);
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
        email: ""
    });
    const [formDataStudent, setFormDataStudent] = useState({
        status: "",
        email: userContext.user.email
    });
    const [errors, setErrors] = useState({});
    const updateErrorsArray = {};
    const [currentLanguage, setCurrentLanguage] = useState("");
    const [currentSubject, setCurrentSubject] = useState("");
    const [file, setFile] = useState(null);


    const USERS_API_URL = `users?email=${formData.email}`;

    const sendEmail = async () => {
        const emailData = {
            email: 'learnhubproject2024@gmail.com', 
            subject: ' בקשת משתמש לאישור מרצה',
            text: `
        <div style="direction: rtl; text-align: right;">
            ${userContext.user.firstName} ${userContext.user.lastName} מבקש להיות מרצה ומחכה לאישור.
            כנס לאזור האישי שלך על מנת לאשר/לא לאשר את המשתמש.
        </div>
    `,
        };

        try {
            serverRequests('POST', 'send-email', emailData).then((result) => {
                if (result) {
                    console.log('Email sent successfully');
                } else {
                    console.error('Error sending email:', result.message);
                }
            })


        } catch (error) {
            console.error('Error:', error);
        }
    };


    function createProfileTutor() {
        serverRequests('POST', 'tutors', formDataTutor).then((userId) => {
            userContext.setUser({ ...userContext.user, ...formDataTutor, userId: userId.response });
            setIsConfirm(true)
            window.scrollTo({ top: 0, behavior: 'smooth' });
            sendEmail();
            setTimeout(() => {
                navigate('/homePage');
            }, 5000);
        })

    }

    function closeModal() {
        setIsOpen(false);
    }

    function createProfileStudent() {
        try {
                serverRequests('POST', 'students', formDataStudent).then((response) => {
                    userContext.setUser({ ...userContext.user, ...response });
                })
                setHide(false);
                setShowHeaders(!showHeaders);
                navigate('/homePage')
            }
        
        catch (err) {
            console.log(err);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (userContext.user.rollId === 2) {
            setFormDataStudent((prevFormData) => ({
                ...prevFormData,
                [name]: value
            }));
        }
        else if (userContext.user.rollId === 4) {
            setFormDataTutor((prevFormData) => ({
                ...prevFormData,
                [name]: value
            }));
        }

        setFormData({
            ...formData,
            [name]: value
        });
        setErrors(prevErrors => {
            return {
                ...prevErrors,
                [name]: ""
            }
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

    const openModal = () => {
        setIsOpen(true);
    };

    const ContinueDetails = async (e) => {
        console.log(formData);
        e.preventDefault();
        if (!isNaN(formData.firstName)) {
            updateErrorsArray.firstName = "שם פרטי יכול לכלול אותיות בלבד.";
        }
        if (!isNaN(formData.lastName)) {
            updateErrorsArray.lastName = "שם משפחה יכול לכלול אותיות בלבד.";
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            updateErrorsArray.email = "כתובת אימייל אינה תקינה.";
        }
        if (isNaN(formData.phone)) {
            updateErrorsArray.phone = "מספר פלאפון חייב לכלול רק מספרים."
        }
        if (!isNaN(formData.city)) {
            updateErrorsArray.city = "עיר חייב להכיל אותיות בלבד."
        }
        if (!isNaN(formData.street)) {
            updateErrorsArray.street = "רחוב חייב להכיל אותיות בלבד."
        }
        if (isNaN(formData.house_number)) {
            updateErrorsArray.house_number = "מספר בית חייב להכיל מספרים בלבד."
        }
        const today = new Date();
        const birthDate = new Date(formData.birth_date);
        const minValidDate = subYears(today, 6);
        if (birthDate > minValidDate){
            updateErrorsArray.birth_date = ". מרצה חייב להיות מגיל 18 ומעלה. השימוש באתר ניתן מגיל 6 ומעלה."
        }
        if (formData.lastName && formData.password && formData.confirm_password && isChecked) {
            try {
                serverRequests('GET', USERS_API_URL, null).then((usersArr) => {
                    if (formData.confirm_password === formData.password) {
                        if (usersArr.length !== 0) {
                            alert('The email is already exists, choose another email!');
                        } 
                        if (Object.keys(updateErrorsArray).length > 0) {
                            setErrors(updateErrorsArray);
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
                                createDate: formattedDate,
                                password: formData.password,
                            };

                            serverRequests('POST', 'users', user).then((response) => {
                                userContext.setUser({ ...userContext.user, ...response });
                                localStorage.setItem('loggedInUser', JSON.stringify(response[0]));
                            });
                            alert(`You can continue filling in your details ${user.firstName}! 😀`);
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
            setIsError(true)
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleFileUpload = async () => {
        const formDataFile = new FormData();
        formDataFile.append("file", file);
        formDataFile.append("tutor_id", userContext.user.userId);
        try {
            fetch("http://localhost:3000/upload", {
                method: 'POST',
                body: formDataFile,
            }).then((response) => {
                console.log(response);
            })

        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <>
            <div style={{ paddingTop: '100px' }}></div>
            {isConfirm && <Alert style={{ marginTop: '20px' }} severity="success">בקשתך נקלטה במערכת, חכה לאישור במייל ממנהל האתר</Alert>}
            <div className="registerDiv">
                <h1> הצטרף אלינו:</h1><br /><br />
                {isError && <Alert style={{ marginBottom: '20px' }} severity="error">לא מלאת את כל הפרטים הנדרשים</Alert>}
                <form className="registerForm">
                    <div>
                        <input
                            placeholder="שם פרטי"
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            required
                            onChange={handleChange}
                            className={errors.firstName ? "input Error" : formData.firstName ? "input Valid" : "input"}
                        />
                        {formData.firstName != "" && (formData.firstName.length < 2 || formData.firstName.length > 15 ? <h5 className="ErrorText">שם פרטי חייב לכלול בין 2-15 אותיות.</h5> : null)}
          {errors.firstName && <h5 className="ErrorText">{errors.firstName}</h5>}
                    </div><br /><br />

                    <div>
                        <input
                            placeholder="שם משפחה"
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            required
                            onChange={handleChange}
                            className={errors.lastName ? "input Error" : formData.lastName ? "input Valid" : "input"}
                        />
                        {formData.lastName != "" && (formData.lastName.length < 2 || formData.lastName.length > 15 ? <h5 className="ErrorText">שם משפחה חייב לכלול בין 2-15 אותיות.</h5> : null)}
          {errors.lastName && <h5 className="ErrorText">{errors.lastName}</h5>}
                    </div><br /><br />

                    <div>
                        <input
                            placeholder="דואר אלקטרוני"
                            type="email"
                            name="email"
                            value={formData.email}
                            required
                            onChange={handleChange}
                            className={errors.email ? "input Error" : formData.email ? "input Valid" : "input"}
                        />
                         {errors.email && <h5 className="ErrorText">{errors.email}</h5>}
                    </div><br /><br />

                    <div>
                        <input
                            placeholder="טלפון"
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            required
                            onChange={handleChange}
                            className={errors.phone ? "input Error" : formData.phone ? "input Valid" : "input"}
                        />
                            {formData.phone != "" && (formData.phone.length < 10 ? <h5 className="ErrorText">מספר פלאפון חייב לכלול בדיוק 10 ספרות.</h5> : null)}
          {errors.phone && <h5 className="ErrorText">{errors.phone}</h5>}
                    </div><br /><br />

                    <div>
                        <label className='gender'>מגדר:</label>
                        <select
                            name="gender"
                            value={formDataTutor.gender}
                            required
                            onChange={handleChange}
                        >
                            <option value="" disabled>בחר מגדר</option>
                            <option value="זכר">זכר</option>
                            <option value="נקבה">נקבה</option>
                        </select>
                    </div><br /><br />

                    <div>
                        <input
                            placeholder="תאריך לידה"
                            type="date"
                            name="birth_date"
                            value={formData.birth_date}
                            required
                            onChange={handleChange}
                        />
                            {errors.birth_date && <h5 className="ErrorText">{errors.birth_date}</h5>}
                    </div><br /><br />

                    <div>
                        <input
                            placeholder="עיר"
                            type="text"
                            name="city"
                            required
                            value={formData.city}
                            onChange={handleChange}
                        />
                        {errors.city && <h5 className="ErrorText">{errors.city}</h5>}
                    </div><br /><br />

                    <div>
                        <input
                            placeholder="רחוב"
                            type="text"
                            name="street"
                            required
                            value={formData.street}
                            onChange={handleChange}
                        />
                        {errors.street && <h5 className="ErrorText">{errors.street}</h5>}
                    </div><br /><br />

                    <div>
                        <input
                            placeholder="מספר בית"
                            type="number"
                            name="house_number"
                            required
                            min={`1`}
                            value={formData.house_number}
                            onChange={handleChange}
                        />
                        {errors.house_number && <h5 className="ErrorText">{errors.house_number}</h5>}
                    </div><br /><br />

                    <div>
                        <input
                            placeholder="סיסמא"
                            type="password"
                            name="password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                        />
                        {formData.password != "" && (formData.password.length < 8 ? <h5 className="ErrorText">ססמא חייבת להכיל לא פחות מ-8 תווים.</h5> : null)}
                    </div><br /><br />

                    <div>
                        <input
                            placeholder="אימות סיסמא"
                            type="password"
                            name="confirm_password"
                            required
                            value={formData.confirm_password}
                            onChange={handleChange}
                        />
                            {formData.confirm_password != ""&&(formData.confirm_password != formData.password? <h5 className="ErrorText">ססמא שגויה. נסה שוב.</h5> : null)}
                    </div><br /><br />
                    <div className="checkbox-container">
                        <input
                            type="checkbox"
                            id="terms-checkbox"
                            checked={isChecked}
                            onChange={() => setIsChecked(!isChecked)}
                            required
                        />
                        <label className='security'>
                            בבחירתך להמשיך, אתה מסכים <label className='check' onClick={openModal}>לתנאי השימוש ומדיניות האבטחה</label> שלנו
                        </label>
                    </div>
                    <button className='btn' type="button" onClick={ContinueDetails}>
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
                                <button className='btn' type='button' onClick={createProfileStudent}>אישור</button>
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
                                        required
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
                                    <button className='btn' type="button" onClick={handleAddLanguage}>+ הוסף</button>
                                </div>
                                <h4>העלאת תמונה</h4>
                                <div className='container'>
                                    <input type='file' onChange={handleFileChange} name="file" />
                                    <button className='btn' type='button' onClick={handleFileUpload}>העלה קבצים</button>
                                </div>
                                <h4>העלאת רשיון הוראה</h4>
                                <div className='container'>
                                    <input type='file' onChange={handleFileChange} name="file" />
                                    <button className='btn' type='button' onClick={handleFileUpload}>העלה קבצים</button>
                                </div>

                                <button className='btn' type='button' onClick={createProfileTutor}>אישור</button>
                            </form>

                        </>

                    )) : (<></>)}
                </div>
                <NavLink
                    to="/login"
                >
                    אתה כבר רשום אצלנו? התחבר
                </NavLink>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    className='customStyles'


                >
                    <span className="close" onClick={closeModal}>&times;</span>
                    <p><strong>תנאי שימוש לאתר:</strong><br />
                        ברוכים הבאים לאתר שלנו לקביעת שיעורים פרטיים. השימוש באתר מותנה בקבלת התנאים וההתניות הבאים. אם אינך מסכים לתנאים הללו, אנא הימנע משימוש באתר.<br />
                        שירותים האתר מספק פלטפורמה למשתמשים לקבוע שיעורים פרטיים עם מורים. כל העסקאות וההתקשרות נעשות ישירות בין המשתמש למורה.<br />
                        שימוש באתר אתה מתחייב להשתמש באתר בהתאם לחוקים והתקנות החלים, ולא להשתמש באתר לכל מטרה בלתי חוקית או מזיקה.<br />
                        רישום משתמש לשם קביעת שיעורים, ייתכן שתידרש להירשם ולספק פרטים אישיים. אתה אחראי לשמור על סודיות פרטי החשבון והסיסמה שלך.<br />
                        קניין רוחני כל התכנים, העיצובים, התמונות והחומרים באתר הם רכושנו הבלעדי או רכוש צדדים שלישיים, ואין להעתיקם או להשתמש בהם ללא אישור בכתב.<br />
                        הגבלת אחריות אנו לא אחראים לכל נזק ישיר או עקיף הנגרם משימוש באתר או מהתכנים והמידע המופיעים בו. השירותים ניתנים "כפי שהם" וללא אחריות מכל סוג.<br />
                        שינויים באתר אנו שומרים לעצמנו את הזכות לשנות או להפסיק את השירותים באתר בכל עת וללא הודעה מוקדמת.<br />
                        חוק וסמכות שיפוט תנאים אלה כפופים לחוקי מדינת ישראל, וכל סכסוך יובא להכרעה בבתי המשפט המוסמכים במדינת ישראל.<br />
                    </p>

                    <p><strong>מדיניות אבטחה</strong><br />
                        אבטחת המידע שלך חשובה לנו, ולכן אנו נוקטים באמצעים רבים על מנת להגן על המידע האישי שלך.<br />
                        איסוף מידע אנו אוספים מידע אישי, כגון שם, כתובת דוא"ל ומספר טלפון, לצורך מתן השירותים באתר.<br />
                        שימוש במידע אנו משתמשים במידע שנאסף לצורך ניהול חשבונך, קביעת שיעורים והתאמת השירותים לצרכים שלך.<br />
                        שיתוף מידע אנו לא משתפים מידע אישי עם צדדים שלישיים אלא אם כן נדרש לעשות כן על פי חוק או לצורך מתן השירותים.<br />
                        אבטחת מידע אנו משתמשים בטכנולוגיות הצפנה ובאמצעים פיזיים, אלקטרוניים ונהלים כדי להגן על המידע האישי שלך מפני גישה לא מורשית.<br />
                        גישה למידע יש לך זכות לגשת למידע האישי שלך, לעדכן אותו או למחוק אותו. לשם כך, פנה אלינו באמצעות פרטי הקשר המופיעים באתר.<br />
                        שינויים במדיניות אנו שומרים לעצמנו את הזכות לעדכן את מדיניות האבטחה בכל עת. עדכונים אלו יפורסמו באתר, ואנו נודיע לך במידת הצורך.<br />
                    </p>

                </Modal>
            </div>
        </>
    );

};

export default SignUp;
