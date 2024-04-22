import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const LoginForm = () => {
  const [isLoggedIn, setIsLoggedIn] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:8000/api/user/login', {
        username,
        password,
      });
      if (response.data.success) {
        setIsLoggedIn(response.data.success);
        navigate('/');
        toast.success(response.data.message);
      }


    } catch (error) {
      toast.error(error.response.data.message);
      setIsLoggedIn(error.response.data.success);
    } 
    finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white rounded-lg shadow-md p-8 space-y-6"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <div className="relative">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Username"
          />
        </div>
        <div className="relative">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Password"
          />
        </div>
        {/* <button
          type="submit"
          className="w-full block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button> */}

<button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V2.83a1 1 0 011.7-.71l6 6a1 1 0 010 1.42l-6 6a1 1 0 01-1.41-1.42L14.59 13H12a6 6 0 100 12 1 1 0 011 1 1 1 0 01-1 1 1 1 0 01-1-1v-2a1 1 0 011-1 4 4 0 110-8h-2.59l-2.3 2.29a1 1 0 01-1.41-1.42l4-4a1 1 0 011.42 0l4 4a1 1 0 01-1.42 1.42L11 13.41V16a1 1 0 01-2 0v-4a1 1 0 011-1 1 1 0 011 1 1 1 0 01-1 1 1 1 0 01-1-1V9.17A8 8 0 014 12z"></path>
                </svg>
              ) : null}
              {isLoading ? "Logging in..." : "Login"}
            </button>
      </form>
    </div>
  );
};

export default LoginForm;