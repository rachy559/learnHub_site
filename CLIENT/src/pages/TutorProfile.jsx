import React, { useState, useEffect, useContext } from 'react';
import { serverRequests } from '../Api';
import { UserContext } from '../App';
import '../css/studentProfile.css';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment'


const localizer = momentLocalizer(moment)


const TutorProfile = () => {
    const userContext = useContext(UserContext);
    const [tutor, setTutor] = useState({});
    const [lessons, setLessons] = useState({});
    const [availableTimes, setAvailableTimes] = useState({});

    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                console.log(userContext.user.userId);
                serverRequests('GET', `tutors/${userContext.user.userId}`).then((user) => {
                    if (user) {
                        userContext.setUser({ ...userContext.user, ...user });
                        console.log("user", user);
                        setTutor({...user.tutor_details});
                        setLessons(user.tutor_details.lessons);
                        setAvailableTimes(user.tutor_details.available_times);
                    } else {
                        alert("Login failed. Invalid username or password.");
                    }
                });
            } catch (err) {
                console.error(err);
            }
        };
        fetchStudentData();

    }, []);
console.log(availableTimes)
      return (
        <>
            <div style={{ paddingTop: '100px' }}></div>
            <div className="profile-container">
                <div className="profile-card">
                    <div className="profile-header">
                        <div style={{ paddingTop: '150px' }}></div>
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
                {/* {availableTimes.map((available,key) => {
                    <div key={key} className="day"><strong>יום {available.available_day}</strong></div>
                })} */}
                <div className="day"><strong>תאריך לידה:</strong> {new Date(tutor.birth_date).toLocaleDateString()}</div>
                <div className="day"><strong>כתובת:</strong> {tutor.city} {tutor.street} {tutor.house_number}</div>
                <div className="day"><strong>דוא"ל:</strong> {tutor.email}</div>
                <div className="day"><strong>טלפון:</strong> {tutor.phone}</div>
                <div className="day"><strong>מיועד למגדר:</strong> {tutor.intended_for_gender}</div>
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
}

export default TutorProfile;
