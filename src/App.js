// App.js
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Container } from 'react-bootstrap';
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/login/login.component';
import DetailTask from './components/mainProgram/detailTask.component';
import { Routes, Route, Link } from 'react-router-dom';

import AddTask from './components/mainProgram/addTask.component';
import Home from './components/mainProgram/home.component';

function handleLogOut() {
    localStorage.removeItem('userMail');
    window.location.href = '/';
}
class App extends Component {
    render() {
        return (
            <div className="container">
                <Routes>
                    <Route path="/home/add" element={<AddTask />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/home/detail/:slug" element={<DetailTask />} />
                </Routes>
            </div>
        );
    }
}

export default App;
