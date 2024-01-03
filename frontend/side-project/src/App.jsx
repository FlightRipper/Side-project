import React from 'react'
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
import { useAuthContext } from './hooks/useAuthContext.jsx';


function App() {

  const { user } = useAuthContext();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignInPage />}/>
        {/* <Route path="/displayAll"  element={user ? <AllMemes /> : <Navigate to={'/'} />}/> */}
        <Route path="/displayAll"  element={<AllMemes />}/>
        <Route path="/register" element={<RegisterPage />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

