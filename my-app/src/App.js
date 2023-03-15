import './App.css';
import React from 'react';
import { Routes, Route, Navigate} from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';

import { useIsAuthenticated } from 'react-auth-kit';
import ProtectedRoutes from './pages/protectedRoutes';



function App() {

  const isAuth = useIsAuthenticated(true);
  console.log(isAuth())
  return (
    <>
        <Routes>
       
      
        <Route path='/login' element={isAuth() ? <Navigate to="/" /> : <Login />} />
       
        {/* Protected Routes starts from here */}
        <Route element={<ProtectedRoutes auth={isAuth()}/>}>
        <Route path='/' element={<Home />} />
          
        </Route>
      </Routes>
  </>
  );
}


export default App;
