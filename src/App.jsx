// src/App.jsx
import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import PortfolioPreview from './components/PortfolioPreview';
import EditorPanel from './components/EditorPanel';
import TemplateSelector from './components/TemplateSelector';
import CustomizationPanel from './components/CustomizationPanel';
import { PortfolioProvider } from './context/PortfolioContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ThemeProvider } from './context/ThemeContext';
import './App.css';
import PortfolioTemplate from './components/PortfolioTemplate';
import DynamicPortfolioPreview from './components/DynamicPortfolioPreview';

const AIContentGenerator = () => (
  <div className="p-4">
    <h3>AI Content Generator</h3>
    <p>Coming soon...</p>
  </div>
);

const App = () => {
  const [activePanel, setActivePanel] = useState('edit');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSelectOption = useCallback((option) => {
    setActivePanel(option);
  }, []);

  const renderActivePanel = () => {
    switch (activePanel) {
      case 'edit':
        return (
          <>
            <EditorPanel />
            <TemplateSelector />
          </>
        );
      case 'customize':
        return <CustomizationPanel />;
      case 'ai':
        return <AIContentGenerator />;
      default:
        return null;
    }
  };

  return (
    <ThemeProvider>
      <PortfolioProvider>
        <div className="app-container">
          {/* Sidebar is rendered with a fixed container */}
          <Sidebar onSelectOption={handleSelectOption} isMobile={isMobile} />
          <main className="content-container">
            <div className="row h-100">
              <div className="col-md-8 p-0">
                <DynamicPortfolioPreview />
              </div>
              <div className="col-md-4 p-4">
                {renderActivePanel()}
              </div>
            </div>
          </main>
        </div>
      </PortfolioProvider>
    </ThemeProvider>
  );
};

export default App;
