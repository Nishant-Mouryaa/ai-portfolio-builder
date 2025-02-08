import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';

// Create the Portfolio Context.
const PortfolioContext = createContext();

// Default values for userData and settings.
const DEFAULT_USER_DATA = {
  name: 'Your Name',
  profession: 'Your Profession',
  bio: 'This is your portfolio bio. Edit it to add details about yourself.',
  projects: [],
  plan: 'Free Plan',
};

const DEFAULT_SETTINGS = {
  font: 'Arial',
  primaryColor: '#007bff',
  backgroundColor: '#ffffff',
};

export const PortfolioProvider = ({ children }) => {
  // Initialize userData from Local Storage if available.
  const [userData, setUserData] = useState(() => {
    try {
      const storedData = localStorage.getItem('userData');
      return storedData ? JSON.parse(storedData) : DEFAULT_USER_DATA;
    } catch (error) {
      console.error('Error reading userData from localStorage:', error);
      return DEFAULT_USER_DATA;
    }
  });

  // (Optional) Initialize settings from Local Storage.
  const [settings, setSettings] = useState(() => {
    try {
      const storedSettings = localStorage.getItem('settings');
      return storedSettings ? JSON.parse(storedSettings) : DEFAULT_SETTINGS;
    } catch (error) {
      console.error('Error reading settings from localStorage:', error);
      return DEFAULT_SETTINGS;
    }
  });

  // Auto-save userData with a debounce of 300ms.
  useEffect(() => {
    const handler = setTimeout(() => {
      try {
        localStorage.setItem('userData', JSON.stringify(userData));
      } catch (error) {
        console.error('Error saving userData to localStorage:', error);
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [userData]);

  // (Optional) Auto-save settings with a debounce of 300ms.
  useEffect(() => {
    const handler = setTimeout(() => {
      try {
        localStorage.setItem('settings', JSON.stringify(settings));
      } catch (error) {
        console.error('Error saving settings to localStorage:', error);
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [settings]);

  return (
    <PortfolioContext.Provider
      value={{ userData, setUserData, settings, setSettings }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

// Custom hook to use the PortfolioContext.
export const usePortfolio = () => useContext(PortfolioContext);
