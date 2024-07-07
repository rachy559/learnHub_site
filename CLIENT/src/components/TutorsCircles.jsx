import React, { useContext } from 'react';
import { TutorsContext } from '../App';

const TutorsCircles = () => {
    const { allTutors, setAllTutors } = useContext(TutorsContext);
    const acceptedExtensions = ['jpg', 'jpeg', 'png', 'gif']; // Accepted file extensions for images

    return (
        <>
            <h2>המרצים שלנו</h2>
            <div className="allTutorCircles">
                {allTutors.map((tutor, key) => {
                    let extension = '';
                    let fileName = '';

                    if (tutor.fileUrls && typeof tutor.fileUrls === 'string') {
                        fileName = tutor.fileUrls.toLowerCase();
                        extension = fileName.split('.').pop();
                    }

                    return (
                        <div className="tutorDivCircle" key={key} >
                            {acceptedExtensions.includes(extension) ? (
                                <img className="photo" src={tutor.fileUrls} alt={tutor.tutorName} />
                            ) : (
                                <img className="photo" src="../pictures/user.png" alt={tutor.tutorName} />
                            )}
                            <br />
                            <span className="tutor">{tutor.tutorName}</span>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default TutorsCircles;