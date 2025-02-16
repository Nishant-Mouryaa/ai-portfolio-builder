import React from 'react';
import PropTypes from 'prop-types';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FaBars, FaTimes, FaUser, FaProjectDiagram, FaTools, FaQuoteLeft, FaEnvelope } from 'react-icons/fa';
import { usePortfolio } from '../context/PortfolioContext';
import './Sidebar.css';

function Sidebar({ isOpen, toggleSidebar }) {
  const { state, dispatch } = usePortfolio();
  const { activeSection } = state;

  const handleSetActive = (section) => {
    dispatch({ type: 'SET_ACTIVE_SECTION', payload: section });
  };

  // Updated navItems with icon for each section
  const navItems = [
    { key: 'hero', label: 'Hero', icon: <FaUser /> },
    { key: 'projects', label: 'Projects', icon: <FaProjectDiagram /> },
    { key: 'skills', label: 'Skills', icon: <FaTools /> },
    { key: 'testimonials', label: 'Testimonials', icon: <FaQuoteLeft /> },
    { key: 'contact', label: 'Contact', icon: <FaEnvelope /> },
  ];

  return (
    <div className={`sidebar-container ${isOpen ? 'open' : 'closed'} bg-dark text-white`}>
      <div className="sidebar-toggle">
        <Button variant="outline-light" size="sm" onClick={toggleSidebar} className="toggle-btn">
          {isOpen ? <FaTimes /> : <FaBars />}
        </Button>
      </div>
      <nav className="sidebar-nav mt-4">
        {navItems.map((item) => (
          <OverlayTrigger
            key={item.key}
            placement="right"
            overlay={<Tooltip>{item.label}</Tooltip>}
          >
            <div
              className={`nav-item ${activeSection === item.key ? 'active' : ''}`}
              onClick={() => handleSetActive(item.key)}
            >
              {/* When open, show full label; when closed, show the corresponding icon */}
              {isOpen ? item.label : item.icon}
            </div>
          </OverlayTrigger>
        ))}
      </nav>
    </div>
  );
}

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};

export default Sidebar;
