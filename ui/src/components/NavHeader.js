import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
//import '../App.css';
import axios from 'axios';

const NavHeader =() =>{ 
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        navigate('/login');
      }

      useEffect(() => {
        if (localStorage.getItem('accessToken')) {
          setIsLoggedIn(true);
        }
      }, []);

    return (
        <div className="home-page">
            <nav className="navbar">
                <div className="navbar-logo">
                    <Link to="/">
                        <img src="/assets/images/dark theme logo.png" alt="Logo" />
                    </Link>
                </div>
                    <ul className="navbar-links">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    {isLoggedIn ? (
                        <li>
                        <Link to="/login" onClick={handleLogout}>Logout</Link>
                        </li>
                    ) : (
                        <>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/register">Sign Up</Link>
                        </li>
                        </>
                    )}
                    </ul>
                    {/* <div className="navbar-language">
                    <select>
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                    </select>
                    </div> */}
            </nav>
        </div>
            
    );
};

export default NavHeader;