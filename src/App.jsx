import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import PortfolioPreview from './components/PortfolioPreview';
import EditorPanel from './components/EditorPanel';
import TemplateSelector from './components/TemplateSelector';
import CustomizationPanel from './components/CustomizationPanel';
import { PortfolioProvider } from './context/PortfolioContext';
import 'bootstrap/dist/css/bootstrap.min.css';

// A placeholder for the AI Content Generator component.
const AIContentGenerator = () => (
  <div className="p-4">
    <h3>AI Content Generator</h3>
    <p>Coming soon...</p>
  </div>
);

const App = () => {
  // State to track which panel is active; default to "edit".
  const [activePanel, setActivePanel] = useState('edit');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Update mobile state on window resize.
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Conditionally render the active panel based on the sidebar selection.
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
    <PortfolioProvider>
      {/* 
          Using a responsive flex container with explicit order:
          - On mobile (flex-column), the sidebar is ordered first.
          - On larger screens (flex-md-row), they display side-by-side.
      */}
      <div className="d-flex flex-column flex-md-row vh-100">
        <div className="order-1">
          <Sidebar onSelectOption={(option) => setActivePanel(option)} />
        </div>
        <div className="order-2 flex-grow-1 p-4">
          <div className="row h-100">
            <div className="col-md-7 mb-3 mb-md-0">
              <PortfolioPreview />
            </div>
            <div className="col-md-5">
              {renderActivePanel()}
            </div>
          </div>
        </div>
      </div>
    </PortfolioProvider>
  );
};

export default App;
