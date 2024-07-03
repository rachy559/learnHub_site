import React, { useState, useEffect, useContext } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../css/lesson.css';
import { serverRequests } from '../Api';
import { createRoutesFromChildren, useLocation } from 'react-router-dom';
import Modal from 'react-modal';
import { UserContext } from "../App";
Modal.setAppElement('#root');

const Lesson = () => {
  const location = useLocation();
  const { user, setUser } = useContext(UserContext);
  console.log(user)
  const { lesson } = location.state || {};
  console.log("lesson", lesson);
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
      serverRequests('GET', `calendar/${lesson.tutor_id}`).then((response) => {
        console.log("response", response);
        setAvailableTimes(response.availableTimes);
        setPrescribedTimes(response.prescribedTimes);
      });
    }
    catch (err) {
      console.log(err);
    }
  }, [lesson]);

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
    prescribedTimes.filter((time) => new Date(time.lessonDate).toDateString() === selectedDate.toDateString() /*&& time.lessonHour === lesson.tutor_id*/)
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
      serverRequests('POST', `lessons`, formDataLesson).then((response) => {
        serverRequests('POST', `calendar`, formData).then((response) => {
          setPrescribedTimes(prevTimes => [
            ...prevTimes,
            {
              lessonDate: formData.lessonDate,
              lessonHour: formData.lessonHour
            }
          ]);
          alert(`השיעור נוסף בהצלחה לרשימת השיעורים שלך`);
          setIsOpen(false);
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
        tutor_id: lesson.tutor_id
      })
    setFormDataLesson({
      lesson_id:lesson.lesson_id,
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
    <div className="lesson-container">
      <Calendar
        calendarType='hebrew'
        className='calendar'
        onChange={handleDateChange}
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
        <h3 className='header'>פרטי השיעור שנבחר:</h3>
        <div className="subjectDivModal">
          <div className="lessonHeader">
            <div className="lessonTitle">{lesson.subject}</div>
            <div className="lessonInfo">
              <div className="lessonPrice">₪{lesson.price} לשעה</div>
            </div>
          </div>
          <div className="lessonBody">
            <div className="lessonDetailsModal">
              <p><strong>שפה:</strong> {lesson.language}</p>
              <p><strong>שם מרצה:</strong> {lesson.tutor_name}</p>
              <p><strong>זמן שיעור:</strong> {lesson.lesson_time}</p>
              <p><strong>רמת שיעור:</strong> {lesson.level}</p>
              <p><strong>פרונטלי/אונליין:</strong> {lesson.lesson_type}</p>
              <p><strong>מגדר:</strong> {lesson.tutor_gender}</p>
              {lesson.lesson_type === "פרונטלי" && (
                <p><strong>כתובת שיעור:</strong> {lesson.city_tutor}, {lesson.street_tutor}</p>
              )}
            </div>
          </div>
        </div>
        <br />
        <h3 className='header'>בתאריך: {date} בשעה: {time}:00</h3>
        <div className='buttonsModal'></div>
        <button className='cancelButtons' onClick={closeModal}>ביטול</button>
        <button className='confirmButtons' onClick={addLesson}>אישור</button>

      </Modal>
    </div>
  );
};

export default Lesson;
