import React, { useState, useEffect, useContext } from 'react';
import { serverRequests } from '../Api';
import { UserContext } from '../App';
import '../css/studentProfile.css';

const StudentProfile = () => {
  const userContext = useContext(UserContext);
  const [student, setStudent] = useState({});
  const [lessons, setLessons] = useState([]);
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split('T')[0];

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        console.log(userContext.user.userId);
        serverRequests('GET', `students/${userContext.user.userId}`).then((user) => {
          if (user) {
            userContext.setUser({ ...userContext.user, ...user });
            console.log("user", user);
            setStudent({ ...user.student_details });
            setLessons(user.student_details.lessons);
            console.log(user.student_details.lessons);
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

  console.log(lessons);

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div style={{ paddingTop: '150px' }}></div>
          <h2>שלום {student.first_name} {student.last_name}</h2>
          <h3>פרטי הסטודנט:</h3>
        </div>
        <div className="profile-details">
          <div className="detail-item"><strong>שם:</strong> {student.first_name} {student.last_name}</div>
          <div className="detail-item"><strong>תאריך לידה:</strong> {new Date(student.birth_date).toLocaleDateString()}</div>
          <div className="detail-item"><strong>כתובת:</strong> {student.city} {student.street} {student.house_number}</div>
          <div className="detail-item"><strong>דוא"ל:</strong> {student.email}</div>
          <div className="detail-item"><strong>טלפון:</strong> {student.phone}</div>
          <div className="detail-item"><strong>סטטוס סטודנט:</strong> {student.studentStatus}</div>
        </div>
      </div>
      <div>
        <h3>השיעורים שלי:</h3>
        {lessons.length === 0 ? (
          <div className="noLessonsMessage">אין שיעורים שאתה רשום אליהם</div>
        ) : (
          lessons.map((lesson, key) => (
            (!lesson || lesson.lesson_date >= formattedDate) ? (
              <div key={key} className="subjectDiv">
                <div className="lessonHeader">
                  <div className="lessonTitle">{lesson.subject_name}</div>
                  <div className="lessonInfo">
                    <div className="lessonPrice">₪{lesson.lesson_price} לשעה</div>
                  </div>
                </div>
                <div className="lessonBody">
                  <div className="lessonDetails">
                    <p><strong>שפה:</strong> {lesson.lesson_language}</p>
                    <p><strong>זמן שיעור:</strong> {lesson.timeLesson}</p>
                    <p><strong>אורך שיעור:</strong> {lesson.lesson_time}</p>
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
                    {!lesson.zoom_link && (
                      <p><strong>כתובת שיעור:</strong> {lesson.tutor_address.city}, {lesson.tutor_address.street} {lesson.tutor_address.house_number}</p>
                    )}
                    <p><strong>שם מרצה:</strong> {lesson.tutor_name}</p>
                  </div>
                  <img className='deleteIcon' src='../pictures/delete.png'></img>
                    <img className='updateIcon' src='../pictures/update.png'></img>
                </div>
              </div>
            ) : (
                <></>
            )
          ))
        )}
      </div>
    </div>
  );
}

export default StudentProfile;
