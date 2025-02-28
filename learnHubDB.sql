-- create database mySql_Project;
/* Create the database */
CREATE DATABASE  IF NOT EXISTS learnHubDB;


/* Switch to the classicmodels database */
USE learnHubDB;


DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS prescribedLessons;
DROP TABLE IF EXISTS manager;
DROP TABLE IF EXISTS subject_of_tutor;
DROP TABLE IF EXISTS subject_of_lesson;
DROP TABLE IF EXISTS subjects;
DROP TABLE IF EXISTS lesson_for_student;
DROP TABLE IF EXISTS lesson_languages;
DROP TABLE IF EXISTS lessons;
DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS tutors_languages;
DROP TABLE IF EXISTS files_for_tutors;
DROP TABLE IF EXISTS files;
DROP TABLE IF EXISTS calander_work;
DROP TABLE IF EXISTS tutors;
DROP TABLE IF EXISTS languages;
DROP TABLE IF EXISTS passwords;
DROP TABLE IF EXISTS roll_for_user;
DROP TABLE IF EXISTS rolls;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS addresses;


/* Create the tables */

CREATE TABLE addresses(
    address_id INT auto_increment PRIMARY KEY,
    city varchar(100) NOT NULL,
    street varchar(100) NOT NULL,
    house_number INT NOT NULL
);

CREATE TABLE rolls(
	  rollId INT auto_increment PRIMARY KEY,
	  rollName varchar(20) NOT NULL
);

CREATE TABLE users(
      userId INT auto_increment PRIMARY KEY,
      firstName varchar(20) NOT NULL,
      lastName varchar(20) NOT NULL,
      email varchar(255) NOT NULL,
      phone varchar(10) NOT NULL,
      gender varchar (6) NOT NULL,
	  birth_date DATE NOT NULL,
      createDate DATE NOT NULL,
      address_id INT,
	  FOREIGN KEY (address_id) REFERENCES addresses (address_id)
);

CREATE TABLE roll_for_user(
	  userId INT,
	  rollId INT,
      primary key (userId,rollId),
	  FOREIGN KEY (userId) REFERENCES users (userId),
	  FOREIGN KEY (rollId) REFERENCES rolls (rollId)
);

CREATE TABLE  passwords (
  userId INT PRIMARY KEY,
  password varchar(200) NOT NULL,
  FOREIGN KEY (userId) REFERENCES users (userId)
);


CREATE TABLE languages(
    language_id INT auto_increment PRIMARY KEY,
    language_name VARCHAR(30) NOT NULL
);

CREATE TABLE files(
    file_id INT auto_increment PRIMARY KEY,
    fileUrl varchar(255) 
);

CREATE TABLE subjects(
	subject_id INT auto_increment PRIMARY KEY,
	subjectName varchar(20) NOT NULL
);

CREATE TABLE tutors(
	tutor_id INT  PRIMARY KEY,
	intended_for_gender varchar(30) NOT NULL,
	FOREIGN KEY (tutor_id) REFERENCES users (userId)
);

CREATE TABLE subject_of_tutor(
    tutor_id INT,
    subject_id INT,
    PRIMARY KEY (tutor_id, subject_id),
    FOREIGN KEY (tutor_id) REFERENCES tutors (tutor_id),
    FOREIGN KEY (subject_id) REFERENCES subjects (subject_id)
);

CREATE TABLE files_for_tutors(
    file_id INT,
    userId INT,
	PRIMARY KEY (file_id, userId),
    FOREIGN KEY (file_id) REFERENCES files (file_id),
    FOREIGN KEY (userId) REFERENCES users (userId)
);


CREATE TABLE tutors_languages (
    tutor_id INT,
    language_id INT,
    PRIMARY KEY (tutor_id, language_id),
    FOREIGN KEY (tutor_id) REFERENCES tutors (tutor_id),
    FOREIGN KEY (language_id) REFERENCES languages (language_id)
);


CREATE TABLE students(
    student_id INT PRIMARY KEY,
    studentStatus varchar(30) NOT NULL,
    FOREIGN KEY (student_id) REFERENCES users (userId)
);

CREATE TABLE lessons(
	lesson_id INT auto_increment PRIMARY KEY,
	levelLesson varchar(30) NOT NULL,
	lessonTime INT NOT NULL,
	priceLesson INT NOT NULL,
	zoomLink varchar(255),
	accessibility bool NOT NULL,
	tutor_id INT,
	FOREIGN KEY (tutor_id) REFERENCES tutors (tutor_id)
);

CREATE TABLE lesson_languages (
    lesson_id INT,
    language_id INT,
    PRIMARY KEY (lesson_id, language_id),
    FOREIGN KEY (lesson_id) REFERENCES lessons (lesson_id),
    FOREIGN KEY (language_id) REFERENCES languages (language_id)
);

CREATE TABLE lesson_for_student(
    lesson_id INT,
	student_id INT ,
    dayLesson varchar(30),
	timeLesson varchar(30),
    dateLesson DATE NOT NULL,
    isPayed bool,
	PRIMARY KEY (lesson_id, student_id,dateLesson,timeLesson),
	FOREIGN KEY (lesson_id) REFERENCES lessons (lesson_id),
	FOREIGN KEY (student_id) REFERENCES students (student_id)
);

CREATE TABLE subject_of_lesson(
    lesson_id INT,
    subject_id INT,
    PRIMARY KEY (lesson_id, subject_id),
    FOREIGN KEY (lesson_id) REFERENCES lessons (lesson_id),
    FOREIGN KEY (subject_id) REFERENCES subjects (subject_id)
); 

CREATE TABLE calander_work(
      clanderId INT auto_increment PRIMARY KEY,
      tutorId INT,
      dayLesson VARCHAR(10) NOT NULL,
	  timesAvaliablePerDay VARCHAR(255) ,
	  FOREIGN KEY (tutorId) REFERENCES tutors (tutor_id)
);

CREATE TABLE prescribedLessons(
    prescribedLesson INT auto_increment PRIMARY KEY,
    tutor_id INT,
	lessonDate DATE NOT NULL,
    lessonHour varchar(10) NOT NULL,
    FOREIGN KEY (tutor_id) REFERENCES tutors (tutor_id)
);

CREATE TABLE manager(
	manager_id INT auto_increment PRIMARY KEY,
    numAccount varchar(20),
    numBranch varchar(20),
    nameBank varchar(20),
    numBank varchar(20),
    beneficiaryName varchar(30), 
	FOREIGN KEY (manager_id) REFERENCES users (userId)
);


CREATE TABLE comments(
	comment_id INT auto_increment PRIMARY KEY,
	comment_date DATE NOT NULL,
	body varchar(200) NOT NULL,
	student_id INT,
	FOREIGN KEY (student_id) REFERENCES students (student_id)
);

-- Insert data into addresses table
-- Insert data into addresses table
INSERT INTO addresses (city, street, house_number) VALUES
('New York', '5th Ave', 123),
('Los Angeles', 'Sunset Blvd', 456),
('Chicago', 'Wacker Dr', 789),
('Houston', 'Main St', 101),
('Phoenix', 'Central Ave', 202),
('ירושלים','הבנים',5);

-- Insert data into rolls table
INSERT INTO rolls (rollName) VALUES
('MANAGER'),
('STUDENT'),
('TUTOR'),
('HOLDING');

-- Insert data into users table
INSERT INTO users (firstName, lastName, email, phone, gender, birth_date,createDate, address_id) VALUES
('Learn', 'Hub', 'learnhubproj@gmail.com', '0527548858', 'זכר', '1980-01-01', '1980-01-01', 1),
('Jane', 'Smith', 'jane.smith@example.com', '0987654321', 'נקבה', '1990-02-02', '1980-01-01', 2),
('Alice', 'Johnson', 'alice.johnson@example.com', '2345678901', 'נקבה', '2000-03-03', '1980-01-01', 3),
('Bob', 'Brown', 'bob.brown@example.com', '3456789012', 'זכר', '1985-04-04', '1980-01-01', 4),
('Charlie', 'Davis', 'charlie.davis@example.com', '4567890123', 'זכר', '1975-05-05',  '1980-01-01',5),
('Rachel', 'Avraham', 'rachel.avraham@example.com', '0531234567', 'נקבה', '2000-10-25', '1980-01-01', 4),
('Moshe', 'Israel', 'moshe.israel@example.com', '0554567890', 'זכר', '1970-12-31', '1980-01-01', 5),
('שלמה', 'קיפניס', 'kipnis@example.com', '0556373893', 'זכר', '1970-12-31', '1980-01-01', 5),
('keli','ran','kr@gmail.com','0543423455','נקבה','1970-12-31', '1980-01-01',6);


-- Insert data into roll_for_user table
INSERT INTO roll_for_user (userId, rollId) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 3),
(5, 3),
(6, 2),
(7, 2),
(9,2);

-- Insert data into passwords table
INSERT INTO passwords (userId, password) VALUES
(1, '$2b$10$imK9A4Ps..aNdAYgcN5Bx.rfUGP6DkkreBMgVYFwDkTMuZBMTZqUe'),
(2, 'password2'),
(3, '$2b$10$fmU0l0lpj7dXyDjhgW70R.870/1WWwy3vQ1XTKFM.h4rxzPlQNuim'),
(4, 'password4'),
(5, 'password5'),
(6, 'password6'),
(7, 'password7'),
(8, 'sh'),
(9,'$2b$10$imK9A4Ps..aNdAYgcN5Bx.rfUGP6DkkreBMgVYFwDkTMuZBMTZqUe');

-- Insert data into languages table
INSERT INTO languages (language_name) VALUES
('English'),
('Spanish'),
('French'),
('German'),
('Chinese');

-- Insert data into files table
INSERT INTO files (fileUrl) VALUES
('http://example.com/file1'),
('http://example.com/file2'),
('http://example.com/file3'),
('http://example.com/file4'),
('http://example.com/file5'),
('https://static.wixstatic.com/media/9216b7_f5f7f38be2744bd59f9261a67e41f9d8~mv2_d_2729_2390_s_2.jpg/v1/fill/w_268,h_235,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9216b7_f5f7f38be2744bd59f9261a67e41f9d8~mv2_d_2729_2390_s_2.jpg');

-- Insert data into subjects table
INSERT INTO subjects (subjectName) VALUES
('Math'),
('Science'),
('History'),
('Literature'),
('Art');

-- Insert data into tutors table
INSERT INTO tutors (tutor_id, intended_for_gender) VALUES
(3, 'Both'),
(4, 'נקבה'),
(8, 'זכר'),
(5, 'זכר');

-- Insert data into calander table
INSERT INTO calander_work (tutorId, dayLesson, timesAvaliablePerDay) 
VALUES 
    (3, 'ראשון',  '10,11,13,14,16,17,18,19,20'),
    (3, 'שני',  '16,17,18,19,20'),
    (3, 'שלישי',  '15,16,17,18,19,20'),
    (3, 'רביעי',  '15,16,17,18,19,20'),
    (3, 'חמישי',  '10,11,12,13,14,16,17,18,19,20'),
    (3, 'שישי',  '8,9,10'), -- Assuming Friday hours

    (4, 'ראשון',  '9,10,12,13,14,16,17,18,19,20'),
    (4, 'שני',  '10,11,12,14,16,17,19,20,21,22'),
    (4, 'שלישי', '10,11,12,14,16,17,19,20,21,22'), -- Assuming same as Monday
    (4, 'רביעי', '10,11,12,14,16,17,19,20,21,22'), -- Assuming same as Monday
    (4, 'חמישי', '10,11,12,13,14,16,17,18,19,20'),
    (4, 'שישי',  '10,11,12,13'), -- Assuming similar to other days

    (8, 'ראשון', '10,11,12,13,14,16,17,18,19,20'),
    (8, 'שני', '10,11,12,13,14,16,17,18,19,20'),
    (8, 'שלישי',  '10,11,13,14,16,19,20,21,22'),
    (8, 'רביעי',  '10,11,12,18,19,20,21,22'),
    (8, 'חמישי',  '10,11,12,13,14,16,17,18,19,20'), -- Assuming similar to Sunday/Monday
    (8, 'שישי',  '10,11,12,13'), -- Assuming similar to other days

    (5, 'ראשון', '10,11,12,18,19,20,21,22'), -- Assuming similar to other days
    (5, 'שני',  '8,9,10,11,12,20,21,22'),
    (5, 'שלישי', '10,11,12,18,19,20,21,22'),
    (5, 'רביעי', '10,11,12,18,19,20,21,22'), -- Assuming similar to Tuesday
    (5, 'חמישי', '10,11,12,13,16,19,20,21,22'),
    (5, 'שישי', '10,11,12');

INSERT INTO prescribedLessons (tutor_id, lessonDate, lessonHour) VALUES
(3, '2024-07-07', '10'),  -- ראשון, מורה 3
(3, '2024-07-08', '16'),  -- שני, מורה 3
(4, '2024-07-09', '15'),  -- שלישי, מורה 4
(5, '2024-07-10', '11'),  -- רביעי, מורה 5
(8, '2024-07-11', '10');  -- חמישי, מורה 8


-- Insert data into subject_of_tutor table
INSERT INTO subject_of_tutor (tutor_id, subject_id) VALUES
(3, 1),
(4, 2),
(3, 2),
(5, 3);


-- Insert data into files_for_tutors table
INSERT INTO files_for_tutors (file_id, userId) VALUES
(1, 3),
(2, 4),
(6, 8),
(3, 5);


-- Insert data into tutors_languages table
INSERT INTO tutors_languages (tutor_id, language_id) VALUES
(3, 1),
(4, 2),
(5, 3);

-- Insert data into students table
INSERT INTO students (student_id, studentStatus) VALUES
(2, 'Primary'),
(6, 'High-School'),
(7, 'Other'),
(9,'Primary');

-- Insert data into lessons table
INSERT INTO lessons (levelLesson, lessonTime, priceLesson, zoomLink, accessibility, tutor_id) VALUES
('Beginner', 60, 20, 'http://zoom.com/lesson1', TRUE, 3),
('Intermediate', 90, 30, 'http://zoom.com/lesson2', TRUE,  4),
('Advanced', 120, 40, 'http://zoom.com/lesson3', FALSE,  5),
('Expert', 150, 50, 'http://zoom.com/lesson4', TRUE,  3),
('Master', 180, 60, NULL, FALSE , 5),
('Master', 180, 60, 'http://zoom.com/lesson5', FALSE,  5);

-- Insert data into lesson_for_student table
INSERT INTO lesson_for_student (lesson_id,student_id,dayLesson,timeLesson,dateLesson,isPayed) VALUES
(1,2,'ראשון','11','2024-01-01',FALSE),
(1,6,'שני','19','2024-01-01',FALSE),
(2,2,'שני','14','2024-01-01',FALSE),
(4,7,'רביעי','16','2024-01-01',FALSE),
(4,6,'חמישי','17','2024-01-01',FALSE),
(6,2,'שישי','10','2024-07-01',FALSE),
(4,2,'חמישי','17','2024-08-15',FALSE);


-- Insert data into lesson_languages table
INSERT INTO lesson_languages (lesson_id, language_id) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 4);

-- Insert data into subject_of_lesson table
INSERT INTO subject_of_lesson (lesson_id, subject_id) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 4);

-- Insert data into manager table
INSERT INTO manager (manager_id,numAccount,numBranch,nameBank,numBank, beneficiaryName) VALUES
(1, '12346','128','הפועלים','12','learnhub');

-- Insert data into comments table
INSERT INTO comments (comment_date, body, student_id) VALUES
('2024-01-01', 'Great lesson!', 2),
('2024-02-01', 'Very helpful.', 6),
('2024-03-01', 'Learned a lot.', 7),
('2024-04-01', 'Excellent tutor.', 2),
('2024-05-01', 'Will recommend.', 6);