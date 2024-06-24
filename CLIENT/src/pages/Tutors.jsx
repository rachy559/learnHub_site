import React, { createContext, useState, useEffect, useContext } from 'react';
import { Link, NavLink } from "react-router-dom";
import { serverRequests } from '../Api';
import '../css/App.css';
import { TutorsContext } from '../App';
import Filter from '../components/Filter';
import { FilterContext } from '../App';



const Tutors = ({ children }) => {
    const allTutors = useContext(TutorsContext);
    const { selectedLanguages, selectedSubjects, selectedGender } = useContext(FilterContext);
    const [filteredTutors, setFilteredTutors] = useState([]);
    useEffect(() => {
        handleSearch();
      }, [selectedLanguages, selectedSubjects, selectedGender]);
    
      const handleSearch = () => {
        const filtered = allTutors.filter(tutor => {
          const matchLanguages = selectedLanguages.length === 0 || selectedLanguages.some(lang => tutor.languages.includes(lang));
          const matchSubjects = selectedSubjects.length === 0 || selectedSubjects.some(sub => tutor.subjects.includes(sub));
          const matchGender = selectedGender.length === 0 || selectedGender.includes(tutor.gender);
    
          return matchLanguages && matchSubjects && matchGender;
        });
    
        setFilteredTutors(filtered);
      };
    
    return (
        <>
            <div style={{ paddingTop: '100px' }}> {/* Ensures content is below the fixed header */}

                <Filter />
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
                        </div>)}
                </div>
            </div>
            <button onClick={handleSearch}>Search</button>
        </>
    )
}

export default Tutors;