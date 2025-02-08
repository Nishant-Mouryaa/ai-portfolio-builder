import React, { createContext, useContext, useState } from 'react';

const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    name: 'Your Name',
    profession: 'Your Profession',
    bio: 'This is your portfolio bio. Edit it to add details about yourself.',
    projects: [],
    plan: 'Free Plan',
  });

  const [settings, setSettings] = useState({
    font: 'Arial',
    primaryColor: '#007bff',
    backgroundColor: '#ffffff',
  });

  return (
    <PortfolioContext.Provider value={{ userData, setUserData, settings, setSettings }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => useContext(PortfolioContext);
