import React, { useState } from 'react';
import '../css/lesson.css';

const Lesson = () => {
  const daysInMonth = 31;
  const [openDay, setOpenDay] = useState(null);

  const handleFocus = (day) => {
    setOpenDay(day);
  };

  const handleBlur = () => {
    setOpenDay(null);
  };

  return (
    <section className="calendar">
      <h1>August 2015</h1>
      <form action="#">
        <label className="weekday">Mo</label>
        <label className="weekday">Tu</label>
        <label className="weekday">We</label>
        <label className="weekday">Th</label>
        <label className="weekday">Fr</label>
        <label className="weekday">Sa</label>
        <label className="weekday">Su</label>
        
        {Array.from({ length: 35 }, (_, day) => {
          const date = day >= 3 ? day - 2 : null;
          return (
            <label
              key={day}
              className={`day ${date === null ? 'invalid' : ''}`}
            >
              {date && (
                <>
                  <input
                    type="text"
                    className="appointment"
                    required
                    date-day={date}
                    placeholder="What would you like to do?"
                    onFocus={() => handleFocus(day)}
                    onBlur={handleBlur}
                  />
                  <span>{date}</span>
                  {openDay === day && <div className="expanded">What would you like to do?</div>}
                </>
              )}
            </label>
          );
        })}
        <div className="clearfix"></div>
      </form>
    </section>
  );
}

export default Lesson;
