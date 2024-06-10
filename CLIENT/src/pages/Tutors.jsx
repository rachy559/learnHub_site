import React, { createContext, useState, useEffect,useContext } from 'react';
import { Link, NavLink } from "react-router-dom";
import { serverRequests } from '../Api';
import '../css/App.css';
import { TutorsContext } from '../App';




const Tutors = ({ children }) => {
    const  allTutors  = useContext(TutorsContext);

   
console.log("array",allTutors)
return(
<>
<div className='allTutors'>
                {allTutors.map((tutor, key) =>
                    <div className="tutorDiv" key={key}>
                        <img className="photo" src={tutor.fileUrls} />
                        <br />
                        <span className="tutor">{tutor.tutorName}</span>
                        <span className="tutor">{tutor.birth_date}</span>
                        <span className="tutor">{tutor.tutorAddress}</span>
                        <span className="tutor">{tutor.email}</span>
                        <span className="tutor">{tutor.phone}</span>
                        <span className="tutor">{tutor.gender}</span>
                        <span className="tutor">{tutor.intended_for_gender}</span>
                        <span className="tutor">{tutor.languages}</span>
                        <span className="tutor">{tutor.subjects}</span>
                    </div>  )}
                </div>  
    </>
    )
birth_date
: 
"2000-03-02T22:00:00.000Z"
city
: 
"Chicago"
email
: 
"alice.johnson@example.com"
fileUrls
: 
"http://example.com/file1"
gender
: 
"Female"
house_number
: 
789
intended_for_gender
: 
"Both"
languages
: 
"English"
phone
: 
"2345678901"
street
: 
"Wacker Dr"
subjects
: 
"Math,Science"
tutorName
: 
"Alice Johnson"
}

export default Tutors;