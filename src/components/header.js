import React from "react";
import { useNavigate } from "react-router-dom";
import styles from '../styles/header.module.css';

function Header(){
  const navigate = useNavigate();

  const handleClick = (event) => {
      event.preventDefault();
      navigate(event.currentTarget.getAttribute('href'));
  }

  return(
    <div className={`${styles.main}`}>
      <div className={`${styles.header}`}>
        <a className={`${styles.res}`} href="/" onClick={handleClick}>Home</a>
        <a className={`${styles.res}`} href="/login" onClick={handleClick}>Login</a>
      </div>
    </div>
  )
}

export default Header;
