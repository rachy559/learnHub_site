import React, { useContext, useState, useEffect } from 'react';
import { Link, NavLink } from "react-router-dom";
import { serverRequests } from '../Api';
import '../css/App.css';
import { TutorsContext } from '../App';
const TutorsCircles = () => {
    

    const  tutorsCircles  = useContext(TutorsContext);
    console.log("hi")
   console.log("context",tutorsCircles);

    return (
        
            <>
                <h2>Tutors</h2>
            <div className='allTutorCircles'>
                {tutorsCircles.map((tutor, key) =>
                    <div className="tutorDiv" key={key}>
                        <img className="photo" src={tutor.fileUrls} />
                        <br />
                        <span className="tutor">{tutor.tutorName}</span>
                    </div>
                )}
            </div>
            </>
        
    )
}


export default TutorsCircles;