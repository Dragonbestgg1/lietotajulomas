import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import HomePage from './HomePage.js';
import Login from './login/index.js';
import Admin from './admin/index.js';
import Data from './data/index.js';
import Orders from './orders/index.js';
import Reports from './reports/index.js';
import Storage from './storage/index.js';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000/api';
axios.defaults.withCredentials = true;

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/data" element={<Data />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/report/:id?" element={<Reports />} />
          <Route path="/storage" element={<Storage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
