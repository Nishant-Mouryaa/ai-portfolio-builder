import React from 'react';
import PropTypes from 'prop-types';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FaBars, FaTimes } from 'react-icons/fa';
import { usePortfolio } from '../context/PortfolioContext';
import './Sidebar.css';

function Sidebar({ isOpen, toggleSidebar }) {
  const { state, dispatch } = usePortfolio();
  const { activeSection } = state;

  const handleSetActive = (section) => {
    dispatch({ type: 'SET_ACTIVE_SECTION', payload: section });
  };

  const navItems = [
    { key: 'hero', label: 'Hero' },
    { key: 'projects', label: 'Projects' },
    { key: 'skills', label: 'Skills' },
    { key: 'testimonials', label: 'Testimonials' },
    { key: 'contact', label: 'Contact' },
  ];

  return (
    <div className={`sidebar-container ${isOpen ? 'open' : 'closed'} bg-dark text-white`}>
      <div className="sidebar-toggle">
        <Button
          variant="outline-light"
          size="sm"
          onClick={toggleSidebar}
          className="toggle-btn"
        >
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
              {isOpen ? item.label : item.label.slice(0, 1)}
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
