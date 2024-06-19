// import React, { useState, useEffect } from 'react';
// import { serverRequests } from '../Api';

// const Comments = () => {
//     const [allComments, setAllComments] = useState([]);
//     const [currentIndex, setCurrentIndex] = useState(0);

//     useEffect(() => {
//         const fetchDataOfAllComments = async () => {
//             try {
//                 const foundComments = await serverRequests('GET', 'comments', null);
//                 setAllComments(foundComments);
//             } catch (error) {
//                 console.error('Error fetching comments:', error);
//             }
//         };
//         fetchDataOfAllComments();
//     }, []);

//     const handlePrev = () => {
//         if (currentIndex > 0) {
//             setCurrentIndex(currentIndex - 1);
//         }
//     };

//     const handleNext = () => {
//         if (currentIndex < allComments.length - 6) {
//             setCurrentIndex(currentIndex + 1);
//         }
//     };

//     return (
//         <>
//             <h2>Comments</h2>
//             <div className="comments-container">
//                 <span
//                     className={`arrow ${currentIndex === 0 ? 'disabled' : ''}`}
//                     onClick={handlePrev}
//                 >
//                     &lt;
//                 </span>
//                 <div className="allComments">
//                     {allComments.slice(currentIndex, currentIndex + 6).map((comment, key) => (
//                         <div className="commentDiv" key={key}>
//                             <label className="comment">{comment.dateComment}</label>
//                             <span className="comment">{comment.studentName}</span>
//                             <span className="comment">{comment.tutorName}</span>
//                             <label className="comment">{comment.nameOfSubject}</label>
//                             <label className="comment">{comment.bodyComment}</label>
//                         </div>
//                     ))}
//                 </div>
//                 <span
//                     className={`arrow ${currentIndex >= allComments.length - 6 ? 'disabled' : ''}`}
//                     onClick={handleNext}
//                 >
//                     &gt;
//                 </span>
//             </div>
//         </>
//     );
// };

// export default Comments;


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
            setCurrentIndex(currentIndex - 1);
        }
    };

    const handleNext = () => {
        if (currentIndex < allComments.length - 6) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    return (
        <>
            <h2>Comments</h2>
            <div className="comments-container">
                <span
                    className={`arrow ${currentIndex === 0 ? 'disabled' : ''}`}
                    onClick={handlePrev}
                >
                    &lt;
                </span>
                <div className="allComments">
                    {allComments.slice(currentIndex, currentIndex + 6).map((comment, key) => (
                        <div className="commentDiv" key={key}>
                            <label className="comment">{new Date(comment.dateComment).toLocaleDateString()}</label>
                            <span className="comment">{comment.studentName}</span>
                            <span className="comment">{comment.tutorName}</span>
                            <label className="comment">{comment.nameOfSubject}</label>
                            <label className="comment">{comment.bodyComment}</label>
                        </div>
                    ))}
                </div>
                <span
                    className={`arrow ${currentIndex >= allComments.length - 6 ? 'disabled' : ''}`}
                    onClick={handleNext}
                >
                    &gt;
                </span>
            </div>
        </>
    );
};

export default Comments;
