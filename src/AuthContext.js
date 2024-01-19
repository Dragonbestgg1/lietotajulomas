import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [userPrivilage, setUserPrivilage] = useState(null); 

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, userPrivilage, setUserPrivilage }}>
      {children}
    </AuthContext.Provider>
  );
};
