import React, {useState} from "react";
import { Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import CreateTopic from './components/CreateTopic';
import CreateQuiz from './components/CreateQuiz';
//import SharedFolder from './components/SharedFolder';
import UpdateTopic from './components/UpdateTopic';
import TopicDetails from './components/TopicDetails';
import ListTopics from './components/ListTopics';
import TopBar from './components/TopBar';
import UpdateUser from './components/UpdateUser';

const NotFound = () => <h1>404 Page Not Found</h1>;

const AppRoutes = () => {
    const isLoggedIn = !!sessionStorage.getItem('accessToken');
    console.log(isLoggedIn, 'isLoggedIn');
    sessionStorage.setItem('selectedTitle', 'Dashboard');

    return (
        <>
        
        <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            {isLoggedIn ? (
                <>
                    <Route 
                        path="/dashboard" 
                        element={
                            <Dashboard /> }
                    />
                    <Route path="/createtopic" element={<CreateTopic />} />
                    <Route path="/updatetopic/:id" element={<UpdateTopic />} />
                    <Route path="/topics" element={<ListTopics />} />
                    <Route path="/topics/:topicId" element={<TopicDetails />} />
                    <Route path="/topics/:topicId/quiz" element={<CreateQuiz />} />
                    <Route path="/settings" element={<UpdateUser />} />
                    {/* <Route path="/sharedfolder" element={<SharedFolder />} /> */}
                </>
            ) : null}
            {/* Add a catch-all route for 404 page */}
            <Route path='*' element={<NotFound />} />
        </Routes>
        </>
    )
}

export default AppRoutes;
