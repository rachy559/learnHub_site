import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { serverRequests } from '../Api';


const Payments = () => {
  const [lessons, setLessons] = useState([]);
  const [isPayed,setIsPayed]=useState(false);
  const [formData,setFormData]=useState({});
  const [user_id,setUser_id]=useState("");

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
      const formDataPayed={
        isPayed: true,
        lesson_id: lesson.lesson_id,
        timeLesson: lesson.timeLesson,
        dateLesson: new Date(lesson.dateLesson).toLocaleDateString()
      }
      // setFormData(formDataPayed)
      setUser_id(lesson.userId)
       serverRequests('PUT',`manager/${lesson.userId}`,formDataPayed).then(()=>{
        setIsPayed(true);
        setUser_id(lesson.userId);
        setLessons((prevLessons) =>
          prevLessons.map((l) =>
            l.lesson_id === lesson.lesson_id &&
            l.timeLesson === lesson.timeLesson &&
            l.dateLesson === lesson.dateLesson
              ? { ...l, isPayed: true }
              : l
          )
        );
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
                  <p><strong>תאריך שיעור :</strong>{new Date(lesson.dateLesson).toLocaleDateString()}</p>
                    <p><strong>שם תלמיד:</strong> {lesson.studentName}</p>
                    <p><strong>אימייל תלמיד :</strong> {lesson.email}</p>
                    <p><strong>טלפון :</strong> {lesson.phone}</p>
              {/* {lesson.isPayed || (isPayed&&(lesson.userId===user_id&&formData.dateLesson===new Date(lesson.dateLesson).toLocaleDateString()&&formData.timeLesson===lesson.timeLesson&&lesson.lesson_id===formData.lesson_id)) ? (
                <label className='payed'><strong>השיעור שולם</strong></label>
              ) : (
                <>
                <label className='notPayed'><strong>השיעור אינו שולם</strong></label>
                <button onClick={()=>{updatePayed(lesson)}}>שולם</button>
                </>)} */}
                {lesson.isPayed ?(
                <label className='payed'><strong>השיעור שולם</strong></label>
              ) : (
                <>
                <label className='notPayed'><strong>השיעור אינו שולם</strong></label>
                <button onClick={()=>{updatePayed(lesson)}}>שולם</button>
                </>)}
            </div>
            
            </div>
            </div>) : (<></>))))}
    </>
  );

}

export default Payments;
