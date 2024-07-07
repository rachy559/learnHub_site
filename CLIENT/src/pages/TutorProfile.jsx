import React, { useState, useEffect, useContext } from 'react';
import { serverRequests } from '../Api';
import { UserContext } from '../App';
import '../css/studentProfile.css';
import { FaTrash, FaPlus } from 'react-icons/fa';
import { sub } from 'date-fns';


const TutorProfile = () => {
    const userContext = useContext(UserContext);
    const [tutor, setTutor] = useState({});
    const [lessons, setLessons] = useState([]);
    const [availableTimes, setAvailableTimes] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentSubject, setCurrentSubject] = useState("");
    const [formDataSubjects, setFormDataSubjects] = useState({
        tutor_id: userContext.user.userId,
        subjects: []
    })
    const [currentLanguage, setCurrentLanguage] = useState("");
    const [formDataLanguages, setFormDataLanguages] = useState({
        tutor_id: userContext.user.userId,
        languages: []
    })
    const [inputValues, setInputValues] = useState([]);
    const [formDataLesson, setFormDataLesson] = useState({
        levelLesson: "",
        lessonTime: 60,
        priceLesson: "",
        zoomLink: "",
        tutor_id: userContext.user.userId,
        subjectName: "",
        language_name: []
    });
    const [formData, setFormData] = useState({
        tutorId: "",
        updatedTimes: []
    });
    const [subjects, setSubjects] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [isClickAddLesson, setIsClickAddLesson] = useState(false);
    const [isClickAddLanguage, setIsClickAddLanguage] = useState(false);
    const [isClickAddSubject, setIsClickAddSubject] = useState(false);

    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];
    useEffect(() => {
        try {
            serverRequests('GET', `tutors/${userContext.user.userId}`).then((user) => {
                if (user) {
                    userContext.setUser({ ...userContext.user, ...user });
                    setTutor({ ...user.tutor_details });
                    setLessons(user.tutor_details.lessons);
                    setAvailableTimes(user.tutor_details.available_times);
                    setSubjects(user.tutor_details.subjects.split(','));
                    setLanguages(user.tutor_details.languages.split(','));
                    setInputValues(user.tutor_details.available_times.map(day => day.available_times.split(",")));
                } else {
                    alert("Login failed. Invalid username or password.");
                }
            });
        } catch (err) {
            console.error(err);
        }
    }, []);

    useEffect(() => {
        if (formData) {
            try {
                serverRequests('PUT', `calendar`, formData);
            } catch (err) {
                console.log(err);
            }
        }
    }, [formData]);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        setIsEditing(false);
        const updatedTimes = availableTimes.map((day, index) => ({
            ...day,
            available_times: inputValues[index].join(","),
        }));
        const newFormData = {
            tutorId: userContext.user.userId,
            updatedTimes: updatedTimes
        };
        setAvailableTimes(updatedTimes);
        setFormData(newFormData);
    };

    const handleChange = (dayIndex, timeIndex, value) => {
        const updatedInputValues = [...inputValues];
        updatedInputValues[dayIndex][timeIndex] = value.slice(0, 2);
        setInputValues(updatedInputValues);
    };

    const handleDelete = (dayIndex, timeIndex) => {
        const updatedInputValues = [...inputValues];
        updatedInputValues[dayIndex].splice(timeIndex, 1);
        setInputValues(updatedInputValues);
    };

    const handleAdd = (dayIndex) => {
        const updatedInputValues = [...inputValues];
        updatedInputValues[dayIndex].push("10"); // Default value for new time
        setInputValues(updatedInputValues);
    };

    const handleAddLesson = () => {
        try {
            serverRequests('POST', 'lessons', formDataLesson).then(() => {
                alert('השיעור התווסף בהצלחה')
                setIsClickAddLesson(false);
            })
        } catch (err) {
            console.log(err);
        }
    };

    const hourOptions = [];
    for (let i = 10; i <= 22; i++) {
        hourOptions.push(`${i}:00`);
    }

    const handleChangeInputs = (e) => {
        const { name, value, options } = e.target;
        if (name === "language_name") {
            const selectedOptions = Array.from(options).filter(option => option.selected).map(option => option.value);
            setFormDataLesson({
                ...formDataLesson,
                [name]: selectedOptions
            });
        } else if (name === "zoomLink") {
            setFormDataLesson({
                ...formDataLesson,
                [name]: value || NULL
            });
        } else {
            setFormDataLesson({
                ...formDataLesson,
                [name]: value
            });
        }
    }

    const handleAddSubject = () => {
        try {
            console.log(formDataSubjects)
            serverRequests('POST', `lanSub/sub`, formDataSubjects).then(() => {
                setFormDataSubjects((prevFormData) => ({
                    ...prevFormData,
                    subjects: []
                }));
                setIsClickAddSubject(false)
            })
        }
        catch (err) {
            console.log("err", err);
        }
    }

    const handleChangeSub = (e) => {
        setFormDataSubjects((prevFormData) => ({
            ...prevFormData,
            subjects: [...prevFormData.subjects, currentSubject]
        }));
        setCurrentSubject("");
    }

    const handleAddLanguage = () => {
        try {
            console.log(formDataLanguages)
            serverRequests('POST', `lanSub/lan`, formDataLanguages).then(() => {
                setFormDataLanguages((prevFormData) => ({
                    ...prevFormData,
                    lsnguages: []
                }));
                setIsClickAddLanguage(false)
            })
        }
        catch (err) {
            console.log("err", err);
        }
    }

    const handleChangeLan = (e) => {
        setFormDataLanguages((prevFormData) => ({
            ...prevFormData,
            languages: [...prevFormData.languages, currentLanguage]
        }));
        setCurrentLanguage("");
    }


    return (
        <>
            <div style={{ paddingTop: '100px' }}></div>
            <div className="profile-container">
                <div className="profile-card">
                    <div className="profile-header">
                        <div style={{ paddingTop: '50px' }}></div>
                        <h2>שלום {tutor.first_name} {tutor.last_name}</h2>
                        <h3>פרטי מורה:</h3>
                    </div>
                    <div className="profile-details">
                        <div className="detail-item"><strong>שם:</strong> {tutor.first_name} {tutor.last_name}</div>
                        <div className="detail-item"><strong>תאריך לידה:</strong> {new Date(tutor.birth_date).toLocaleDateString()}</div>
                        <div className="detail-item"><strong>כתובת:</strong> {tutor.city} {tutor.street} {tutor.house_number}</div>
                        <div className="detail-item"><strong>דוא"ל:</strong> {tutor.email}</div>
                        <div className="detail-item"><strong>טלפון:</strong> {tutor.phone}</div>
                        <div className="detail-item"><strong>מיועד למגדר:</strong> {tutor.intended_for_gender}</div>
                        <div className="detail-item"><strong>מקצועות:</strong> {tutor.subjects}</div>
                    </div>
                </div>
            </div>

            <div className='available'>
                <div className='headerTimes'><strong>השעות שלך:</strong></div>
                <div className='availableTimes'>
                    {availableTimes.map((available, dayIndex) => (
                        <div key={dayIndex}>
                            <div className="day">
                                <strong>יום {available.available_day}:</strong>
                                {isEditing && (
                                    <button className='btn' onClick={() => handleAdd(dayIndex)}>
                                        <FaPlus />
                                    </button>
                                )}
                            </div>
                            {inputValues[dayIndex] && inputValues[dayIndex].map((time, timeIndex) => (
                                <div className='hours' key={timeIndex} style={{ display: 'flex', alignItems: 'center' }}>
                                    {isEditing ? (
                                        <>
                                            <>
                                                <select className='sel'
                                                    value={time}
                                                    onChange={(e) => handleChange(dayIndex, timeIndex, e.target.value)}
                                                >
                                                    <option value={time}>{time}:00</option>
                                                    {hourOptions.filter(hour => hour !== `${time}:00`).map((hour) => (
                                                        <option key={hour} value={hour}>{hour}</option>
                                                    ))}
                                                </select>
                                                <button className='btn' onClick={() => handleDelete(dayIndex, timeIndex)}>
                                                    <FaTrash />
                                                </button>

                                            </>

                                        </>

                                    ) : (
                                        <>
                                            {time === ' ' ? (
                                                <>
                                                    {console.log(time)}
                                                    <span className='spanHour'>  {time === ' ' ? `` : `${time}:00`}</span>
                                                </>
                                            ) :
                                                (<>
                                                    <span className='spanHour'>{time === ' ' ? `` : `${time}:00`}</span>
                                                </>)}
                                        </>)}
                                </div>
                            ))}
                        </div>
                    ))}


                </div>
                <button className='save' onClick={isEditing ? handleSaveClick : handleEditClick}>
                    {isEditing ? 'שמור' : 'עדכון'}
                </button>
            </div>

            <div>
                {lessons === null ? (
                    <div className="noLessonsMessage">אין שיעורים שנקבעו</div>
                ) : (
                    lessons.map((lesson, key) => (
                        (!lesson || lesson.lesson_date >= formattedDate) ? (
                            <>
                                < div key={key} className="subjectDiv" >
                                    <div className="lessonHeader">
                                        <div className="lessonTitle">{lesson.lesson_subject}</div>
                                        <div className="lessonInfo">
                                            <div className="lessonPrice">₪{lesson.lesson_price} לשעה</div>
                                        </div>
                                    </div>
                                    <div className="lessonBody">
                                        <div className="lessonDetails">
                                            <p><strong>זמן שיעור:</strong> {lesson.timeLesson}</p>
                                            <p><strong>אורך שיעור:</strong> 60 דקות</p>
                                            <p><strong>רמת שיעור:</strong> {lesson.lesson_level}</p>
                                            <p><strong>יום השיעור:</strong> {lesson.lesson_day}</p>
                                            <p><strong>תאריך שיעור:</strong> {lesson.lesson_date}</p>
                                            {lesson.zoom_link ? (
                                                <>
                                                    <p><strong>פרונטלי/אונליין:</strong> אונליין</p>
                                                    <p><strong>קישור זום:</strong> {lesson.zoom_link}</p>
                                                </>
                                            ) : (
                                                <p><strong>פרונטלי/אונליין:</strong> פרונטלי</p>
                                            )}

                                            <p><strong>שם סטודנט:</strong> {lesson.student_first_name} {lesson.student_last_name}</p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <></>
                        )
                    ))
                )}
            </div>
            <button className='lessonBtn' onClick={() => setIsClickAddLesson(!isClickAddLesson)}>הוסף שיעור</button>
            {isClickAddLesson ? (
                <div className='newLesson'>
                    <form className='formLesson'>
                        <label htmlFor="levelLesson">רמת השיעור:</label>
                        <input
                            type="text"
                            id="levelLesson"
                            name="levelLesson"
                            value={formDataLesson.levelLesson}
                            onChange={handleChangeInputs}
                            required />

                        <label htmlFor="priceLesson">מחיר השיעור:</label>
                        <input
                            type="number"
                            id="priceLesson"
                            name="priceLesson"
                            value={formDataLesson.priceLesson}
                            onChange={handleChangeInputs}
                            required />

                        <label htmlFor="zoomLink">קישור זום:</label>
                        <input
                            type="url"
                            id="zoomLink"
                            name="zoomLink"
                            value={formDataLesson.zoomLink}
                            onChange={handleChangeInputs} />

                        <label htmlFor="subject">מקצוע השיעור:</label>
                        <select id="subject" name="subjectName" value={formDataLesson.subjectName} onChange={handleChangeInputs} required>
                            <option value="" disabled>בחר מקצוע</option>
                            {subjects.map((subject, index) => (
                                <option key={index} value={subject}>
                                    {subject}
                                </option>
                            ))}
                        </select>

                        <label htmlFor="languages">שפת השיעור (אפשר לבחור כמה שפות):</label>
                        <select id="languages" name="language_name" value={formDataLesson.language_name} onChange={handleChangeInputs} multiple required>
                            {languages.map((language, index) => (
                                <option key={index} value={language}>
                                    {language}
                                </option>
                            ))}
                        </select>

                        <button onClick={handleAddLesson}>אישור </button>
                    </form>
                </div>) :
                (<></>)}
            <button className='lessonBtn' onClick={() => setIsClickAddSubject(!isClickAddSubject)}>הוסף מקצוע</button>
            {isClickAddSubject ? (
                <>
                    <div>
                        <input
                            placeholder="מקצוע"
                            type="text"
                            name="subjects"
                            value={currentSubject}
                            onChange={(e) => setCurrentSubject(e.target.value)}
                        />
                        <button type="button" onClick={handleChangeSub}>+ הוסף</button>
                        <button type="button" onClick={handleAddSubject}>סיים</button>
                    </div>
                </>
            ) :
                (<></>)

            }
            <button className='lessonBtn' onClick={() => setIsClickAddLanguage(!isClickAddLanguage)}>הוסף שפה</button>
            {isClickAddLanguage ? (
                <>
                    <div>
                        <input
                            placeholder="שפה"
                            type="text"
                            name="languages"
                            value={currentLanguage}
                            onChange={(e) => setCurrentLanguage(e.target.value)}
                        />
                        <button type="button" onClick={handleChangeLan}>+ הוסף</button>
                        <button type="button" onClick={handleAddLanguage}>סיים</button>
                    </div>
                </>
            ) :
                (<></>)

            }

        </>
    );
};

export default TutorProfile;
