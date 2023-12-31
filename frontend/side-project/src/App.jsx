import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';

import SignInPage from './pages/signin.jsx';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/SignIn" element={<SignInPage />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

