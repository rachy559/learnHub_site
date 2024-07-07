import React from 'react';
import TutorsCircles from '../components/TutorsCircles';
import Comments from '../components/Comments';

const HomePage = () => {
    return (
        <>
            <div style={{ paddingTop: '100px' }}> {/* Ensures content is below the fixed header */}
                <img className='picture_homepage' src="../pictures/backround.png" alt="" />
                <TutorsCircles />
                <div className="about-container">
                    <h1>LearnHub-  מורים פרטיים: מורה פרטי לכל מקצוע, שיעורים פרטיים בכל הארץ ובעולם!</h1>
                    <p>
                        ברוכים הבאים לאתר לימודים פרטיים - מקום המציע פתרונות ללמידה איכותית ומותאמת אישית לכל גיל ורמה.
                    </p>
                    <p>
                        באמצעות האתר נוצר חיבור ייחודי בין מורים מקצועיים ומנוסים לבין סטודנטים מרכזי קהילת הלמידה שלנו.
                    </p>
                    <p>
                        אנו מאמינים שכל אדם רואה בפניו את האפשרויות האישיות שלו להתפתח ולהשגת הישגים בעזרת ייעוץ והדרכה מתוך
                        אהבה ללמידה.
                    </p>
                    <p>
                        לכן, האתר מציע מגוון רחב של קורסים ושיעורים, החל מלימודי יסוד ועד להכנה לבחינות ולתוארים
                        אקדמיים.
                    </p>
                    <p>
                        המורים שנרשמים אלינו מייחסים חשיבות רבה לחינוך ולהובלת התהליכים הלמידתיים של התלמידים שלהם.
                    </p>
                    <p>
                        הם מספקים שיעורים מותאמים אישית, משולבים בשיטות הוראה מודרניות ומספקים כלים להצלחה אישית ואקדמית.
                    </p>
                    <p>
                        סטודנטים מכל הגילאים והרקעים מוזמנים להצטרף אלינו ולהתחיל את מסע הלמידה וההתפתחות שלהם.
                    </p>
                    <p>
                        באמצעות אפשרויות הלמידה המגוונות שאנו מציעים, כל אחד יכול למצוא את הדרך המתאימה לו להשגת היעדים האישיים
                        שלו.
                    </p>
                    <p>
                        אנו מתרגשים להיות חלק ממסע ההתפתחות והלמידה שלך.
                    </p>
                    <h2>
                        בואו נתחיל יחד ליצור את העתיד שאתם מעוניינים בו!
                    </h2>
                </div>
                <Comments />
            </div>
        </>
    );
};

export default HomePage;

