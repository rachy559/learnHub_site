import React, { useState, useEffect, useContext } from 'react';
import { serverRequests } from '../Api';
import { FilterContext } from '../App';
import Filter from '../components/Filter';
import '../css/App.css';
import '../css/lessons.css';

const Lessons = () => {
  const { selectedLanguages, selectedSubjects, selectedGender, selectedOptions, selectedLocations, setSelectedOptions, setSelectedLocations } = useContext(FilterContext);
  const [allLessons, setAllLessons] = useState([]);
  const [initialLessons, setInitialLessons] = useState([]);
  const [allLocations, setAllLocations] = useState([]);
  const [allOptions] = useState(["פרונטלי", "אונליין", "2 האפשרויות טובות לי"]);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const foundLanguages = await serverRequests('GET', 'lessons', null);
        if (foundLanguages.lessons) {
          setAllLessons(foundLanguages.lessons);
          setInitialLessons(foundLanguages.lessons);
        } else {
          console.error('Server returned an error:', foundLanguages.statusText);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleOptionClick = (option1) => {
    setSelectedOptions(prev => {
      if (prev.includes(option1)) {
        const updatedOptions = prev.filter(s => s !== option1);
        if (option1 === "פרונטלי") {
          setFlag(false);
        }
        return updatedOptions;
      } else {
        const updatedOptions = [...prev, option1];
        if (option1 === "פרונטלי" || option1 === "2 האפשרויות טובות לי") {
          setFlag(true);
          serverRequests('GET', 'filter/frontali', null).then((foundFilters) => {
            if (foundFilters) {
              const { locations } = foundFilters;
              if (Array.isArray(locations)) {
                setAllLocations(locations);
              } else {
                console.error('Expected arrays but got:', locations);
              }
            } else {
              console.error('Server returned an error:', foundFilters.statusText);
            }
          });
        }
        return updatedOptions;
      }
    });
  };

  const handleLocationsClick = (location) => {
    setSelectedLocations(prev =>
      prev.includes(location) ? prev.filter(l => l !== location) : [...prev, location]
    );
  };

  const handleSearch = () => {
    const filteredLessons = initialLessons.filter(lesson => {
      const matchLanguages = selectedLanguages.length === 0 || selectedLanguages.includes(lesson.language);
      const matchSubjects = selectedSubjects.length === 0 || selectedSubjects.includes(lesson.subject);
      const matchGender = selectedGender.length === 0 ||
        selectedGender.includes('2 האפשרויות טובות לי') ||
        selectedGender.includes(lesson.tutor_gender) ||
        (selectedGender.includes('זכר') && lesson.tutor_gender === 'זכר') ||
        (selectedGender.includes('נקבה') && lesson.tutor_gender === 'נקבה');
      const matchOption = selectedOptions.length === 0 ||
        selectedOptions.includes('2 האפשרויות טובות לי') ||
        selectedOptions.includes(lesson.lesson_type) ||
        (selectedOptions.includes('פרונטלי') && lesson.lesson_type === 'פרונטלי') ||
        (selectedOptions.includes('אונליין') && lesson.lesson_type === 'אונליין');
      const matchLocation = selectedLocations.length === 0 || selectedLocations.includes(lesson.city_tutor);

      return matchLanguages && matchSubjects && matchGender && matchOption && matchLocation;
    });

    setAllLessons(filteredLessons);

  };

  return (
    <>
      <div style={{ paddingTop: '100px' }}>
        <h1>שיעורים</h1>
      </div>
      <Filter />
      <h3 className="options-header">אפשרויות:</h3>
      <div className="allSubjects">
        {allOptions.map((option1, key) => (
          <div
            key={key}
            className={`subjectDiv ${selectedOptions.includes(option1) ? 'selected' : ''}`}
            onClick={() => handleOptionClick(option1)}
          >
            <label className="subject">{option1}</label>
          </div>
        ))}
      </div>
      {flag && (
        <>
          <h3 className="locations-header">מיקומים:</h3>
          <div className="allSubjects">
            {allLocations.map((location, key) => (
              <div
                key={key}
                className={`subjectDiv ${selectedLocations.includes(location.city) ? 'selected' : ''}`}
                onClick={() => handleLocationsClick(location.city)}
              >
                <label className="subject">{location.city}</label>
              </div>
            ))}
          </div>
        </>
      )}
      <button className="search-button" onClick={handleSearch}>חפש</button>
      <h3 className="found-lessons-header">שיעורים שנמצאו:</h3>
      <div className="allSubjects">
        {allLessons.map((lesson, key) => (
          <div key={key} className="subjectDiv">
            <div className="lessonHeader">
              <div className="lessonTitle">{lesson.subject}</div>
              <div className="lessonInfo">
                <div className="lessonPrice">₪{lesson.price} לשעה</div>
              </div>
            </div>
            <div className="lessonBody">
              <div className="lessonDetails">
                <p><strong>שפה:</strong> {lesson.language}</p>
                <p><strong>שם מרצה:</strong> {lesson.tutor_name}</p>
                <p><strong>זמן שיעור:</strong> {lesson.lesson_time}</p>
                <p><strong>רמת שיעור:</strong> {lesson.level}</p>
                <p><strong>פרונטלי/אונליין:</strong> {lesson.lesson_type}</p>
                <p><strong>מגדר:</strong> {lesson.tutor_gender}</p>
                {lesson.lesson_type === "פרונטלי" && (
                  <p><strong>כתובת שיעור:</strong> {lesson.city_tutor}, {lesson.street_tutor}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Lessons;
