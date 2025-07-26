import React, { createContext } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Always use light theme
  const theme = 'light';
  
  // Dummy toggle function that does nothing
  const toggleTheme = () => {
    // No-op function
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};