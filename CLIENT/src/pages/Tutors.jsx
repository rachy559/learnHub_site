import React, { useState, useContext, useEffect } from 'react';
import { serverRequests } from '../Api';
import '../css/tutors.css';
import { TutorsContext, FilterContext } from '../App';
import Filter from '../components/Filter';

const Tutors = () => {
    const { allTutors, setAllTutors } = useContext(TutorsContext);
    const { selectedLanguages, selectedSubjects, selectedGender } = useContext(FilterContext);
    const [initialTutors, setInitialTutors] = useState([]);

    useEffect(() => {
        setInitialTutors(allTutors);
    }, [allTutors]);

    const handleSearch = () => {
        let filteredTutors = initialTutors.filter(tutor => {
            const matchLanguages = selectedLanguages.length === 0 || selectedLanguages.includes(tutor.languages);
            const matchSubjects = selectedSubjects.length === 0 || selectedSubjects.includes(tutor.subjects);
            const matchGender = selectedGender.length === 0 ||
                selectedGender.includes('2 האפשרויות טובות לי') ||
                selectedGender.includes(tutor.gender) ||
                (selectedGender.includes('זכר') && tutor.gender === 'זכר') ||
                (selectedGender.includes('נקבה') && tutor.gender === 'נקבה');
            return matchLanguages && matchSubjects && matchGender;
        });

        setAllTutors(filteredTutors);
    };

    return (
        <>
            <div style={{ paddingTop: '100px' }}> {/* Ensures content is below the fixed header */}
                <Filter />
                <button onClick={handleSearch}>Search</button>
                <div className='allTutors'>
                    {allTutors.map((tutor, key) => (
                        <div className="tutorDiv" key={key}>
                            <img className="photo" src={tutor.fileUrls} alt={`תמונתו של ${tutor.tutorName}`} />
                            <br />
                            <span className="tutor"><strong>שם המרצה:</strong> {tutor.tutorName} </span>
                            <span className="tutor"><strong>תאריך לידה:</strong> {tutor.birth_date} </span>
                            <span className="tutor"><strong>כתובת:</strong> {tutor.tutorAddress} </span>
                            <span className="tutor"><strong>דוא"ל:</strong> {tutor.email} </span>
                            <span className="tutor"><strong>טלפון:</strong> {tutor.phone} </span>
                            <span className="tutor"><strong>מגדר:</strong> {tutor.gender} </span>
                            <span className="tutor"><strong>מגדר להוראה:</strong> {tutor.intended_for_gender} </span>
                            <span className="tutor"><strong>שפות:</strong> {tutor.languages} </span>
                            <span className="tutor"><strong>נושאים:</strong> {tutor.subjects} </span>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Tutors;
