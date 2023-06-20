// App.js
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DetailTask from './components/mainProgram/detailTask.component';
import { Routes, Route, Link } from 'react-router-dom';

import AddTask from './components/mainProgram/addTask.component';
import Home from './components/mainProgram/home.component';
import Update from './components/mainProgram/update.component';
import Login from './components/login/login.component';
import Register from './components/login/register.component';

function handleLogOut() {
    localStorage.removeItem('userMail');
    window.location.href = '/';
}
class App extends Component {
    render() {
        return (
            <div className="">
                <Routes>
                    <Route path="/home/add" element={<AddTask />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/home/detail/:slug" element={<DetailTask />} />
                    <Route path="/home/update/:slug" element={<Update />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </div>
        );
    }
}

export default App;
