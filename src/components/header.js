import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import styles from '../styles/header.module.css';

function Header() {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);


  const handleClick = (event) => {
    event.preventDefault();
    const href = event.currentTarget.getAttribute('href');
  
    if (href === "/login" && isLoggedIn) {
      setIsLoggedIn(false);
      localStorage.removeItem('token');
      navigate('/login'); 
    } else {
      navigate(href);
    }
  }

  return(
    <div className={`${styles.main}`}>
      <div className={`${styles.header}`}>
        <a className={`${styles.res}`} href="/">Home</a>
        <a className={`${styles.res}`} href="/admin">Control Panel</a>
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
