import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Button } from 'react-bootstrap';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button variant={theme === 'light' ? 'dark' : 'light'} onClick={toggleTheme}>
      {theme === 'light' ? '🌙 Dark Mode' : '☀ Light Mode'}
    </Button>
  );
};

export default ThemeToggle;
 
