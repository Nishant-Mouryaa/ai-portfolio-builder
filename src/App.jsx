import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Navigation from './components/Navigation';
import Sidebar from './components/Sidebar';
import LivePreview from './components/LivePreview';
import EditorPanel from './components/EditorPanel';
import CustomizationPanel from './components/CustomizationPanel';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div className="app bg-dark text-white">
      <Navigation />
      <div className="d-flex">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="main-content flex-grow-1 p-3">
          <div className="row">
            <div className="col-lg-8 mb-4">
              <LivePreview />
            </div>
            <div className="col-lg-4">
              <EditorPanel />
              <CustomizationPanel />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
