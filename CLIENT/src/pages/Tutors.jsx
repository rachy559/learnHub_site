import React, { createContext, useState, useEffect } from 'react';
import { Link, NavLink } from "react-router-dom";
import { serverRequests } from '../Api';
import '../css/App.css';


export const TutorsContext = createContext()



const Tutors = ({ children }) => {
   
    const [allTutors, setAllTutors] = useState([]);
    const limit=10;
    useEffect(() => {
        const fetchDataOfAllTutors = async () => {
            try {
                await serverRequests('GET', `tutors?_limit=${limit}`, null).then((foundTutors) => {
                    setAllTutors(foundTutors);
                    console.log("tutors", allTutors, foundTutors)
                })
            } catch (error) {
                console.error('Error fetching tutors:', error);
            }
        };
        fetchDataOfAllTutors();
    }, []);
console.log("array",allTutors)
return(
    
    <TutorsContext.Provider value={allTutors}>
       {children}
    </TutorsContext.Provider>
    )
}

export default Tutors;