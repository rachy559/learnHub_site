import React from 'react';
import '../css/lesson.css';  // Ensure this path is correct based on your file structure

const Lesson = () => {
  return (
    <div className="calendar-base">
      <div className="year">
        2023
        <div className="triangle-left"></div>
        <div className="triangle-right"></div>
      </div>
      <div className="months month-hover">
        <span className="month-color">January</span> February March April May June July August September October November December
      </div>
      <hr className="month-line" />
      <div className="days">
        Sun Mon Tue Wed Thu Fri Sat
      </div>
      <div className="num-dates">
        <div className="first-week">
          <span className="grey">29 30 31</span> 1 2 3 4
        </div>
        <div className="second-week">
          5 6 7 8 9 10 11
        </div>
        <div className="third-week">
          12 13 14 15 16 17 18
        </div>
        <div className="fourth-week">
          19 20 21 22 23 24 25
        </div>
        <div className="fifth-week">
          26 27 28 29 30 31 1
        </div>
        <div className="sixth-week">
          2 3 4 5 6 7 8
        </div>
        <div className="active-day">
          <span className="white">14</span>
        </div>
        <div className="event-indicator"></div>
      </div>
      <div className="calendar-left">
        <div className="hamburger">
          <div className="burger-line"></div>
          <div className="burger-line"></div>
          <div className="burger-line"></div>
        </div>
        <div className="num-date">14</div>
        <div className="day">Monday</div>
        <div className="current-events">
          Current Events:
          <div className="posts">Event 1</div>
          <div className="posts">Event 2</div>
        </div>
        <div className="create-event">
          Create Event
          <div className="add-event">
            <div className="add">+</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lesson;
