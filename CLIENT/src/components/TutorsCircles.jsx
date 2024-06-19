import React, { useContext, useEffect } from 'react';
import { TutorsContext } from '../App';

const TutorsCircles = () => {
    const tutorsCircles = useContext(TutorsContext);

    return (
        <>
            <h2>Tutors</h2>
            <div className="allTutorCircles">
                {tutorsCircles.map((tutor, key) => (
                    <div className="tutorDiv" key={key}>
                        <img className="photo" src={tutor.fileUrls} alt={tutor.tutorName} />
                        <br />
                        <span className="tutor">{tutor.tutorName}</span>
                    </div>
                ))}
            </div>
        </>
    );
};

export default TutorsCircles;
