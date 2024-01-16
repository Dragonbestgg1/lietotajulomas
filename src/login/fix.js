// import React from 'react';
// import axios from 'axios';
// import { jwtDecode } from 'jwt-decode';
// import { useNavigate } from 'react-router-dom'; 
// import style from '../styles/login.module.css';

// function Login({ setIsLoggedIn }) {
//   const navigate = useNavigate(); 

//   function get_form_object(formId) {
//     const form = document.getElementById(formId);
//     const formData = new FormData(form);
//     const formDataObject = {};

//     for (const [key, value] of formData.entries()) {
//       formDataObject[key] = value;
//     }

//     return formDataObject;
//   }

//   async function submitHandler(e){
//     e.preventDefault();
//     const data = get_form_object('login_form');
//     try {
//       const res = await axios.post('/login', data);
//       console.log('Response:', res); // Log the entire response object

//       const token = res.data.token;
//       console.log('Token:', token); // Log the token

//       localStorage.setItem('token', token);

//       // Decode the token and get the privilege level
//       const decodedToken = jwtDecode(token);
//       const privilege = decodedToken.privilege; // replace 'privilege' with the actual property name in your token

//       // Store the privilege level in local storage
//       localStorage.setItem('privilege', privilege);

//       setIsLoggedIn(true); 
//       navigate('/');
//     } catch (error) {
//       console.error('Error during login:', error);
//       document.getElementById('password_error').innerText = 'Please check your username and password.';
//     }
//   }

//   return (
//     <div className={`${style.main}`}>
//       <div className={`${style.body}`}>
//         <div className={`${style.box}`}>
//             <form id='login_form'  className={`${style.form}`} onSubmit={submitHandler}>
//               <h1 className={`${style.h1}`}>Login</h1>
//               <input name='username' className={`${style.input}`} placeholder='username'></input>
//               <input name='password' type='password' className={`${style.input}`} placeholder='password'></input>
//               <button type='submit' className={`${style.submit}`}>Login</button>
//             </form>
//           <div id='password_error' className={`${style.err}`}></div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;