import React from 'react';
import style from '../styles/login.module.css';
import axios from 'axios';

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
    axios.post('/login', data).then((res) => {
      console.log(res);
    });
  }


  return (
    <div className={`${style.main}`}>
      <div className={`${style.body}`}>
        <div className={`${style.box}`}>
            <form id='login_form' onSubmit={submitHandler} className={`${style.form}`}>
              <h1 className={`${style.h1}`}>Login</h1>
              <input name='username' className={`${style.input}`} placeholder='username'></input>
              <input name='password' type='password' className={`${style.input}`} placeholder='password'></input>
              <button type='submit' className={`${style.submit}`}>Login</button>
            </form>
          </div>
        </div>
      </div>
  );
}

export default Login;
