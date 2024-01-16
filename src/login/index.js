import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import style from '../styles/login.module.css';
import Cookies from 'js-cookie';

function Login({ setIsLoggedIn }) {
  const navigate = useNavigate(); 

  function get_form_object(formId) {
    const form = document.getElementById(formId);
    const formData = new FormData(form);
    const formDataObject = {};

    for (const [key, value] of formData.entries()) {
      formDataObject[key] = value;
    }

    return formDataObject;
  }

  async function submitHandler(e){
    e.preventDefault();
    const data = get_form_object('login_form');
    try {
      const res = await axios.post('/login', data);
      const token = res.data.token;
      Cookies.set('token', token);
      setIsLoggedIn(true);

      // const resPrivileges = await axios.get(`/users/${res.data.id}`, {
      //   headers: { Authorization: `Bearer ${token}` }
      // });
      // const privileges = resPrivileges.data.privileges;


      // Cookies.set('privileges', privileges);

      navigate('/');
    } catch (error) {
      console.error('Error during login:', error);
      document.getElementById('password_error').innerText = 'Please check your username and password.';
    }
  }

  return (
    <div className={`${style.main}`}>
      <div className={`${style.body}`}>
        <div className={`${style.box}`}>
            <form id='login_form'  className={`${style.form}`} onSubmit={submitHandler}>
              <h1 className={`${style.h1}`}>Login</h1>
              <input name='username' className={`${style.input}`} placeholder='username'></input>
              <input name='password' type='password' className={`${style.input}`} placeholder='password'></input>
              <button type='submit' className={`${style.submit}`}>Login</button>
            </form>
          <div id='password_error' className={`${style.err}`}></div>
        </div>
      </div>
    </div>
  );
}

export default Login;
