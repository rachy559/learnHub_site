import React, { useState, useEffect, useContext } from 'react';
import { ShowHeadersContext, UserContext } from "../App";


const Manager_homePage = () => {
    const { user, setUser } = useContext(UserContext);

    return (<>
      
        <div style={{ paddingTop: '100px' }}>
            <img className='picture_homepage' src="../pictures/backround.png" alt="" />
            <h1>מנהל {user.firstName} {user.lastName}</h1>
        </div>
    </>);

}

export default Manager_homePage;