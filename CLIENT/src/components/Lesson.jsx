import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../css/lesson.css';
import { serverRequests } from '../Api';
import { useLocation } from 'react-router-dom';

const Lesson = () => {
  const location = useLocation();
  const { lesson } = location.state || {}; 
  console.log("lesson", lesson);

  const [isClick, setIsClick] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [prescribedTimes, setPrescribedTimes] = useState([]);

  useEffect(() => {
    console.log("tutor", `calendar/${lesson.tutor_id}`);
    serverRequests('GET', `calendar/${lesson.tutor_id}`).then((response) => {
      console.log("response", response);
      setAvailableTimes(response.availableTimes);
      setPrescribedTimes(response.prescribedTimes);
    });
  }, [lesson.tutor_id]);

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
  
  const filteredOccupiedTimes = selectedDate
    ? prescribedTimes.filter((time) => new Date(time.lessonDate).toDateString() === selectedDate.toDateString() && time.tutor_id === lesson.tutor_id)
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
      occupied.lessonHour === formatTime(time)
    );
  };

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
                <button  onClick={()=>console.log("hello")}
                  key={index} 
                  className='time-button '
                  disabled={isTimeOccupied(time)?"disabled" :""}
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
    </div>
  );
};

export default Lesson;
