import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import usersList from '../data/users.json'
import { useDispatch } from 'react-redux';
import { login } from '../redux/slices/AuthSlice';

function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const matchedUser = usersList?.users?.find(
      (user) => user.username === username && user.password === password
    );

    if (matchedUser) {
      dispatch(login(matchedUser));
      localStorage.setItem('user', JSON.stringify(matchedUser));
      localStorage.setItem("isLoggedIn", "true");
      navigate('/home');
    } else {
      setErrorMsg('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {errorMsg && <p className="text-red-500 mb-4 text-sm text-center">{errorMsg}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter username"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
