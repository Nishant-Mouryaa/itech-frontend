import { useState } from 'react';
import axios from '../axiosConfig';

/**
 * Custom hook for handling authentication (login, register, logout)
 */
export const useAuth = () => {
  const [user, setUser] = useState(null);

  const login = async ({ email, password }) => {
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      setUser({ email });
    } catch (err) {
      console.error(err);
    }
  };

  const register = async ({ name, email, password }) => {
    try {
      const res = await axios.post('/api/auth/register', {
        name,
        email,
        password
      });
      localStorage.setItem('token', res.data.token);
      setUser({ name, email });
    } catch (err) {
      console.error(err);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return { user, login, register, logout };
};
