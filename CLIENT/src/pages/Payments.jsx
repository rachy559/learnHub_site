import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { serverRequests } from '../Api';


const Payments = () => {
    useEffect(() => {
        const fetchData = async () => {
          try {
            const foundLanguages = await serverRequests('GET', 'manager', null);
            // if (foundLanguages.lessons) {
            //   console.log(foundLanguages)
            //   setAllLessons(foundLanguages.lessons);
            //   setInitialLessons(foundLanguages.lessons);
            // } else {
            //   console.error('Server returned an error:', foundLanguages.statusText);
            // }
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchData();
      }, []);

    return(
<></>
    );
}

export default Payments;
