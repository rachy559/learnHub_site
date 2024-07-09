import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { serverRequests } from '../Api';


const Payments = () => {
  const [lessons, setLessons] = useState([]);
  const [isPayed,setIsPayed]=useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const foundLessons = await serverRequests('GET', `manager/${'lessonsType'}`, null);
        if (foundLessons) {
          setLessons(foundLessons);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
 
  const updatePayed = (lesson) => {
    try{
      const formData={
        isPayed: true,
        lesson_id: lesson.lesson_id
      }
       serverRequests('PUT',`manager/${lesson.userId}`,formData).then(()=>{
        setIsPayed(true);
       })

    } catch(err){
      console.log(err);
    }
  };

  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split('T')[0];

  return (
    <>
        <div style={{ paddingTop: '100px' }}></div>
        {lessons.length === 0 ? (
        <div className="noLessonsMessage">אין שיעורים במערכת</div>
      ) : (
        lessons.map((lesson, key) => (
          (!lesson || lesson.dateLesson >= formattedDate) ? (
            < div key={key} className="subjectDiv" >
              <div className="lessonHeader">
                <div className="lessonInfo">
                  <div className="lessonPrice">₪{lesson.priceLesson} לשעה</div>
                </div>
              </div>
              <div className="lessonBody">
                  <div className="lessonDetails">
                    <p><strong>שם תלמיד:</strong> {lesson.studentName}</p>
                    <p><strong>אימייל תלמיד :</strong> {lesson.email}</p>
                    <p><strong>טלפון :</strong> {lesson.phone}</p>
              {lesson.isPayed || isPayed ? (
                <label className='payed'><strong>השיעור שולם</strong></label>
              ) : (
                <label className='notPayed'><strong>השיעור אינו שולם</strong></label>)}
            </div>
            <button onClick={()=>{updatePayed(lesson)}}>שולם</button>
            </div>
            </div>) : (<></>))))}
    </>
  );

}

export default Payments;
