import React from "react";
import { useNavigate } from "react-router-dom";
import style from '../styles/header.css';

function Header(){
  const navigate = useNavigate();

  const handleClick = (event) => {
      event.preventDefault();
      navigate(event.currentTarget.getAttribute('href'));
  }

  return(
    <div className={style.main}>
      <div className={style.header}>
        <a className={style.res} href="/" onClick={handleClick}>Home</a>
        <a className={style.res} href="/login" onClick={handleClick}>Make a task</a>
      </div>
    </div>
  )
}

export default Header;
