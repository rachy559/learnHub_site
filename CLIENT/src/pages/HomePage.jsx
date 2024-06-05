import React, { useState, useEffect, useContext } from 'react';
import { serverRequests } from '../Api';
import Comments from '../components/Comments';




const HomePage=()=> {

  const [allTutors, setAllTutors] = useState([]);


  useEffect(() => {
    const fetchDataOfAllTutors = async () => {
      try {
        await serverRequests('GET', `tutors`, null).then((foundTutors) => {
          setAllTutors(foundTutors);
          console.log("tutors",allTutors,foundTutors)
        })
      } catch (error) {
        console.error('Error fetching tutors:', error);
      }
    };
    fetchDataOfAllTutors();
  }, []);

  return (
    <>
      <p className='about'>ברוכים הבאים לאתר לימודים פרטיים - מקום המציע פתרונות ללמידה איכותית ומותאמת אישית לכל גיל ורמה. <br/>באמצעות האתר נוצר חיבור ייחודי בין מורים מקצועיים ומנוסים לבין סטודנטים מרכזי קהילת הלמידה שלנו.<br/>

אנו מאמינים שכל אדם רואה בפניו את האפשרויות האישיות שלו להתפתח ולהשגת הישגים בעזרת ייעוץ והדרכה מתוך אהבה ללמידה. <br/>לכן, האתר מציע מגוון רחב של קורסים ושיעורים, החל מלימודי יסוד ועד להכנה לבחינות ולתוארים אקדמיים.<br/>

המורים שנרשמים אלינו מייחסים חשיבות רבה לחינוך ולהובלת התהליכים הלמידתיים של התלמידים שלהם. הם מספקים שיעורים מותאמים אישית, משולבים בשיטות הוראה מודרניות ומספקים כלים להצלחה אישית ואקדמית.<br/>

סטודנטים מכל הגילאים והרקעים מוזמנים להצטרף אלינו ולהתחיל את מסע הלמידה וההתפתחות שלהם.<br/> באמצעות אפשרויות הלמידה המגוונות שאנו מציעים, כל אחד יכול למצוא את הדרך המתאימה לו להשגת היעדים האישיים שלו.
<br/>
אנו מתרגשים להיות חלק ממסע ההתפתחות והלמידה שלך. בואו נתחיל יחד ליצור את העתיד שאתם מעוניינים בו!


</p>
<Comments />
    </>
  )


}
export default HomePage;