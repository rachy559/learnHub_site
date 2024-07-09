import React, { useState, useContext, useEffect } from 'react';
import { TutorsContext, FilterContext } from '../App';
import { serverRequests } from '../Api';
import { ShowHeadersContext, UserContext } from "../App";
import { useLocation } from 'react-router-dom';



const ConfirmTutors = () => {
  const location = useLocation();
  const { allNotConfirmTutors } = location.state || { allNotConfirmTutors: [] };

  const isImage = (url) => {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp'];
    return imageExtensions.some(extension => url.toLowerCase().endsWith(extension));
  };

  return (
    <>
      <div>
      {allNotConfirmTutors.length > 0 ? (
        <ul className="tutor-list">
          {allNotConfirmTutors.map(tutor => (
            <li key={tutor.tutor_id} className="tutor-item">
              <h2>{tutor.tutorName}</h2>
              <p>מקצועות: {tutor.subjects.join(', ')}</p>
              {tutor.fileUrls.filter(isImage).map((url, index) => (
                <img key={index} src={url} alt={`Tutor ${tutor.tutorName}`} className="tutor-image" />
              ))}
              <p>תאריך בקשה: {new Date(tutor.createDate).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>אין מרצים לאשר</p>
      )}
      </div>
    </>
  );



}

export default ConfirmTutors;
