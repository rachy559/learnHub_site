import React from 'react';
import { useLocation } from 'react-router-dom';
import '../css/confirmTutors.css';

const ConfirmTutor = () => {
  const location = useLocation();
  const tutor = location.state;

  const isImage = (url) => {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp'];
    return imageExtensions.some(extension => url.toLowerCase().endsWith(extension));
  };

  return (
    <div className="tutor-details-container">
      <h1 className="tutor-title">{tutor.tutorName}</h1>
      <p><strong>אימייל:</strong> {tutor.email}</p>
      <p><strong>טלפון:</strong> {tutor.phone}</p>
      <p><strong>כתובת:</strong> {tutor.tutorAddress}</p>
      <p><strong>תאריך בקשה:</strong> {new Date(tutor.createDate).toLocaleDateString()}</p>
      <p><strong>מין:</strong> {tutor.gender}</p>
      <p><strong>תאריך לידה:</strong> {new Date(tutor.birth_date).toLocaleDateString()}</p>
      <p><strong>מיועד ל:</strong> {tutor.intended_for_gender}</p>
      <p><strong>מקצועות:</strong> {tutor.subjects}</p>
      <p><strong>שפות:</strong> {tutor.languages}</p>
      <h3>קבצים:</h3>
      <div className="files-container">
        {tutor.fileUrls.split(',').map((url, index) => (
          <div key={index} className="file-container">
            {isImage(url) ? (
              <img src={`http://localhost:3000/images/${url}`} alt={`Tutor ${tutor.tutorName}`} className="tutor-image" />
            ) : (
              <a href={`http://localhost:3000/images/${url}`} download>{`Download ${url}`}</a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ConfirmTutor;
