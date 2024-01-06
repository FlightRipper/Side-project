import React from 'react'
import { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';

import SignInPage from './pages/signin.jsx';
import RegisterPage from './pages/register.jsx';
import AllMemes from './pages/displayAll.jsx';
import AdminPage from './pages/admin.jsx';
import { useAuthContext } from './hooks/useAuthContext.jsx';


function App() {

  const { user } = useAuthContext();
  const isAdmin = user && user.userType === "memeCreator";
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => resolve());
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return;
  }
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignInPage />}/>
        <Route
          path="/admin"
          element={isAdmin ? <AdminPage /> : <Navigate to={'/'} />}
        />
        <Route path="/displayAll"  element={<AllMemes />}/>
        <Route path="/register" element={<RegisterPage />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

