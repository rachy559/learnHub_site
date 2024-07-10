import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../css/confirmTutors.css';
import { serverRequests } from '../Api';

const ConfirmTutor = () => {
  const location = useLocation();
  const tutor = location.state;
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');

  const isImage = (url) => {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp'];
    return imageExtensions.some(extension => url.toLowerCase().endsWith(extension));
  };

  const sendEmail = async (isApprove) => {
    let emailData;
    if (isApprove) {
      emailData = {
        email: `${tutor.email}`, 
        subject: 'בקשתך אושרה',
        text: `
          <div style="direction: rtl; text-align: right;">
            ${tutor.tutorName} הוכנסת בהצלחה למערכת המורים באתר LEARN HUB
            בהצלחה!!
          </div>`,
      };
    } else {
      emailData = {
        email: `${tutor.email}`,
        subject: 'בקשתך לא אושרה',
        text: `
          <div style="direction: rtl; text-align: right;">
            ${tutor.tutorName} אנו מצטערים לא נמצאת מתאים להכנס למערכת המורים שלנו.
            יום טוב!!
          </div>
        `,
      };
    }
    
    try {
      const result = await serverRequests('POST', 'send-email', emailData);
      if (result) {
        console.log('Email sent successfully');
      } else {
        console.error('Error sending email:', result.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const openModal = (url) => {
    setModalImage(url);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage('');
  };

  const handleApprove = async () => {
    try {
      const formData = {
        rollId: 3
      };
      await serverRequests('PUT', `tutors/${tutor.tutor_id}`, formData);
      await sendEmail(true);
      navigate('/confirmTutors');
    } catch (err) {
      console.log(err);
    }
  };

  const handleReject = async () => {
    try {
      await serverRequests('DELETE', `tutors/${tutor.tutor_id}`, tutor);
      await sendEmail(false);
      navigate('/confirmTutors');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="tutor-details-container">
      <div style={{ paddingTop: '100px' }}></div>
      <h1 className="tutor-title">{tutor.tutorName}</h1>
      <p><strong>אימייל:</strong> {tutor.email}</p>
      <p><strong>טלפון:</strong> {tutor.phone}</p>
      <p><strong>כתובת:</strong> {tutor.tutorAddress}</p>
      <p><strong>תאריך בקשה:</strong> {new Date(tutor.createDate).toLocaleDateString()}</p>
      <p><strong>מגדר:</strong> {tutor.gender}</p>
      <p><strong>תאריך לידה:</strong> {new Date(tutor.birth_date).toLocaleDateString()}</p>
      <p><strong>מיועד ל:</strong> {tutor.intended_for_gender}</p>
      <p><strong>מקצועות:</strong> {tutor.subjects}</p>
      <p><strong>שפות:</strong> {tutor.languages}</p>
      <h3>קבצים:</h3>
      <div className="files-container">
        {tutor.fileUrls.split(',').map((url, index) => (
          <div key={index} className="file-container">
            {isImage(url) ? (
              <img
                src={`http://localhost:3000/images/${url}`}
                alt={`Tutor ${tutor.tutorName}`}
                className="tutor-image"
                onClick={() => openModal(url)}
              />
            ) : (
              <>
                <label>תעודות:</label>
                <a href={`http://localhost:3000/images/${url}`} download>{`Download ${url}`}</a>
              </>
            )}
          </div>
        ))}
      </div>
      {isModalOpen && (
        <div className="modal" onClick={closeModal}>
          <span className="close" onClick={closeModal}>&times;</span>
          <img className="modal-content" src={`http://localhost:3000/images/${modalImage}`} alt="Full Size" />
          <div className="caption">{modalImage}</div>
        </div>
      )}
      <div className="approval-buttons">
        <button className="approve-button" onClick={handleApprove}>
          אישור
        </button>
        <button className="reject-button" onClick={handleReject}>
          דחייה
        </button>
      </div>
    </div>
  );
};

export default ConfirmTutor;
