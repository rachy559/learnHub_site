import React, { useState, createContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import Layout from './pages/Layout';
import HomePage from './pages/HomePage';
import Tutors from './pages/Tutors';
import { serverRequests } from './Api';
import LogIn from './pages/Login';
import SignUp from './pages/SignUp';
import Lessons from './pages/Lessons';


 
export const UserContext = createContext()
export const ShowHeadersContext = createContext();
export const TutorsContext = createContext()


function App() {
  const limit=10;
  const [allTutors, setAllTutors] = useState([]);
  const [showHeaders, setShowHeaders] = useState(true);
  const [user, setUser] = useState({});
      useEffect(() => {
         const userInLocalStorage = localStorage.getItem('user');
         if (userInLocalStorage) {
           const parsedUser = JSON.parse(userInLocalStorage);
           setUser(parsedUser);
         }
       }, []);

       useEffect(() => {
        const fetchDataOfAllTutors = async () => {
            try {
                await serverRequests('GET', `tutors?_limit=${limit}`, null).then((foundTutors) => {
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
    <UserContext.Provider value={{user,setUser}}>
    <ShowHeadersContext.Provider value={showHeaders}>
    <TutorsContext.Provider value={allTutors}>
                <BrowserRouter basename='/'>
                    <Routes>
                    <Route path="/" element={<Layout setShowHeaders={setShowHeaders} setUser={setUser}/>}>
                      <Route path="/" element={<Navigate to="/homePage"/>}/>
                      <Route path="/homePage" element={<HomePage />} />
                      <Route path="/tutors" element={<Tutors />} />
                      <Route path="/login" element={<LogIn setShowHeaders={setShowHeaders} setUser={setUser}/>} />
                      <Route path="/signUp" element={<SignUp setShowHeaders={setShowHeaders} setUser={setUser}/>} />
                      <Route path="/lessons" element={<Lessons />} />
                   </Route>
                   </Routes>
             </BrowserRouter>
     </TutorsContext.Provider>       
     </ShowHeadersContext.Provider>
     </UserContext.Provider>
    </>
  )
}

export default App










