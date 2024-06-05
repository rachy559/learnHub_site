import React, { useContext, useState, useEffect } from 'react';
import { Link, NavLink } from "react-router-dom";
import { serverRequests } from '../Api';
import { UserContext } from '../App';

const Comments = () => {

    const [allComments, setAllComments] = useState([]);

    useEffect(() => {
        const fetchDataOfAllComments = async () => {
            try {
                await serverRequests('GET', `comments`, null).then((foundComments) => {
                    setAllComments(foundComments);
                    console.log("comments", allComments, foundComments)
                })
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };
        fetchDataOfAllComments();
    }, []);


    return(
        <>
         {allComments.map((comment,key)=>{
                <div className="commentDiv" key={key}>
                    {/* <span className="todoIndex comment">{index}</span>
                    <br /> */}
                    <span className="comment">{comment.firstName}</span>
                    <span className="comment">{comment.lastName}</span>
                    <br />
                    <label className="comment"> {comment.email}</label>
                    <br />
                    <label className="comment">{comment.body}</label>
                    
                    </div>

         })}
        
        
      </>  
    )
}

export default Comments;