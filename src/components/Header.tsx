import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-indigo-600 text-white p-4 z-10">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">App Civa</h1>
        {isAuthenticated ? (
          <button onClick={handleLogout} className="py-2 px-4 bg-red-600 rounded-md hover:bg-red-700">
            Logout
          </button>
        ) : null}
      </div>
    </header>
  );
};

export default Header;
