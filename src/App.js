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
import ChatBox from './components/chatBox.js';
import axios from 'axios';
import { AuthProvider } from './AuthContext'; 

axios.defaults.baseURL = 'http://localhost:8000/api';
axios.defaults.withCredentials = true;

function App() {
  return (
    <AuthProvider> 
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<><Header /><HomePage /></>} />
            <Route path="/login" element={<><Header /><Login /></>} />
            <Route path="/admin" element={<><Header /><Admin /></>} />
            <Route path="/data" element={<><Header /><Data /></>} />
            <Route path="/orders" element={<><Header /><Orders /></>} />
            <Route path="/reports" element={<><Header /><Reports /></>} />
            <Route path="/storage" element={<><Header /><Storage /></>} />
          </Routes>
          <ChatBox /> {/* Include the ChatBox component here */}
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
