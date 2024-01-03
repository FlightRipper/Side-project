import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { useNavigate } from 'react-router-dom';

export const useRegister = () => {
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate()

  const register = async (username, password, userType) => {
    setError(null);
    console.log(username, password, userType)

    const response = await fetch('http://localhost:5000/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, userType }),
    });
    const json = await response.json();
    
    if(!response.ok){
      setError('Registration failed UserName might exist');
    }
    if(response.ok){

        //save the user to the local storage
        localStorage.setItem('user', JSON.stringify(json))

        //update the context
        dispatch({type: 'LOGIN',payload: json})

        setError('Registration successful')

        navigate('/')
    }
  };
  return {register, error}
};
