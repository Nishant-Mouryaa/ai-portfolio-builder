// App.jsx
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navigation from './components/Navigation';
import Sidebar from './components/Sidebar';
import LivePreview from './components/LivePreview';
import EditorPanel from './components/EditorPanel';
import CustomizationPanel from './components/CustomizationPanel';
import AISuggestions from './components/AISuggestions';

// Additional pages
import Features from './components/Features';
import Pricing from './components/Pricing';
import Profile from './components/Profile';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <Router>
      <div className="app bg-dark text-white">
        <Navigation />
        <Routes>
          {/* Home Route: Portfolio Builder Layout */}
          <Route
            path="/"
            element={
              <div className="d-flex">
                <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
                <div className="main-content flex-grow-1 p-3">
                  <div className="row">
                    <div className="col-lg-8 mb-4">
                      <LivePreview />
                    </div>
                    <div className="col-lg-4">
                      <EditorPanel />
                      <AISuggestions />
                      <CustomizationPanel />
                    </div>
                  </div>
                </div>
              </div>
            }
          />
          {/* Additional Full-Width Pages */}
          <Route path="/features" element={<div className="full-page"><Features /></div>} />
          <Route path="/pricing" element={<div className="full-page"><Pricing /></div>} />
          <Route path="/profile" element={<div className="full-page"><Profile /></div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
