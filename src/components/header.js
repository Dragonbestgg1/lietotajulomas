import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import styles from '../styles/header.module.css';

function Header() {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn, userPrivilage, setUserPrivilage } = useContext(AuthContext);

  useEffect(() => {
    if (isLoggedIn) {
      axios.get('/user')
        .then(response => {
          setUserPrivilage(response.data.privilage);
        })
        .catch(error => {
          console.error('Error fetching user privilage:', error);
        });
    } else {
      setUserPrivilage(3);
    }
  }, [isLoggedIn, setUserPrivilage]);

  const handleClick = (event) => {
    event.preventDefault();
    const href = event.currentTarget.getAttribute('href');
  
    if (href === "/login" && isLoggedIn) {
      setIsLoggedIn(false);
      setUserPrivilage(3); 
      localStorage.removeItem('token');
      navigate('/login'); 
    } else {
      navigate(href);
    }
  }

  // Check if token exists
  const tokenExists = !!localStorage.getItem('token');

  return(
    <div className={`${styles.main}`}>
      <div className={`${styles.header}`}>
        <a className={`${styles.res}`} href="/">Home</a>
        {userPrivilage < 3 && userPrivilage >= 2 && <a className={`${styles.res}`} href="/admin">Control Panel</a>}
        {userPrivilage < 3 && userPrivilage >= 1 && <a className={`${styles.res}`} href="/data">Data</a>}
        {userPrivilage < 3 && userPrivilage >= 1 && <a className={`${styles.res}`} href="/orders">Orders</a>}
        {tokenExists && userPrivilage < 3 && userPrivilage >= 0 && <a className={`${styles.res}`} href="/reports">Reports</a>} {/* Render Reports link only if token exists */}
        {userPrivilage < 3 && (userPrivilage === 2 || userPrivilage === 0) && <a className={`${styles.res}`} href="/storage">Storage</a>}
        <a className={`${styles.res}`} href="/login" onClick={handleClick}>
          {isLoggedIn ? "Logout" : "Login"}
        </a>
      </div>
    </div>
  )
}

export default Header;
