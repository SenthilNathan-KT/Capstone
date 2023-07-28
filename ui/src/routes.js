import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import CreateTopic from './components/CreateTopic';
import CreateQuiz from './components/CreateQuiz';
import SharedFolder from './components/SharedFolder';
import UpdateTopic from './components/UpdateTopic';
import TopicDetails from './components/TopicDetails';

const NotFound = () => <h1>404 Page Not Found</h1>;

const AppRoutes = () => {
    const isLoggedIn = !!localStorage.getItem('accessToken');

    return (
        <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            {isLoggedIn ? (
                <>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/createtopic" element={<CreateTopic />} />
                    <Route path="/createtopic/:id" element={<UpdateTopic />} />
                    <Route path="/topics/:topicId" element={<TopicDetails />} />
                    <Route path="/createquiz" element={<CreateQuiz />} />
                    <Route path="/sharedfolder" element={<SharedFolder />} />
                </>
            ) : null}
            {/* Add a catch-all route for 404 page */}
            <Route path='*' element={<NotFound />} />
        </Routes>
    )
}

export default AppRoutes;
