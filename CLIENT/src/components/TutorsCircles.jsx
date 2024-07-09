import React, { useContext } from 'react';
import { TutorsContext } from '../App';

const TutorsCircles = () => {
    const { allTutors, setAllTutors } = useContext(TutorsContext);
    const acceptedExtensions = ['jpg', 'jpeg', 'png', 'gif']; // Accepted file extensions for images


    const isImage = (url) => {
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp'];
        return imageExtensions.some(extension => url.toLowerCase().endsWith(extension));
      };


    return (
        <>
            <h1>המרצים שלנו</h1>
            <div className="allTutorCircles">
                {allTutors?.length && allTutors.map((tutor, key) => {
                    let extension = '';
                    let fileName = '';

                    if (tutor.fileUrls && typeof tutor.fileUrls === 'string') {
                        fileName = tutor.fileUrls.toLowerCase();
                        extension = fileName.split('.').pop();
                    }

                    return (
                        <div className="tutorDivCircle" key={key} >
                                  {tutor.fileUrls.split(',').map((url, index) => (
                                   !isImage(url)?(
                                    <img className="photo" src="../pictures/user.png" alt={tutor.tutorName} />
                                   ):(<img key={index} src={`http://localhost:3000/images/${url}`} alt={`Tutor ${tutor.tutorName}`} className="tutor-image" />)
                                  ))}
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