import React, { useState, useEffect, useContext } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../css/lesson.css';
import { useNavigate } from 'react-router-dom';
import { serverRequests } from '../Api';
import { useLocation } from 'react-router-dom';
import Modal from 'react-modal';
import { UserContext } from "../App";
Modal.setAppElement('#root');

const Lesson = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split('T')[0];
  const { from, data } = location.state || {};
  const [formData, setFormData] = useState({
    lessonDate: "",
    lessonHour: "",
    tutor_id: ""
  })
  const [formDataLesson, setFormDataLesson] = useState({
    student_id: "",
    dayLesson: "",
    timeLesson: "",
    dateLesson: ""
  })
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isClick, setIsClick] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [prescribedTimes, setPrescribedTimes] = useState([]);
  const [date, setDate] = useState([]);
  const [time, setTime] = useState([]);


  useEffect(() => {
    try {
      serverRequests('GET', `calendar/${data.lesson.tutor_id}`).then((response) => {
        setAvailableTimes(response.availableTimes);
        setPrescribedTimes(response.prescribedTimes);
      });
    }
    catch (err) {
      console.log(err);
    }
  }, [data.lesson]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsClick(true);
  };

  const getDayInHebrew = (date) => {
    const days = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];
    return days[date.getDay()];
  };

  const selectedDay = selectedDate ? getDayInHebrew(selectedDate) : null;
  const filteredTimes = selectedDay
    ? availableTimes.filter((time) => time.dayLesson === selectedDay)
    : [];

  const filteredOccupiedTimes = selectedDate ?
    prescribedTimes.filter((time) => new Date(time.lessonDate).toDateString() === selectedDate.toDateString())
    : [];

  const formatTime = (time) => {
    const hours = String(time).padStart(2, '0');
    return `${hours}:00`;
  };

  const formatDateInHebrew = (date) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const formattedDate = date.toLocaleDateString('he-IL', options);
    const dayInHebrew = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'][date.getDay()];

    return `יום ${dayInHebrew} - ${formattedDate.replace(/\./g, '/')}`;
  };

  const isTimeOccupied = (time) => {
    return filteredOccupiedTimes.some((occupied) =>
      occupied.lessonHour === (time)
    );
  };

  const addLesson = () => {
    try {
      serverRequests('POST', `studentLesson`, formDataLesson).then((response) => {
        serverRequests('POST', `calendar`, formData).then((response) => {
          setPrescribedTimes(prevTimes => [
            ...prevTimes,
            {
              lessonDate: formData.lessonDate,
              lessonHour: formData.lessonHour
            }
          ]);
          setIsOpen(false);
          alert(`השיעור נוסף בהצלחה לרשימת השיעורים שלך`);
          navigate('/studentProfile')
        })
      })
    } catch (err) {
      alert("Failed. An error occurred.");
    }
  };

  const updateLesson = () => {
    try {
      const details = {
        student_id: user.userId,
        updatedDateLesson: formData.lessonDate,
        updatedTimeLesson: formData.lessonHour,
        dateLesson: data.lesson.lesson_date,
        timeLesson: data.lesson.timeLesson
      };
      serverRequests('PUT', `studentLesson/${data.lesson.lesson_id}`, details).then((response) => {
        serverRequests('PUT', `calendar/${data.lesson.tutor_id}`, details).then((response) => {
          setIsOpen(false);
          alert(`זמני השיעור יתעדכנו בהצלחה`);
          navigate('/studentProfile')
        })
      })
    } catch (err) {
      alert("Failed. An error occurred.");
      console.log(err);
    }
  };

  const openModal = (selectedDate, time) => {
    setIsOpen(true);
    const date = new Date(selectedDate);
    const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
    const formattedDate = localDate.toISOString().split('T')[0];
    const dateOnly = formatDateInHebrew(selectedDate);
    const dayInHebrew = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'][selectedDate.getDay()];
    setDate(dateOnly);
    setTime(time);
    setFormData(
      {
        lessonDate: formattedDate,
        lessonHour: time,
        tutor_id: data.lesson.tutor_id
      })
    setFormDataLesson({
      lesson_id: data.lesson.lesson_id,
      student_id: user.userId,
      dayLesson: dayInHebrew,
      timeLesson: time,
      dateLesson: formattedDate
    });

  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <div style={{ paddingTop: '50px' }}></div>
     <h2 className='headLabel'>השיעור הבא שלך בהקלקה אחת!</h2>
    <div className="lesson-container">
     
      <Calendar
        calendarType='hebrew'
        className='calendar'
        onChange={handleDateChange}
        minDate={new Date()}
      />
      {isClick && (
        <div className='available-times-container'>
          <h3 className='he'>השעות הפנויות היום:</h3>
          <p>{selectedDate && formatDateInHebrew(selectedDate)}</p>
          <div className='available-times'>
            {filteredTimes.length > 0 ? (
              filteredTimes[0].timesAvaliablePerDay.split(',').map((time, index) => (
                <button
                  key={index}
                  className='time-button'
                  disabled={isTimeOccupied(time)}
                  onClick={() => openModal(selectedDate, time)}
                >
                  {formatTime(time)}
                </button>
              ))
            ) : (
              <p>אין שעות פנויות</p>
            )}
          </div>
        </div>
      )}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className='customStyles'
      >
        <span className="close" onClick={closeModal}>&times;</span>

        {from === 'Lessons' ? (
          <>
            <h3 className='header'>פרטי השיעור שנבחר:</h3>
            <div className="subjectDivModal">
              <div className="lessonHeader">
                <div className="lessonTitle">{data.lesson.subject}</div>
                <div className="lessonInfo">
                  <div className="lessonPrice">₪{data.lesson.price} לשעה</div>
                </div>
              </div>
              <div className="lessonBody">
                <div className="lessonDetailsModal">
                  <p><strong>שפה:</strong> {data.lesson.language}</p>
                  <p><strong>שם מרצה:</strong> {data.lesson.tutor_name}</p>
                  <p><strong>זמן שיעור:</strong> 60 דקות</p>
                  <p><strong>רמת שיעור:</strong> {data.lesson.level}</p>
                  <p><strong>פרונטלי/אונליין:</strong> {data.lesson.lesson_type}</p>
                  {data.lesson.zoomLink ? (
                    <p><strong>קישור זום:</strong> {data.lesson.zoomLink}</p>
                  ) : (<></>)}
                  {data.lesson.lesson_type === "פרונטלי" && (
                    <p><strong>כתובת שיעור:</strong> {data.lesson.city_tutor}, {data.lesson.street_tutor}</p>
                  )}
                  <p><strong>מגדר:</strong> {data.lesson.tutor_gender}</p>

                  <p><strong>פרטי החשבון להעברת התשלום:</strong></p>
                  <p><strong>מספר חשבון</strong> {data.lesson.numAccount}</p>
                  <p><strong>מספר סניף</strong> {data.lesson.numBranch}</p>
                  <p><strong>שם הבנק</strong> {data.lesson.nameBank}</p>
                  <p><strong>מספר הבנק</strong> {data.lesson.numBank}</p>
                  <p><strong> שם המוטב</strong> {data.lesson.beneficiaryName}</p>

                </div>

              </div>
            </div>
            <br />
            <h3 className='header'>בתאריך: {date} בשעה: {time}:00</h3>
            <div className='buttonsModal'></div>
            <button className='cancelButtons' onClick={closeModal}>ביטול</button>
            <button className='confirmButtons' onClick={addLesson}>אישור</button>

          </>) : (<>{from === 'StudentProfile' ? (<>
            <h3 className='header'>פרטי השיעור שהינך רוצה לעדכן:</h3>
            <div className="subjectDivModal">
              <div className="lessonHeader">
                <div className="lessonTitle">{data.lesson.subject_name}</div>
                <div className="lessonInfo">
                  <div className="lessonPrice">₪{data.lesson.lesson_price} לשעה</div>
                </div>
              </div>
              <div className="lessonBody">
                <div className="lessonDetailsModal">
                  <p><strong>שפה:</strong> {data.lesson.lesson_language}</p>
                  <p><strong>שם מרצה:</strong> {data.lesson.tutor_name}</p>
                  <p><strong>זמן שיעור:</strong> 60 דקות</p>
                  <p><strong>רמת שיעור:</strong> {data.lesson.lesson_level}</p>
                  {data.lesson.zoom_link ? (
                    <>
                      <p><strong>פרונטלי/אונליין:</strong> אונליין</p>
                      <p><strong>קישור זום:</strong> {data.lesson.zoom_link}</p>
                    </>
                  ) : (
                    <p><strong>פרונטלי/אונליין:</strong> פרונטלי</p>
                  )}
                  {!data.lesson.zoom_link && (
                    <p><strong>כתובת שיעור:</strong> {data.lesson.tutor_address.city}, {data.lesson.tutor_address.street} {data.lesson.tutor_address.house_number}</p>
                  )}
                  <p><strong>מגדר:</strong> {data.lesson.tutor_gender}</p>
                </div>
              </div>
            </div>

            <br />
            <h3 className='header'>בתאריך: {date} בשעה: {time}:00</h3>
            <div className='buttonsModal'></div>
            <button className='cancelButtons' onClick={closeModal}>ביטול</button>
            <button className='confirmButtons' onClick={updateLesson}>עדכן</button>

          </>) : <></>}</>)}


      </Modal>
    </div>
    </>
  );
};

export default Lesson;
