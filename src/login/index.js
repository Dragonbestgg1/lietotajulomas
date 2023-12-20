import React from 'react';
import style from '../styles/login.module.css';

function Login() {
  return (
    <div className={`${style.main}`}>
      <div className={`${style.body}`}>
        <div className={`${style.box}`}>
            <form className={`${style.form}`}>
              <h1 className={`${style.h1}`}>Login</h1>
              <input className={`${style.input}`} placeholder='username'></input>
              <input type='password' className={`${style.input}`} placeholder='password'></input>
              <button type='submit' className={`${style.submit}`}>Login</button>
            </form>
          </div>
        </div>
      </div>
  );
}

export default Login;
