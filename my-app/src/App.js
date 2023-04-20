import "./App.css";
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/pageHomeUser/home";
import Login from "./pages/pageHomeUser/login";
import { useIsAuthenticated } from "react-auth-kit";
import { QueryClient, QueryClientProvider } from "react-query";
import ProtectedRoutes from "./pages/pageHomeUser/protectedRoutes";
import Register from "./pages/pageHomeUser/register";
import Profile from "./pages/pageHomeUser/profile";
import SupplierManagement from "./pages/pageSupplierManagement/supplierManagement";
import EditSupplier from "./pages/pageSupplierManagement/editSupplier";

import { ReactQueryDevtools } from "react-query/devtools";
import IngredientManagement from "./pages/pageIngredientManagement/ingredientsManagement";

import ViewIngredients from "./pages/pageIngredientManagement/viewIngredients";

const queryClient = new QueryClient();

function App() {
  const isAuth = useIsAuthenticated(true);
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route
          path="/login"
          element={isAuth() ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/register"
          element={isAuth() ? <Navigate to="/" /> : <Register />}
        />

        {/* Protected Routes starts from here */}
        <Route element={<ProtectedRoutes auth={isAuth()} />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/supplier-management" element={<SupplierManagement />} />
          <Route
            path="/supplier-management/edit/:supplierId"
            element={<EditSupplier />}
          />
          <Route
            path="/ingredient-management"
            element={<IngredientManagement />}
          />
          <Route
            path="/ingredient-management/:supplierId"
            element={<ViewIngredients />}
          />
        </Route>
      </Routes>
      <ReactQueryDevtools initialIsOpem={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
