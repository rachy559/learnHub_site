import React, { useContext, useState, useEffect } from 'react';
import { Link, NavLink } from "react-router-dom";
import { serverRequests } from '../Api';
import '../css/App.css';
import { UserContext } from '../App';

const Tutors = () => {
    const [allTutors, setAllTutors] = useState([]);

    useEffect(() => {
        const fetchDataOfAllTutors = async () => {
            try {
                await serverRequests('GET', `tutors`, null).then((foundTutors) => {
                    setAllTutors(foundTutors);
                    console.log("tutors", allTutors, foundTutors)
                })
            } catch (error) {
                console.error('Error fetching tutors:', error);
            }
        };
        fetchDataOfAllTutors();
    }, []);

    return(
        <>
        <h2>Tutors</h2>
            <div className='allTutors'>
                {allTutors.map((tutor, key) => 
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


export default Tutors;