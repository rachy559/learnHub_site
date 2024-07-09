import React, { useState, useEffect } from 'react';
import { serverRequests } from '../Api';

const Comments = () => {
    const [allComments, setAllComments] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchDataOfAllComments = async () => {
            try {
                const foundComments = await serverRequests('GET', 'comments', null);
                setAllComments(foundComments);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };
        fetchDataOfAllComments();
    }, []);

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 5);
        }
    };

    const handleNext = () => {
        if (currentIndex < allComments.length - 5) {
            setCurrentIndex(currentIndex + 5);
        }
    };

    return (
        <>
            <h1>תגובות</h1>
            <div className="comments-container">
                <span
                    className={`arrow ${currentIndex === 0 ? 'disabled' : ''}`}
                    onClick={currentIndex > 0 ? handlePrev : null}
                >
                    &lt;
                </span>
                <div className="allComments">
                    {allComments.slice(currentIndex, currentIndex + 5).map((comment, key) => (
                        <div className="commentDiv" key={key}>
                            <label className="comment">{new Date(comment.dateComment).toLocaleDateString()}</label>
                            <span className="comment"><strong>שם: </strong>{comment.studentName}</span>
                            <label className="comment">{comment.bodyComment}</label>
                        </div>
                    ))}
                </div>
                <span
                    className={`arrow ${currentIndex >= allComments.length - 5 ? 'disabled' : ''}`}
                    onClick={currentIndex < allComments.length - 5 ? handleNext : null}
                >
                    &gt;
                </span>
            </div>
        </>
    );
};

export default Comments;
