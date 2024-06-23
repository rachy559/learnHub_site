import React, { useState, useEffect, useContext } from 'react';
import '../css/App.css';
import { serverRequests } from '../Api';
import { UserContext } from "../App";

const Lessons = () => {
  const [allLanguages, setAllLanguages] = useState([]);
  const user = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const foundLanguages = await serverRequests('GET', 'languages', null);
        console.log("resLen",response)
        if (response.ok) {  // בדוק אם התשובה מוצלחת
          const foundLanguages = await response.json();
          if (Array.isArray(foundLanguages)) {
            setAllLanguages(foundLanguages);
          } else {
            console.error('Expected array but got:', foundLanguages);
          }
        } else {
          console.error('Server returned an error:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching languages:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div style={{ paddingTop: '100px' }}> {/* Ensures content is below the fixed header */}
        <h1>hi</h1>
      </div>
      <div className="allLanguages">
        {allLanguages.map((language, key) => (
          <div className="languageDiv" key={key}>
            <label className="language">{language.language_name}</label>
          </div>
        ))}
      </div>
    </>
  );
}

export default Lessons;
