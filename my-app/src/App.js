import './App.css';
import React from 'react';
import { Routes, Route, Navigate} from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import { useIsAuthenticated } from 'react-auth-kit';
import ProtectedRoutes from './pages/protectedRoutes';
import Register from './pages/register';
import Profile from './pages/profile';



function App() {

  const isAuth = useIsAuthenticated(true);
  return (
    <>
        <Routes>
        <Route path='/login' element={isAuth() ? <Navigate to="/" /> : <Login />} />
        <Route path='/register' element={isAuth() ? <Navigate to="/" /> : <Register />}/>
       
        {/* Protected Routes starts from here */}
        <Route element={<ProtectedRoutes auth={isAuth()}/>}>
          <Route path='/' element={<Home />}/>
          <Route path='/profile' element={<Profile/>}/>
        </Route>
      </Routes>
  </>
  );
}


export default App;
