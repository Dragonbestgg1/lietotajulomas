// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import styles from '../styles/header.module.css';

// function Header({ isLoggedIn, setIsLoggedIn }) {
//   const [privilege, setPrivilege] = useState(0);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const privilege = localStorage.getItem('privilege');
//     setPrivilege(Number(privilege));
//   }, [isLoggedIn]);

//   const handleClick = (event) => {
//     event.preventDefault();
//     const href = event.currentTarget.getAttribute('href');
  
//     if (href === "/login" && isLoggedIn) {
//       setIsLoggedIn(false);
//       localStorage.removeItem('token');
//       localStorage.removeItem('privilege');
//       navigate('/login'); 
//     } else {
//       navigate(href);
//     }
//   }

//   return(
//     <div className={`${styles.main}`}>
//       <div className={`${styles.header}`}>
//         <a className={`${styles.res}`} href="/" onClick={handleClick}>Home</a>
//         {privilege === 2 && <a className={`${styles.res}`} href="/admin" onClick={handleClick}>Control Panel</a>}
//         {privilege >= 1 && <a className={`${styles.res}`} href="/data">Data</a>}
//         {privilege >= 1 && <a className={`${styles.res}`} href="/orders">Orders</a>}
//         {privilege >= 0 && <a className={`${styles.res}`} href="/reports">Reports</a>}
//         {privilege >= 0 && <a className={`${styles.res}`} href="/storage">Storage</a>}
//         <a className={`${styles.res}`} href="/login" onClick={handleClick}>
//           {isLoggedIn ? "Logout" : "Login"}
//         </a>
//       </div>
//     </div>
//   )
// }

// export default Header;
