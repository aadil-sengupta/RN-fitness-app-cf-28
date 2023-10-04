import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [IsFirst, setIsfirst] = useState(false);

  return (
    <AuthContext.Provider value={{ IsFirst, setIsfirst }}>
      {children}
    </AuthContext.Provider>
  );
};
