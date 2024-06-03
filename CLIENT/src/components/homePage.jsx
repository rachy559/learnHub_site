import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../App';
import { serverRequests } from '../Api';

const [allComments, setAllComments] = useState([]);
const [allTutors, setAllTutors] = useState([]);


useEffect(() => {
    const fetchDataOfAllComments = async () => {
      try {
        await serverRequests('GET', `comments`, null).then((foundComments) => {
            setAllComments(foundComments);
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
        })
      } catch (error) {
        console.error('Error fetching tutors:', error);
      }
    };
    fetchDataOfAllTutors();
  }, []);