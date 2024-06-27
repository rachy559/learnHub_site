import React, { useState, useEffect, useContext } from 'react';
import { serverRequests } from '../Api';
import { UserContext } from '../App';
import '../css/studentProfile.css';

const StudentProfile = () => {
  const userContext = useContext(UserContext);
  const [student, setStudent] = useState({});

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const user = await serverRequests('GET', `students/${userContext.user.userId}`);
        if (user) {
          userContext.setUser({ ...userContext.user, ...user });
          setStudent(user);
        } else {
          alert("Login failed. Invalid username or password.");
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchStudentData();
  }, [userContext.user.userId]);

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
        <div style={{ paddingTop: '150px' }}></div>
          <h2>שלום {student.firstName} {student.lastName}</h2>
          <h3>פרטי הסטודנט:</h3>
        </div>
        <div className="profile-details">
          <div className="detail-item"><strong>שם:</strong> {student.firstName} {student.lastName}</div>
          <div className="detail-item"><strong>תאריך לידה:</strong> {new Date(student.birth_date).toLocaleDateString()}</div>
          <div className="detail-item"><strong>כתובת:</strong> {student.city} {student.street} {student.house_number}</div>
          <div className="detail-item"><strong>דוא"ל:</strong> {student.email}</div>
          <div className="detail-item"><strong>טלפון:</strong> {student.phone}</div>
          <div className="detail-item"><strong>מגדר:</strong> {student.gender}</div>
          <div className="detail-item"><strong>סטטוס סטודנט:</strong> {student.studentStatus}</div>
        </div>
      </div>
    </div>
  );
}

export default StudentProfile;
