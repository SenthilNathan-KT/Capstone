import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
const NotFound = () => <h1> Page Not Found </h1>;

const AppRoutes = () => {
    return (
        <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    )
}

export default AppRoutes;