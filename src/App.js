import React, { useState, useEffect } from 'react';
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
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Move isLoggedIn state here

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<><Header key={isLoggedIn} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} /><HomePage /></>} />
          <Route path="/login" element={<><Header key={isLoggedIn} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} /><Login setIsLoggedIn={setIsLoggedIn} /></>} />
          <Route path="/admin" element={<><Header key={isLoggedIn} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} /><Admin /></>} />
          <Route path="/data" element={<><Header key={isLoggedIn} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} /><Data /></>} />
          <Route path="/orders" element={<><Header key={isLoggedIn} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} /><Orders /></>} />
          <Route path="/report/:id?" element={<><Header key={isLoggedIn} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} /><Reports /></>} />
          <Route path="/storage" element={<><Header key={isLoggedIn} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} /><Storage /></>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
