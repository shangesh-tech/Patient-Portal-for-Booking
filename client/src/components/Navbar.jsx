import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaUserCircle, FaFlask, FaHistory, FaSignOutAlt, FaHome, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const NavLink = ({ to, icon: Icon, children }) => {
    const isActive = location.pathname === to;
    return (
      <Link
        to={to}
        onClick={() => setIsMobileMenuOpen(false)}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200
          ${isActive 
            ? 'bg-blue-700 text-white' 
            : 'text-blue-100 hover:bg-blue-700 hover:text-white'
          }`}
      >
        <Icon className="h-5 w-5" />
        <span>{children}</span>
      </Link>
    );
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to={token ? '/dashboard' : '/'} className="flex items-center space-x-2">
              <FaUserCircle className="h-8 w-8 text-white" />
              <span className="text-white font-bold text-xl">Patient Portal</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {token ? (
              <>
                <NavLink to="/dashboard" icon={FaHome}>Dashboard</NavLink>
                <NavLink to="/tests" icon={FaFlask}>Lab Tests</NavLink>
                <NavLink to="/history" icon={FaHistory}>History</NavLink>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 text-blue-100 hover:bg-blue-700 hover:text-white rounded-lg transition-colors duration-200"
                >
                  <FaSignOutAlt className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link 
                to="/" 
                className="flex items-center space-x-2 px-4 py-2 text-blue-100 hover:bg-blue-700 hover:text-white rounded-lg transition-colors duration-200"
              >
                <FaUserCircle className="h-5 w-5" />
                <span>Login/Register</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-blue-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              {isMobileMenuOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-blue-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {token ? (
              <>
                <NavLink to="/dashboard" icon={FaHome}>Dashboard</NavLink>
                <NavLink to="/tests" icon={FaFlask}>Lab Tests</NavLink>
                <NavLink to="/history" icon={FaHistory}>History</NavLink>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-2 px-4 py-2 text-blue-100 hover:bg-blue-700 hover:text-white rounded-lg transition-colors duration-200"
                >
                  <FaSignOutAlt className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link 
                to="/" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center space-x-2 px-4 py-2 text-blue-100 hover:bg-blue-700 hover:text-white rounded-lg transition-colors duration-200"
              >
                <FaUserCircle className="h-5 w-5" />
                <span>Login/Register</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
