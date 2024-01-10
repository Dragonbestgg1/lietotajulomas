import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from '../styles/header.module.css';

function Header() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleClick = (event) => {
    event.preventDefault();
    const href = event.currentTarget.getAttribute('href');
  
    if (href === "/login") {
      if (isLoggedIn) {
        localStorage.removeItem('token');
        setIsLoggedIn(false, () => {
          navigate('/login'); 
        });
      } else {
        navigate('/login'); 
      }
    } else {
      navigate(href);
    }
  }
  return(
    <div className={`${styles.main}`}>
      <div className={`${styles.header}`}>
        <a className={`${styles.res}`} href="/" onClick={handleClick}>Home</a>
        <a className={`${styles.res}`} href="/admin" onClick={handleClick}>Control Panel</a>
        <a className={`${styles.res}`} href="/data">Data</a>
        <a className={`${styles.res}`} href="/orders">Orders</a>
        <a className={`${styles.res}`} href="/reports">Reports</a>
        <a className={`${styles.res}`} href="/storage">Storage</a>
        <a className={`${styles.res}`} href="/login" onClick={handleClick}>
          {isLoggedIn ? "Logout" : "Login"}
        </a>
      </div>
    </div>
  )
}

export default Header;
