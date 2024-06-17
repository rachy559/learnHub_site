import React, { useState, useEffect, useContext } from 'react';
import { serverRequests } from '../Api';
import Comments from '../components/Comments';
import TutorsCircles from '../components/TutorsCircles';
import { ShowHeadersContext, UserContext } from "../App";


const EndOfSignUp = () => {
    const userContext = useContext(UserContext);
    const flag=false;
    if(userContext.user.rollId==2)
       flag=true;
    else
       flag=false;   
    return(
        <>
        {flag?(
            
          <h2>hello Student</h2>
           
        ):(<><h2>hello Tutor</h2>
        </>)}
        </>
    )



}




export default EndOfSignUp;