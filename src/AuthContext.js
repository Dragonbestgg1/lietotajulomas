import React, { createContext, useState } from 'react';

// Create a context
export const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [userPrivilage, setUserPrivilage] = useState(null); // Add this line

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, userPrivilage, setUserPrivilage }}> {/* Include userPrivilage and setUserPrivilage here */}
      {children}
    </AuthContext.Provider>
  );
};
