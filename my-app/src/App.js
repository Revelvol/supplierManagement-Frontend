import './App.css';
import React from 'react';
import { Routes, Route, Navigate} from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import { useIsAuthenticated } from 'react-auth-kit';
import { QueryClient, QueryClientProvider } from 'react-query';
import ProtectedRoutes from './pages/protectedRoutes';
import Register from './pages/register';
import Profile from './pages/profile';
import SupplierManagement from './pages/supplierManagement';
import EditSupplier from './pages/editSupplier';

import {ReactQueryDevtools} from 'react-query/devtools'
import IngredientManagement from './pages/ingredientsManagement';



const queryClient = new QueryClient()


function App() {

  const isAuth = useIsAuthenticated(true);
  return (
   
    <QueryClientProvider client={queryClient}>
        <Routes>
        <Route path='/login' element={isAuth() ? <Navigate to="/" /> : <Login />} />
        <Route path='/register' element={isAuth() ? <Navigate to="/" /> : <Register />}/>
       
        {/* Protected Routes starts from here */}
        <Route element={<ProtectedRoutes auth={isAuth()}/>}>
          <Route path='/' element={<Home />}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/supplier-management' element={<SupplierManagement/>}/>
          <Route path='/supplier-management/edit/:supplierId'element={<EditSupplier/>} />
          <Route path= '/ingredient-management' element={<IngredientManagement/>} />
        </Route>
      </Routes>
      <ReactQueryDevtools initialIsOpem={false} position="bottom-right" />
    </QueryClientProvider>
   
  );
}


export default App;
