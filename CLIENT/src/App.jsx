import React, { useState, createContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import HomePage from './components/homePage'
 
export const UserContext = createContext()

function App() {
  const [user, setUser] = useState({});
      useEffect(() => {
         const userInLocalStorage = localStorage.getItem('user');
         if (userInLocalStorage) {
           const parsedUser = JSON.parse(userInLocalStorage);
           setUser(parsedUser);
         }
       }, []);

  return (
    
    <> 
    <UserContext.Provider value={user}>
                <BrowserRouter basename='/'>
                    <Routes>
                      <Route path="/" element={<Navigate to="/homePage"/>}/>
                      <Route path="/homePage" element={<HomePage />} />
                   </Routes>
             </BrowserRouter>
     </UserContext.Provider>

            
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