import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { serverRequests } from '../Api';
import { ShowHeadersContext, UserContext } from "../App";

const Manager_homePage = () => {

    return (<>
        <div style={{ paddingTop: '100px' }}> {/* Ensures content is below the fixed header */}
            <img className='picture_homepage' src="../pictures/backround.png" alt="" />
            <h1>MANAGER</h1>
            



        </div>





    </>);

}

export default Manager_homePage;