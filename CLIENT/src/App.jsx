import React, { useState, createContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import Layout from './pages/Layout';
import HomePage from './pages/HomePage';
import Tutors from './pages/Tutors';
import { serverRequests } from './Api';
import LogIn from './pages/Login';

 
export const UserContext = createContext()
export const TutorsContext = createContext()


function App() {
  const limit=10;
  const [allTutors, setAllTutors] = useState([]);
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
                    console.log("tutors", allTutors, foundTutors)
                })
            } catch (error) {
                console.error('Error fetching tutors:', error);
            }
        };
        fetchDataOfAllTutors();
    }, []);

  return (   
    <> 
    <TutorsContext.Provider value={allTutors}>
                <BrowserRouter basename='/'>
                    <Routes>
                    <Route path="/" element={<Layout />}>
                      <Route path="/" element={<Navigate to="/homePage"/>}/>
                      <Route path="/homePage" element={<HomePage />} />
                      <Route path="/tutors" element={<Tutors />} />
                      <Route path="/login" element={<LogIn />} />
                   </Route>
                   </Routes>
             </BrowserRouter>
     </TutorsContext.Provider>       
    </>
  )
}

export default App










//     return (
       
//                     
//                     <Route path="/register" element={<Register setUser={setUser} />} />
//                     <Route path="/login" element={<LogIn setUser={setUser} />} />
//                     <Route path="/details" element={<Details setUser={setUser} />} />

//                     <Route path="/home/users/:id" element={<Home />} >
//                         <Route path="/home/users/:id/info" element={<Info />} />
//                         <Route path="/home/users/:id/todos" element={<Todos />} />
//                         <Route path="/home/users/:id/posts" element={<Posts />} />
//                         <Route path="/home/users/:id/alboms" element={<Alboms />} />
//                         <Route path="/home/users/:id/albums/:albumId/photos" element={<Photos />} />
//                         <Route path="/home/users/:id/posts/:postId/comments" element={<Comments />} />
                             //                     </Route>
   

//     );
// }


// export default App;