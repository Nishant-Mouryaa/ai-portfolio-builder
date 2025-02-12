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

// Placeholder for the AI Content Generator component.
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
        {/* The container below is set to fill the viewport without extra margins or padding */}
        <div className="app-container d-flex flex-column flex-md-row vh-100">
          <aside className="sidebar-container order-1">
            <Sidebar onSelectOption={handleSelectOption} />
          </aside>
          <main className="content-container order-2 flex-grow-1 p-4">
            <div className="row h-100">
              <div className="col-md-7 mb-3 mb-md-0">
                <PortfolioPreview />
              </div>
              <div className="col-md-5">
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
