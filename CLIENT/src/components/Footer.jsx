import React from "react"
import { SocialIcon } from 'react-social-icons'
import '../css/header.css';

const Footer=()=> {
    return (
        <>
        <footer className="footer">
        <SocialIcon className="icons" url="www.facebook.com"  style={{ height: '40px' , width: '40px' }}/>
        <SocialIcon className="icons" url="www.instagram.com" style={{ height: '40px' , width: '40px' }}/>
        <SocialIcon className="icons" url="www.twitter.com" style={{ height: '40px' , width: '40px' }}/>
        <br />
         2024 Built by Racheli Izhaki and Noa Marciano &#169;
        </footer>
        
        </>
    )
}

export default Footer;