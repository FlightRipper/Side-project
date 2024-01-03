import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const useSignInAdmin = () => {
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const signInAdmin = async (username, password) => {
    setError(null);

    try {
      const response = await axios.post('http://localhost:5000/users/Adminlogin', {
        username,
        password,
      });

      if (response.status === 200) {
        localStorage.setItem('user', JSON.stringify(response.data));
        dispatch({ type: 'LOGIN', payload: response.data });
        navigate('/admin/home');
        setError('Authentication successful');
      } else {
        setError('Incorrect credentials (Check your username and password)');
      }
    } catch (error) {
      setError('An error occurred while trying to log in.');
    }
  };

  return { signInAdmin, error };
};
