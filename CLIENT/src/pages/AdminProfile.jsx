import React, { useState, useContext, useEffect } from 'react';
import { UserContext, TutorsContext, FilterContext } from '../App';
import { serverRequests } from '../Api';
import { useNavigate } from 'react-router-dom';
import '../css/studentProfile.css';
import { sub } from 'date-fns';
import { FaTrash, FaPlus } from 'react-icons/fa';


const AdminProfile = () => {
    const userContext = useContext(UserContext);
    const [admin, setAdmin] = useState({});
    
    useEffect(() => {
        const fetchAdminData = async () => {
          try {
            serverRequests('GET', `manager/${userContext.user.userId}`)
            .then((user) => {
              if (user) {
                userContext.setUser({ ...userContext.user, ...user });
                setAdmin(user);
              } else {
                alert("Login failed. Invalid username or password.");
              }
            });
          } catch (err) {
            console.error(err);
            throw err;
          }
        };
        fetchAdminData();
      }, [userContext.user.userId]);
    
      if (!admin) {
        return <div>Loading...</div>; 
    }
    
    
    return (
        <div className="profile-container">
            <div className="profile-card">
                <div className="profile-header">
                    <div style={{ paddingTop: '150px' }}></div>
                    <h2>שלום {admin.first_name} {admin.last_name}</h2>
                    <h3>פרטי המנהל:</h3>
                </div>
                <div className="profile-details">
                    <div className="detail-item"><strong>שם:</strong> {admin.first_name} {admin.last_name}</div>
                    <div className="detail-item"><strong>תאריך לידה:</strong> {new Date(admin.birth_date).toLocaleDateString()}</div>
                    <div className="detail-item"><strong>כתובת:</strong> {admin.city} {admin.street} {admin.house_number}</div>
                    <div className="detail-item"><strong>דוא"ל:</strong> {admin.email}</div>
                    <div className="detail-item"><strong>טלפון:</strong> {admin.phone}</div>

                    <div className="detail-item"><strong>פרטי החשבון שלך:</strong></div>
                    <div className="detail-item"><strong>מספר חשבון:</strong> {admin.numAccount}</div>
                    <div className="detail-item"><strong>מספר סניף:</strong> {admin.numBranch}</div>
                    <div className="detail-item"><strong>שם הבנק:</strong> {admin.nameBank}</div>
                    <div className="detail-item"><strong>מספר הבנק:</strong> {admin.numBank}</div>
                    <div className="detail-item"><strong> שם המוטב:</strong> {admin.beneficiaryName}</div>

                </div>
            </div>
            
        </div>
    )

}

export default AdminProfile;
