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
                    let imageUrl = "../pictures/user.png"; // default image

                    if (tutor.fileUrls && typeof tutor.fileUrls === 'string') {
                        const urls = tutor.fileUrls.split(',');
                        for (let url of urls) {
                            if (isImage(url)) {
                                imageUrl = `http://localhost:3000/images/${url}`;
                                break;
                            }
                        }
                    }

                    return (
                        <div className="tutorDivCircle" key={key} >
                            <img className="photo" src={imageUrl} alt={tutor.tutorName} />
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
