import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import CreateTopic from './components/CreateTopic';
import CreateQuiz from './components/CreateQuiz';
import SharedFolder from './components/SharedFolder';
const NotFound = () => <h1> Page Not Found </h1>;

const AppRoutes = () => {
    return (
        <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/createtopic' element={<CreateTopic />} />
            <Route path='/createquiz' element={<CreateQuiz />} />
            <Route path='/sharedfolder' element={<SharedFolder />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    )
}

export default AppRoutes;