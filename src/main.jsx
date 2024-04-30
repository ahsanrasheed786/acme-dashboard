import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client
import App, { myServerUrl } from './App.jsx';
import './index.css';
import { createContext } from 'react';
import axios from 'axios';
import Loader from './components/loader/Loader.jsx';

export const context = createContext({ isAuthenticated: false });

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); 
  const [userProfile, setUserProfile] = useState({});
  const [profilebtn, setProfilebtn] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${myServerUrl}api/user/getmyprofile`, { withCredentials: true });
        if (response.data.success) {
          setIsAuthenticated(true);
          setUserProfile(response.data.user);
        }
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false); 
      }
    };
    fetchProfile();
  }, []);

  return (
    <context.Provider value={{ isAuthenticated, setIsAuthenticated, 
    loading, setLoading, userProfile, setUserProfile ,profilebtn, setProfilebtn }}>
      {loading ? <Loader /> : <App />} 
    </context.Provider>
  );
};

createRoot(document.getElementById('root')).render( // Use createRoot from react-dom/client
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
