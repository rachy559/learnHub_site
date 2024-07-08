import React, { useState, useContext, useEffect } from 'react';
import { TutorsContext, FilterContext } from '../App';
import Filter from '../components/Filter';
import '../css/tutors.css';

const Tutors = () => {
    const { allTutors, setAllTutors } = useContext(TutorsContext);
    const { selectedLanguages, selectedSubjects, selectedGender } = useContext(FilterContext);
    const [initialTutors, setInitialTutors] = useState([]);
    const [isClick, setIsClick] = useState(false);

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

    const isImageFile = (fileUrl) => {
        if (!fileUrl) return false; // Check if fileUrl is null or undefined
        const acceptedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
        const extension = fileUrl.split('.').pop().toLowerCase();
        return acceptedExtensions.includes(extension);
    };

    console.log("allTutors=3", allTutors)

    return (
        <div style={{ paddingTop: '100px' }}> {/* Ensures content is below the fixed header */}
            <img className='filters' src='../pictures/image.png' onClick={() => { setIsClick(!isClick) }} />
            {isClick ? (
                <>
                    <Filter />
                    <button className='search' onClick={handleSearch}>Search</button>
                </>) : (<></>)}
            <div className='allTutors'>
                {allTutors.map((tutor, key) => (
                    <div className="tutorDiv" key={key}>
                        {isImageFile(tutor.fileUrls) ? (
                            <img className="photo" src={tutor.fileUrls} alt={tutor.tutorName} />
                        ) : (
                            <img className="photo" src='../pictures/user.png' alt={tutor.tutorName} />
                        )}
                        <br />
                        <span className="tutor"><strong>שם המרצה:</strong> {tutor.tutorName} </span>
                        <span className="tutor"><strong>תאריך לידה:</strong>{new Date(tutor.birth_date).toLocaleDateString()} </span>
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
    );
};

export default Tutors;
