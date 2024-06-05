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


    return (
        <>
        <h2>Comments</h2>
            <div className='allComments'>
                {allComments.map((comment, key) => 
                    <div className="commentDiv" key={key}>
                        {/* <span className="todoIndex comment">{index}</span>
                    <br /> */}
                        <label className="comment">{comment.dateComment}</label>
                        <br />
                        <span className="comment">{comment.studentName}</span>
                        <br />
                        <span className="comment">{comment.tutorName}</span>
                        <br />
                        <label className="comment"> {comment.nameOfSubject}</label>
                        <br />
                        <label className="comment">{comment.bodyComment}</label>
                    </div>

                )}

            </div>
        </>
    )
}

export default Comments;