import React from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import '../css/confirmTutors.css';


const ConfirmTutors = () => {
  const location = useLocation();
  const { allNotConfirmTutors } = location.state || { allNotConfirmTutors: [] };
  const navigate = useNavigate();

  const isImage = (url) => {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp'];
    return imageExtensions.some(extension => url.toLowerCase().endsWith(extension));
  };

  return (
    <>
      <div className="containerTutors">
        {allNotConfirmTutors.length > 0 ? (
          <div className="tutor-list">
            {allNotConfirmTutors.map(tutor => (
              <div onClick={()=>{      navigate(`/confirmTutor`, { state: tutor } )}} key={tutor.tutor_id} className="tutor-item">
                {tutor.fileUrls.split(',').filter(isImage).map((url, index) => (
                  <img key={index} src={`http://localhost:3000/images/${url}`} alt={`Tutor ${tutor.tutorName}`} className="tutor-image" />
                ))}
                <div className="tutor-details">
                  <label>{tutor.tutorName}</label>
                  <p className='subjects'>מקצועות: {tutor.subjects}</p>
                  <p className='tutor-date'>תאריך בקשה: {new Date(tutor.createDate).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>אין מרצים לאשר</p>
        )}
      </div>
    </>
  );
}

export default ConfirmTutors;
