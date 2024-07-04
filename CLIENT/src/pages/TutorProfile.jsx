import React, { useState, useEffect, useContext } from 'react';
import { serverRequests } from '../Api';
import { UserContext } from '../App';
import '../css/studentProfile.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { FaTrash, FaPlus } from 'react-icons/fa';

const localizer = momentLocalizer(moment);

const TutorProfile = () => {
    const userContext = useContext(UserContext);
    const [tutor, setTutor] = useState({});
    const [lessons, setLessons] = useState([]);
    const [availableTimes, setAvailableTimes] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [inputValues, setInputValues] = useState([]);
    const [formData, setFormData] = useState({
        tutorId: "",
        updatedTimes:[]
    });

    useEffect(() => {
            try {
                serverRequests('GET', `tutors/${userContext.user.userId}`).then((user) => {
                    if (user) {
                        userContext.setUser({ ...userContext.user, ...user });
                        setTutor({ ...user.tutor_details });
                        setLessons(user.tutor_details.lessons);
                        setAvailableTimes(user.tutor_details.available_times);
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

    const hourOptions = [];
    for (let i = 10; i <= 22; i++) {
        hourOptions.push(`${i}:00`);
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
                                ) : (
                                    <span className='spanHour'>{time}:00</span>
                                )}
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
                <Calendar
                    localizer={localizer}
                    // events={myEventsList}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500 }}
                />
            </div>
        </>
    );
};

export default TutorProfile;
