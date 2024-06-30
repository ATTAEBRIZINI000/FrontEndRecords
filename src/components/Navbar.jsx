import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Navbar.css';
import logo from '../assets/music (1).png';
import profilePic from '../assets/account.png';
import logoutIcon from '../assets/logout.png'; // Add an icon for logout
import loginIcon from '../assets/login.png'; // Add an icon for login
import registerIcon from '../assets/register.png'; // Add an icon for registration

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth(); // Get user and logout from AuthContext

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src={logo} alt="Logo" className="logo-img" />
        </Link>
      </div>
      <div className="navbar-toggle" onClick={toggleMenu}>
        <span className="navbar-toggle-icon">&#9776;</span>
      </div>
      <div className={`navbar-links ${isOpen ? 'open' : ''}`}>
        <Link to="/collections" onClick={() => setIsOpen(false)}>Collections</Link>
        <Link to="/categories" onClick={() => setIsOpen(false)}>Categories</Link>
      </div>
      <div className="navbar-profile">
        {user ? (
          <>
            <Link to="/profile" onClick={() => setIsOpen(false)}>
              <img src={profilePic} alt="Profile" className="profile-pic" />
            </Link>
            <button className="logout-button" onClick={logout}>
              <img src={logoutIcon} alt="Logout" className="logout-icon" />
            </button>
          </>
        ) : (
          <>
            <Link to="/login" onClick={() => setIsOpen(false)}>
              <img src={loginIcon} alt="Login" className="auth-icon" />
            </Link>
            <Link to="/register" onClick={() => setIsOpen(false)}>
              <img src={registerIcon} alt="Register" className="auth-icon" />
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
