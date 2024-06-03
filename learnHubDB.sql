-- create database mySql_Project;
/* Create the database */
CREATE DATABASE  IF NOT EXISTS learnHubDB;


/* Switch to the classicmodels database */
USE learnHubDB;


/*DROP existing tables */
DROP TABLE IF EXISTS lessons;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS languages;
DROP TABLE IF EXISTS tutors_languages;
DROP TABLE IF EXISTS tutors;
DROP TABLE IF EXISTS manager;
DROP TABLE IF EXISTS payments;
DROP TABLE IF EXISTS addresses;


/* Create the tables */

CREATE TABLE addresses(
    address_id INT auto_increment PRIMARY KEY,
    city varchar(100) NOT NULL,
    street varchar(100) NOT NULL,
    house_number INT NOT NULL
);

CREATE TABLE languages(
    language_id INT auto_increment PRIMARY KEY,
    language_name VARCHAR(30) NOT NULL
);


CREATE TABLE tutors(
tutor_id INT auto_increment PRIMARY KEY,
first_name varchar (20) NOT NULL,
last_name varchar (20) NOT NULL,
email varchar (40) NOT NULL,
gender varchar (6) NOT NULL,
picture BLOB,
birth_date DATE NOT NULL,
phone varchar(10) NOT NULL,
intended_for_gender varchar(30) NOT NULL,
address_id INT,
FOREIGN KEY (address_id) REFERENCES addresses (address_id)
);


CREATE TABLE tutors_languages (
    tutor_id INT,
    language_id INT,
    PRIMARY KEY (tutor_id, language_id),
    FOREIGN KEY (tutor_id) REFERENCES tutors (tutor_id),
    FOREIGN KEY (language_id) REFERENCES languages (language_id)
);

CREATE TABLE payments(
payment_id INT auto_increment PRIMARY KEY
);


CREATE TABLE students(
student_id INT auto_increment PRIMARY KEY,
first_name varchar (20) NOT NULL,
last_name varchar (20),
email varchar (40) NOT NULL,
gender varchar (6) NOT NULL,
birth_date DATE NOT NULL,
phone varchar(10) NOT NULL,
srudentStatus varchar(30) NOT NULL,
payment_id INT,
address_id INT,
FOREIGN KEY (address_id) REFERENCES addresses (address_id),
FOREIGN KEY (payment_id) REFERENCES payments (payment_id)
);

CREATE TABLE lessons(
lesson_id INT auto_increment PRIMARY KEY,
subjectLesson varchar(30) NOT NULL,
levelLesson varchar(30) NOT NULL,
lessonTime INT(20)NOT NULL,
priceLesson INT(20) NOT NULL,
zoomLink varchar(255),
accessibility bool NOT NULL,
payment_id INT,
student_id INT,
tutor_id INT,
FOREIGN KEY (payment_id) REFERENCES payments (payment_id),
FOREIGN KEY (student_id) REFERENCES students (student_id),
FOREIGN KEY (tutor_id) REFERENCES tutors (tutor_id)
);


CREATE TABLE manager(
manager_id INT auto_increment PRIMARY KEY,
first_name varchar (20) NOT NULL,
last_name varchar (20)
);


CREATE TABLE comments(
comment_id INT auto_increment PRIMARY KEY,
responder_name varchar(30) NOT NULL,
tutor_name varchar(30),
subjectLesson varchar(30),
comment_date DATE NOT NULL,
body varchar(200) NOT NULL
);

-- Insert data into addresses table
INSERT INTO addresses (city, street, house_number) VALUES
('New York', 'Broadway', 123),
('Los Angeles', 'Sunset Blvd', 456),
('Chicago', 'Michigan Ave', 789),
('Houston', 'Main St', 101),
('Phoenix', 'Central Ave', 202);

-- Insert data into languages table
INSERT INTO languages (language_name) VALUES
('English'),
('Spanish'),
('French'),
('German'),
('Chinese');

-- Insert data into tutors table
INSERT INTO tutors (first_name, last_name, email, gender, picture, birth_date, phone, intended_for_gender, address_id) VALUES
('John', 'Doe', 'john.doe@example.com', 'Male', NULL, '1980-01-01', '5551234567', 'Both', 1),
('Jane', 'Smith', 'jane.smith@example.com', 'Female', NULL, '1985-05-05', '5559876543', 'Female', 2),
('Jim', 'Brown', 'jim.brown@example.com', 'Male', NULL, '1990-10-10', '5551112222', 'Male', 3),
('Emily', 'Davis', 'emily.davis@example.com', 'Female', NULL, '1995-12-12', '5553334444', 'Both', 4),
('Michael', 'Wilson', 'michael.wilson@example.com', 'Male', NULL, '2000-03-03', '5555556666', 'Female', 5);

-- Insert data into tutors_languages table
INSERT INTO tutors_languages (tutor_id, language_id) VALUES
(1, 1), -- Tutor 1 speaks English
(1, 2), -- Tutor 1 speaks Spanish
(2, 3), -- Tutor 2 speaks French
(3, 4), -- Tutor 3 speaks German
(4, 5), -- Tutor 4 speaks Chinese
(5, 1), -- Tutor 5 speaks English
(5, 3); -- Tutor 5 speaks French

-- Insert data into payments table
INSERT INTO payments () VALUES
(),
(),
(),
(),
();

-- Insert data into students table
INSERT INTO students (first_name, last_name, email, gender, birth_date, phone, srudentStatus, payment_id, address_id) VALUES
('Alice', 'Johnson', 'alice.johnson@example.com', 'Female', '2002-04-04', '5556667777', 'Active', 1, 1),
('Bob', 'Williams', 'bob.williams@example.com', 'Male', '2001-06-06', '5557778888', 'Active', 2, 2),
('Carol', 'Jones', 'carol.jones@example.com', 'Female', '2003-08-08', '5558889999', 'Inactive', 3, 3),
('Dave', 'Garcia', 'dave.garcia@example.com', 'Male', '2000-02-02', '5559990000', 'Active', 4, 4),
('Eve', 'Martinez', 'eve.martinez@example.com', 'Female', '2004-01-01', '5550001111', 'Inactive', 5, 5);

-- Insert data into lessons table
INSERT INTO lessons (subjectLesson, levelLesson, lessonTime, priceLesson, zoomLink, accessibility, payment_id, student_id, tutor_id) VALUES
('Math', 'Beginner', 60, 100, 'http://zoom.us/lesson1', TRUE, 1, 1, 1),
('Science', 'Intermediate', 45, 150, 'http://zoom.us/lesson2', FALSE, 2, 2, 2),
('History', 'Advanced', 30, 200, 'http://zoom.us/lesson3', TRUE, 3, 3, 3),
('Art', 'Beginner', 60, 120, 'http://zoom.us/lesson4', FALSE, 4, 4, 4),
('English', 'Intermediate', 45, 130, 'http://zoom.us/lesson5', TRUE, 5, 5, 5);

-- Insert data into manager table
INSERT INTO manager (first_name, last_name) VALUES
('Chris', 'Anderson'),
('Pat', 'Lee'),
('Sam', 'Taylor'),
('Alex', 'White'),
('Jordan', 'Clark');

-- Insert data into comments table
INSERT INTO comments (responder_name, tutor_name, subjectLesson, comment_date, body) VALUES
('Alice Johnson', 'John Doe', 'Math', '2024-06-01', 'Great lesson!'),
('Bob Williams', 'Jane Smith', 'Science', '2024-06-02', 'Very informative.'),
('Carol Jones', 'Jim Brown', 'History', '2024-06-03', 'Loved the class.'),
('Dave Garcia', 'Emily Davis', 'Art', '2024-06-04', 'Well explained.'),
('Eve Martinez', 'Michael Wilson', 'English', '2024-06-05', 'Helpful session.');
