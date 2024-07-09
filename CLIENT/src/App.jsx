import React, { useState, createContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';

import { serverRequests } from './Api';

import Layout from './pages/Layout';
import HomePage from './pages/HomePage';
import Tutors from './pages/Tutors';
import LogIn from './pages/Login';
import SignUp from './pages/SignUp';
import Lessons from './pages/Lessons';
import Manager_homePage from './pages/Manager_homePage';
import StudentProfile from './pages/StudentProfile';
import Lesson from './components/CalendarWork';
import TutorProfile from './pages/TutorProfile';
import AdminProfile from './pages/AdminProfile';
import ConfirmTutors from './pages/ConfirmTutors';
import ConfirmTutor from './pages/ConfirmTutor';


export const UserContext = createContext()
export const ShowHeadersContext = createContext();
export const TutorsContext = createContext()
export const FilterContext = createContext();


function App() {
  const limit = 10;
  const [allTutors, setAllTutors] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [selectedGender, setSelectedGender] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [showHeaders, setShowHeaders] = useState(true);
  const [user, setUser] = useState({});
  const [isLogedIn,setIsLogedIn]=useState(false);
  const [loading,setLoading]=useState(true);


  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");
    // const refreshToken = sessionStorage.getItem("refreshToken");  
    if(accessToken){
      setIsLogedIn(true);
      setLoading(false);
      serverRequests('GET', 'auth')
      .then((user)=>{
        setUser(user);
        setShowHeaders(false);
      })
      //איך לעשות שהתוקן ימחק מסשן אחרי סיום התוקף שלו?
      //איך לעשות שאחרי שעובר זמן התוקן, האתר יתנתק משמע ההדר חוזר להיות רגיל?
    }
    // else if(refreshToken){
    //   console.log("here i am",refreshToken);
    //   serverRequests('POST', 'refreshToken', refreshToken)
    //   .then((response)=>{
    //     const { newAccessToken } = response; // חילוץ היוזר והטוקן מהתגובה
    //     sessionStorage.setItem('accessToken',newAccessToken);
    //     setIsLogedIn(true);
    //     setLoading(false);
    //     serverRequests('GET', 'auth')
    //     .then((user)=>{
    //       setUser(user);
    //       setShowHeaders(false);
    //     })
    //   })
    //   .catch(err=>{
    //     console.error('error refreshing token:', err);
    //     setIsLogedIn(false);
    //   })
    //   .finally(()=>{
    //     setLoading(true);
    //   });
    // }
    else{
      setIsLogedIn(false);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const fetchDataOfAllTutors = async () => {
      try {
        await serverRequests('GET', 'tutors', null).then((foundTutors) => {
          setAllTutors(foundTutors);
        })
      } catch (error) {
        console.error('Error fetching tutors:', error);
      }
    };
    fetchDataOfAllTutors();
  }, []);

  return (
    <>

      <UserContext.Provider value={{ user, setUser }}>
        <FilterContext.Provider value={{
          selectedLanguages,
          setSelectedLanguages,
          selectedSubjects,
          setSelectedSubjects,
          selectedGender,
          setSelectedGender,
          selectedOptions,
          setSelectedOptions,
          selectedLocations,
          setSelectedLocations
        }}>
          <ShowHeadersContext.Provider value={showHeaders}>
            <TutorsContext.Provider value={{ allTutors, setAllTutors }}>
              <BrowserRouter basename='/'>
                <Routes>
#
                  <Route path="/" element={<Layout setShowHeaders={setShowHeaders} setUser={setUser} />}>
                    {user.roles==='MANAGER'?(<Route path="/" element={<Navigate to="/manager_homePage" />} />
                    ):(<Route path="/" element={<Navigate to="/homePage" />} />)}

                    <Route path="/homePage" element={<HomePage />} />
                    <Route path="/tutors" element={<Tutors />} />
                    <Route path="/login" element={<LogIn setShowHeaders={setShowHeaders} setUser={setUser} />} />
                    <Route path="/signUp" element={<SignUp setShowHeaders={setShowHeaders} setUser={setUser} />} />
                    <Route path="/lessons" element={<Lessons />} />
                    <Route path="/manager_homePage" element={<Manager_homePage />} />
                    <Route path="/lesson" element={<Lesson />} />
                    <Route path="/studentProfile" element={<StudentProfile setUser={setUser} user={user} />} />
                    <Route path="/tutorProfile" element={<TutorProfile setUser={setUser} user={user} />} />
                    <Route path="/adminProfile" element={<AdminProfile setUser={setUser} user={user} />} />
                    <Route path="/confirmTutors" element={<ConfirmTutors setUser={setUser} user={user} />} />
                    <Route path="/confirmTutor" element={<ConfirmTutor setUser={setUser} user={user} />} />
                  </Route>
                </Routes>
              </BrowserRouter>
            </TutorsContext.Provider>
          </ShowHeadersContext.Provider>
        </FilterContext.Provider>
      </UserContext.Provider>

    </>
  )
}

export default App










