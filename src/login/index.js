import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'; // Import js-cookie
import style from '../styles/login.module.css';

function Login() {
  function get_form_object(formId) {
    const form = document.getElementById(formId);
    const formData = new FormData(form);
    const formDataObject = {};

    for (const [key, value] of formData.entries()) {
      formDataObject[key] = value;
    }

    return formDataObject;
  }

  function submitHandler(e){
    e.preventDefault();
    const data = get_form_object('login_form');
    console.log(data);
    axios.post('/login', data).then((res) => {
      console.log(res);
      // Assuming the response contains a token
      const token = res.data.token;
      // Store the token in a cookie
      Cookies.set('token', token);
      // Print out success message
      console.log('You are logged in.');
    });
  }

  return (
    <div className={`${style.main}`}>
      <div className={`${style.body}`}>
        <div className={`${style.box}`}>
            <form id='login_form'  className={`${style.form}`} onSubmit={submitHandler}>
              <h1 className={`${style.h1}`}>Login</h1>
              <input name='username' className={`${style.input}`} placeholder='username'>

              </input>
              <input name='password' type='password' className={`${style.input}`} placeholder='password'>

              </input>
              <button type='submit' className={`${style.submit}`}>Login</button>
            </form>
          </div>
        </div>
      </div>
  );
}

export default Login;
