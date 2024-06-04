import React, { useState, useEffect, useContext } from 'react';
import { serverRequests } from '../Api';



function HomePage() {

  const [allComments, setAllComments] = useState([]);
  const [allTutors, setAllTutors] = useState([]);

  useEffect(() => {
    const fetchDataOfAllComments = async () => {
      try {
        await serverRequests('GET', `comments`, null).then((foundComments) => {
          setAllComments(foundComments);
          console.log("comments",allComments,foundComments)
        })
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
    fetchDataOfAllComments();
  }, []);

  useEffect(() => {
    const fetchDataOfAllTutors = async () => {
      try {
        await serverRequests('GET', `tutors`, null).then((foundTutors) => {
          setAllTutors(foundTutors);
          console.log("tutors",allTutors,foundTutors)
        })
      } catch (error) {
        console.error('Error fetching tutors:', error);
      }
    };
    fetchDataOfAllTutors();
  }, []);

  return (
    <>
      <h1>hello</h1>
      <p className="read-the-docs">
        <img src='../public/pictures/L.png' />
      </p>
    </>
  )


}
export default HomePage;