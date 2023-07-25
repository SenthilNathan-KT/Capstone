import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
//import '../App.css';
import axios from 'axios';

const NavHeader =() =>{ 
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    //const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        delete axios.defaults.headers.common['Authorization'];
        console.log(axios.defaults.headers.common.Authorization);
        navigate('/login');
      }

      useEffect(() => {
        const storedToken = localStorage.getItem('accessToken');
        
        if (storedToken) {
        axios.defaults.headers.common['Authorization'] = storedToken;
        console.log(axios.defaults.headers.common.Authorization);
        setIsLoggedIn(true);
        } else {
        setIsLoggedIn(false);
        }
        // const accessToken = axios.defaults.headers.common.Authorization;
        // console.log(axios.defaults.headers.common.Authorization);
        // //if (axios.defaults.headers.common.Authorization) {
        // //if (localStorage.getItem('accessToken')) {
        // if(accessToken === undefined || accessToken === null ) {
        //     const storedToken = localStorage.getItem('accessToken');
        //     if(storedToken) {
        //         axios.defaults.headers.common['Authorization'] = storedToken;
        //         setIsLoggedIn(true);
        //     } else {
        //         setIsLoggedIn(false);
        //     }
        // } else {
        //     setIsLoggedIn(true);
        // }
        //setLoading(false); 
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
                        {/* <li>
                            <Link to="/register">Sign Up</Link>
                        </li> */}
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