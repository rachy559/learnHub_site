import React, { useContext, useEffect, useState } from 'react';
import { serverRequests } from '../Api';
import { FilterContext } from '../App';
const Filter = () => {
  const { selectedLanguages, setSelectedLanguages, selectedSubjects, setSelectedSubjects, selectedGender, setSelectedGender } = useContext(FilterContext);
  const [allLanguages, setAllLanguages] = useState([]);
  const [allSubjects, setAllSubjects] = useState([]);
  const [allGenders] = useState(["זכר", "נקבה", "2 האפשרויות טובות לי"]);


  useEffect(() => {
    try {
      serverRequests('GET', 'filter', null).then((foundFilters) => {
        if (foundFilters) {
          const { languages, subjects } = foundFilters;
          if (Array.isArray(languages) && Array.isArray(subjects)) {
            setAllLanguages(languages);
            setAllSubjects(subjects);
          } else {
            console.error('Expected arrays but got:', languages, subjects);
          }
        } else {
          console.error('Server returned an error:', foundFilters.statusText);
        }
      })
    } catch (error) {
      console.error('Error fetching data:', error);
    }


  }, [])

  const handleLanguageClick = (language) => {
    setSelectedLanguages(prev =>
      prev.includes(language) ? prev.filter(l => l !== language) : [...prev, language]
    );
  };

  const handleSubjectClick = (subject) => {
    setSelectedSubjects(prev =>
      prev.includes(subject) ? prev.filter(s => s !== subject) : [...prev, subject]
    );
  };

  const handleGenderClick = (gender) => {
    setSelectedGender(prev =>
      prev.includes(gender) ? prev.filter(s => s !== gender) : [...prev, gender]
    );
  };

  return (
    <div className="filter">
      <h2>Filter by:</h2>
      <h3>Language:</h3>
      <div className="allSubjects">
        {allLanguages.map((language, key) => (
          <div
            className={`subjectDiv ${selectedLanguages.includes(language.language_name) ? 'selected' : ''}`}
            key={key}
            onClick={() => handleLanguageClick(language.language_name)}
          >
            <label className="subject">{language.language_name}</label>
          </div>
        ))}
      </div>
      <h3>subject:</h3>
      <div className="allSubjects">
        {allSubjects.map((subject, key) => (
          <div
            className={`subjectDiv ${selectedSubjects.includes(subject.subjectName) ? 'selected' : ''}`}
            key={key}
            onClick={() => handleSubjectClick(subject.subjectName)}
          >
            <label className="subject">{subject.subjectName}</label>
          </div>
        ))}
      </div>
      <h3>gender:</h3>
      <div className="allSubjects">
        {allGenders.map((gender, key) => (
          <div key={key}
            className={`subjectDiv ${selectedGender.includes(gender) ? 'selected' : ''}`}
            onClick={() => handleGenderClick(gender)}
          >
            <label className="subject">{gender}</label>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Filter;