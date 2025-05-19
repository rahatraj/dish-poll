import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../redux/slices/AuthSlice';
function Navbar() {
  const {user, isLoggedIn} = useSelector((state)=> state.auth)
  const navigate = useNavigate();

  const handleLogout = () => {
    logout()
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-blue-600 text-white px-6 py-4 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <Link to="/" className="text-xl font-bold hover:underline">
          Dish Poll
        </Link>

        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <Link
                to="/home"
                className="hover:underline text-white font-medium"
              >
                Home
              </Link>
              <span className="text-white font-medium">
                Welcome, <span className="font-semibold">{user?.username}</span>
              </span>
              <button
                onClick={handleLogout}
                className="bg-white text-blue-600 px-4 py-1 rounded hover:bg-gray-200 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/"
              className="bg-white text-blue-600 px-4 py-1 rounded hover:bg-gray-200 transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
